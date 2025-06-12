import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, ParseIntPipe, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { StatusPeminjaman } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin')
@UseGuards(AuthGuard('jwt')) 
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('peminjaman')
  async getAllPeminjaman() {
    return this.adminService.findAllPeminjaman();
  }

  @Patch('peminjaman/:id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: StatusPeminjaman,
  ) {
    if (!['DISETUJUI', 'DITOLAK', 'DIBATALKAN', 'MENUNGGU_PERSETUJUAN'].includes(status)) {
        throw new BadRequestException('Status tidak valid.');
    }
    return this.adminService.updatePeminjamanStatus(id, status);
  }
}
