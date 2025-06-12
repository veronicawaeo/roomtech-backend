import {
 ConflictException,
 Injectable,
 BadRequestException,
 InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserdto } from './dto/create.user.dto';
import * as bcyrpt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma, UserType } from '@prisma/client';

@Injectable()
export class AuthService {
 constructor(
  private prisma: PrismaService,
  private jwtService: JwtService,
 ) {}

 async register(createUserDto: CreateUserdto) {
  const { nama, email, nim, nip, password } = createUserDto;

  const existingUser = await this.prisma.user.findUnique({
   where: { email },
  });
  if (existingUser) {
   throw new ConflictException('Email sudah terdaftar');
  }

  const isInternal =
   email.endsWith('@student.unsrat.ac.id') || email.endsWith('@unsrat.ac.id');
  const userType: UserType = isInternal ? 'INTERNAL' : 'UMUM';

  const hashedPassword = await bcyrpt.hash(password, 10);
  const dataToCreate: Prisma.userCreateInput = {
   nama,
   email,
   password: hashedPassword,
   user_type: userType,
  };

  if (userType === 'INTERNAL') {
   const nimOrNipValue = nim || nip;
   if (!nimOrNipValue) {
    throw new BadRequestException(
     'NIM atau NIP wajib diisi untuk pendaftaran UNSRAT.',
    );
   }

   const parsedNimOrNip = parseInt(nimOrNipValue, 10);
   if (isNaN(parsedNimOrNip)) {
    throw new BadRequestException('NIM atau NIP harus berupa angka.');
   }

   if (nimOrNipValue.length >= 15) {
    dataToCreate.nip = parsedNimOrNip.toString(); 
   } else {
    dataToCreate.nim = parsedNimOrNip.toString(); 
   }
  }

  try {
   const user = await this.prisma.user.create({
    data: dataToCreate,
   });

   return {
    status: 201,
    message: 'Berhasil Membuat Akun',
    data: {
     user_id: user.user_id,
     email: user.email,
     nama: user.nama,
     nim: user.nim,
     nip: user.nip,
     user_type: user.user_type,
    },
   };
  } catch (error) {
   
   if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
    ){
        if (error.meta && error.meta.target) {
            const field = error.meta.target;
            throw new ConflictException(`${field} ini sudah terdaftar. Silakan gunakan yang lain.`);
        } else {
            throw new ConflictException('Data yang Anda masukkan sudah terdaftar.');
        }
     }

        console.error('Error tidak terduga saat registrasi:', error);
        throw new InternalServerErrorException('Terjadi kesalahan pada server saat membuat akun.');
    }
  }

 async login(email: string, password: string) {
  const user = await this.prisma.user.findUnique({
   where: { email },
  });

  if (!user) {
   throw new ConflictException('Email tidak terdaftar');
  }

  const isPasswordValid = await bcyrpt.compare(password, user.password);

  if (!isPasswordValid) {
   throw new ConflictException('Password salah');
  }

  const payload = {
   sub: user.user_id,
   email: user.email,
   user_type: user.user_type,
  };
  const token = this.jwtService.sign(payload);

  return {
   status: 200,
   message: 'Berhasil Masuk',
   data: {
    user_id: user.user_id,
    email: user.email,
    nama: user.nama,
    nim: user.nim,
    nip: user.nip,
    user_type: user.user_type,
    token,
   },
  };
 }
}