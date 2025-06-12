export class GedungDto {
  gedung_id: number;
  nama_gedung: string;
  fasilitas_gedung: string;
  gambar_gedung?: string;
}

export class RuanganDto {
  ruang_id: number;
  nama_ruangan: string;
  lokasi_ruangan: string;
  kapasitas_ruangan: number;
  gambar_ruangan?: string;
  fasilitas: FasilitasRuanganDto[];
}

export class FasilitasRuanganDto {
  fasilitas_id: number;
  nama_fasilitas: string;
  harga_fasilitas: number;
  satuan?: string;
}

export class GedungDetailDto extends GedungDto {
  ruangan: RuanganDto[];
}
