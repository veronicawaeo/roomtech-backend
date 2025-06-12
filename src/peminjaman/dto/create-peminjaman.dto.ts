import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString, Matches, IsArray, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';

class FasilitasTerpilihDto {
  @IsInt()
  @IsNotEmpty()
  fasilitas_id: number;

  @IsString()
  @IsNotEmpty()
  nama_fasilitas: string;

  @IsInt()
  harga_fasilitas: number;

  @IsString()
  @IsOptional()
  satuan?: string;
}

export class CreatePeminjamanDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  ruanganId: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsNotEmpty()
  gedungId: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @IsOptional()
  totalHarga?: number;

  @IsDateString()
  @IsNotEmpty()
  tanggalPinjam: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Jam mulai harus format HH:MM' })
  jamMulai: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Jam selesai harus format HH:MM' })
  jamSelesai: string;

  @IsString()
  @IsOptional()
  nomorTelepon?: string;

  @IsString()
  @IsOptional()
  catatanTambahan?: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FasilitasTerpilihDto)
  @IsOptional()
  fasilitasTambahanTerpilih?: FasilitasTerpilihDto[];
}