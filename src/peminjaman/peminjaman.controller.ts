import { Controller, Post, Body, Req, Get, UseInterceptors, UploadedFile, BadRequestException, UseGuards } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('peminjaman')
export class PeminjamanController {
  constructor(private readonly peminjamanService: PeminjamanService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('suratIzin'))
  async createPeminjaman(
    @Body() dto: CreatePeminjamanDto,
    @Req() req: any,
    @UploadedFile()
    suratIzinFile?: Express.Multer.File,
  ) {
    if (suratIzinFile && suratIzinFile.mimetype !== 'application/pdf') {
      throw new BadRequestException('Validation failed: Hanya file PDF yang diizinkan.');
    }

    const currentUser = req.user; 
    return this.peminjamanService.createPeminjaman(dto, currentUser, suratIzinFile);
  }

  @Get('riwayat')
  @UseGuards(AuthGuard('jwt'))
  async getRiwayatPeminjaman(@Req() req: any) {
     const userId = req.user.user_id; 
    return this.peminjamanService.findPeminjamanByUserId(userId);
  }
}