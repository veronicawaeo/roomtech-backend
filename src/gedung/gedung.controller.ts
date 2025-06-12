import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GedungService } from './gedung.service';

@Controller('gedung')
export class GedungController {
  constructor(private readonly gedungService: GedungService) {}

  @Get()
  async getAllGedung() {
    return this.gedungService.findAllGedung();
  }

  @Get('ruangan-dipakai')
  async getRuanganDipakai() {
    return this.gedungService.findRuanganDipakai();
  }

  @Get(':id')
    async getGedungById(@Param('id', ParseIntPipe) id: number) { 
    return this.gedungService.findGedungById(id);
  }
}