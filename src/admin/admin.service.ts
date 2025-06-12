import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatusPeminjaman, Prisma, user, StatusRuangan } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async findAllPeminjaman() {
    return this.prisma.peminjaman.findMany({
      orderBy: {
        tanggal_pemesanan: 'desc', 
      },
      include: {
        user: true,
        gedung: true,
        ruangan: true,
      },
    });
  }

  async updatePeminjamanStatus(peminjamanId: number, status: StatusPeminjaman) {
    const peminjaman = await this.prisma.peminjaman.findUnique({
      where: { peminjaman_id: peminjamanId },
    });

    if (!peminjaman) {
      throw new NotFoundException(`Peminjaman dengan ID ${peminjamanId} tidak ditemukan.`);
    }
    return this.prisma.peminjaman.update({
      where: { peminjaman_id: peminjamanId },
      data: { status_peminjaman: status },
    });
  }
}