import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GedungService {
  constructor(private prisma: PrismaService) {}

  async findAllGedung() {
    console.log('Backend: Service findAllGedung dipanggil');
    const gedungList = await this.prisma.gedung.findMany({
      select: { 
        gedung_id: true,
        nama_gedung: true,
        gambar_gedung: true,
        ruangan: { 
          select: {
            nama_ruangan: true, 
          },
          orderBy: { 
            nama_ruangan: 'asc',
          }
        },
      },
    });
    console.log('Backend: Data gedung dari Prisma:', gedungList); 
    return gedungList;
  }

  async findGedungById(gedungId: number) {
    const gedung = await this.prisma.gedung.findUnique({
      where: { gedung_id: gedungId },
      include: {
        ruangan: { 
          include: {
            fasilitas: {       
              include: {
                fasilitas: true 
              }
            }
          }
        }
      },
    });
    
    if (!gedung) {
      throw new NotFoundException(`Gedung with ID ${gedungId} not found`);
    }
    return gedung;
  }

  // Endpoint untuk "Ruangan Yang Sedang Dipakai" di beranda
  async findRuanganDipakai() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const peminjamanAktif = await this.prisma.peminjaman.findMany({
        where: {
            status_peminjaman: 'DISETUJUI', 
            tanggal_pemesanan: { 
                gte: twentyFourHoursAgo 
            },
        },
        include: {
            ruangan: {
                select: {
                    nama_ruangan: true,
                    lokasi_ruangan: true, 
                }
            },
        },
        orderBy: {
            tanggal_pinjam: 'asc',
        }
    });

    return peminjamanAktif.map(p => ({
        nama: p.ruangan.nama_ruangan,
        tanggal: new Date(p.tanggal_pinjam).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        jam: `${p.jam_mulai} - ${p.jam_selesai}`,
    }));
  }
}