import { PrismaClient, StatusRuangan } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Mulai proses seeding...`);
  await prisma.ruanganFasilitas.deleteMany();
  console.log('Data RuanganFasilitas lama berhasil dihapus.');
  await prisma.ruangan.deleteMany();
  console.log('Data Ruangan lama berhasil dihapus.');
  await prisma.fasilitas.deleteMany();
  console.log('Data Fasilitas lama berhasil dihapus.');
  await prisma.gedung.deleteMany();
  console.log('Data Gedung lama berhasil dihapus.');

  // ====================================================================
  // Data Fasilitas
  // ====================================================================
  const proyektor = await prisma.fasilitas.create({
    data: {
      nama_fasilitas: 'Proyektor',
      harga_fasilitas: 100000,
      satuan: '',
    },
  });

  const papanTulis = await prisma.fasilitas.create({
    data: {
      nama_fasilitas: 'Papan Tulis',
      harga_fasilitas: 20000,
      satuan: '',
    },
  });

  const speaker = await prisma.fasilitas.create({
    data: {
      nama_fasilitas: 'Speaker',
      harga_fasilitas: 20000,
      satuan: '',
    },
  });

  const tv = await prisma.fasilitas.create({
    data: {
      nama_fasilitas: 'TV',
      harga_fasilitas: 40000, 
      satuan: '',
    },
  });

  console.log('Data Fasilitas berhasil dibuat.');

  // ====================================================================
  // Data Gedung
  // ====================================================================
  const gedungSipil = await prisma.gedung.create({
    data: {
      nama_gedung: 'Gedung Teknik Sipil',
      lokasi_gedung: 'Fakultas Teknik',
      jam_buka: new Date('1970-01-01T07:00:00Z'),
      jam_tutup: new Date('1970-01-01T18:00:00Z'),
      fasilitas_gedung: 'Wifi, AC Central, Lift, Toilet, Stop Kontak, Tempat Parkir Luas',
      gambar_gedung: './images/gedungsipil2.jpeg',
    },
  });

  const gedungElektro = await prisma.gedung.create({
    data: {
      nama_gedung: 'Gedung Teknik Elektro',
      lokasi_gedung: 'Fakultas Teknik',
      jam_buka: new Date('1970-01-01T08:00:00Z'),
      jam_tutup: new Date('1970-01-01T18:00:00Z'),
      fasilitas_gedung: 'Wifi, AC Central, Toilet, Stop Kontak, Tempat Parkir Luas',
      gambar_gedung: './images/gedungjte2.jpeg',
    },
  });

  const gedungDekanat = await prisma.gedung.create({
    data: {
      nama_gedung: 'Gedung Dekanat',
      lokasi_gedung: 'Fakultas Teknik',
      jam_buka: new Date('1970-01-01T08:00:00Z'),
      jam_tutup: new Date('1970-01-01T17:00:00Z'),
      fasilitas_gedung: 'Wifi, AC Central, Lift, Toilet, Stop Kontak, Tempat Parkir Luas',
      gambar_gedung: './images/gedungdekanat2.jpeg',
    },
  });

  const gedungLab = await prisma.gedung.create({
    data: {
      nama_gedung: 'Gedung Laboratorium',
      lokasi_gedung: 'Fakultas Teknik',
      jam_buka: new Date('1970-01-01T08:00:00Z'),
      jam_tutup: new Date('1970-01-01T19:00:00Z'),
      fasilitas_gedung: 'Wifi, AC Central, Toilet, PC, Stop Kontak, Tempat Parkir Luas',
      gambar_gedung: './images/labimg.jpeg',
    },
  });

  const gedungUPT = await prisma.gedung.create({
    data: {
      nama_gedung: 'Gedung UPT TIK',
      lokasi_gedung: 'Fakultas Teknik',
      jam_buka: new Date('1970-01-01T08:00:00Z'),
      jam_tutup: new Date('1970-01-01T17:00:00Z'),
      fasilitas_gedung: 'Wifi, AC Central, Toilet, PC, Stop Kontak, Tempat Parkir Luas',
      gambar_gedung: './images/ptiimg.jpeg',
    },
  });

  console.log('Data Gedung berhasil dibuat.');

  // ====================================================================
  // Data Ruangan
  // ====================================================================
  const auditSipil = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'Auditorium Sipil',
      lokasi_ruangan: 'Lantai 5',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 200,
      harga_ruangan: 1000000,
      gambar_ruangan: './images/gedungsipil2.jpeg',
      gedungId: gedungSipil.gedung_id,
    },
  });

  const creativeRoom = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'Creative Room',
      lokasi_ruangan: 'Lantai 2',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 75,
      harga_ruangan: 500000,
      gambar_ruangan: './images/creative-room.jpg',
      gedungId: gedungElektro.gedung_id,
    },
  });

  const ruangSidang = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'Ruang Sidang',
      lokasi_ruangan: 'Lantai 3 - JTE 11',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 30,
      harga_ruangan: 150000,
      gambar_ruangan: './images/ruang-sidang.jpg',
      gedungId: gedungElektro.gedung_id,
    },
  });

  const auditDekanat = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'Auditorium Dekanat',
      lokasi_ruangan: 'Lantai 5',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 100,
      harga_ruangan: 700000,
      gambar_ruangan: './images/gedungdekanat2.jpeg',
      gedungId: gedungDekanat.gedung_id,
    },
  });

  const labSiber = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'Lab Keamanan Siber dan TIK',
      lokasi_ruangan: 'Lantai 3',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 25,
      harga_ruangan: 200000,
      gambar_ruangan: './images/lab-default.jpg',
      gedungId: gedungLab.gedung_id,
    },
  });

  const labMultimedia = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'Lab Multimedia',
      lokasi_ruangan: 'Lantai 3',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 30,
      harga_ruangan: 150000,
      gambar_ruangan: './images/lab-multimedia.jpg',
      gedungId: gedungLab.gedung_id,
    },
  });

  const labTBD = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'Lab Teknologi Basis Data',
      lokasi_ruangan: 'Lantai 3',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 30,
      harga_ruangan: 150000,
      gambar_ruangan: './images/lab-tbd.jpg',
      gedungId: gedungLab.gedung_id,
    },
  });

  const labRPL = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'Lab Rekayasa Perangkat Lunak',
      lokasi_ruangan: 'Lantai 3',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 30,
      harga_ruangan: 150000,
      gambar_ruangan: './images/lab-rpl.jpg',
      gedungId: gedungLab.gedung_id,
    },
  });

  const pti1 = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'PTI 1',
      lokasi_ruangan: 'Lantai 2',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 50,
      harga_ruangan: 300000,
      gambar_ruangan: './images/ptiimg.jpeg',
      gedungId: gedungUPT.gedung_id,
    },
  });

  const pti2 = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'PTI 2',
      lokasi_ruangan: 'Lantai 2',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 50,
      harga_ruangan: 300000,
      gambar_ruangan: './images/ptiimg.jpeg',
      gedungId: gedungUPT.gedung_id,
    },
  });

  const pti3 = await prisma.ruangan.create({
    data: {
      nama_ruangan: 'PTI 3',
      lokasi_ruangan: 'Lantai 2',
      status_ruangan: StatusRuangan.TERSEDIA,
      kapasitas_ruangan: 50,
      harga_ruangan: 300000,
      gambar_ruangan: './images/ptiimg.jpeg',
      gedungId: gedungUPT.gedung_id,
    },
  });

  console.log('Data Ruangan berhasil dibuat.');

  // ====================================================================
  // Data ruangan_fasilitas
  // ====================================================================
  await prisma.ruanganFasilitas.createMany({
    data: [
      // Fasilitas untuk audit sipil
      { ruangan_id: auditSipil.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: auditSipil.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: auditSipil.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: auditSipil.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk creative room
      { ruangan_id: creativeRoom.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: creativeRoom.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: creativeRoom.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: creativeRoom.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk creative room
      { ruangan_id: ruangSidang.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: ruangSidang.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: ruangSidang.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: ruangSidang.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk audit dekanat
      { ruangan_id: auditDekanat.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: auditDekanat.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: auditDekanat.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: auditDekanat.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk lab siber
      { ruangan_id: labSiber.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: labSiber.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: labSiber.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: labSiber.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk lab multimedia
      { ruangan_id: labMultimedia.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: labMultimedia.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: labMultimedia.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: labMultimedia.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk lab tbd
      { ruangan_id: labTBD.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: labTBD.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: labTBD.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: labTBD.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk lab rpl
      { ruangan_id: labRPL.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: labRPL.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: labRPL.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: labRPL.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk pti 1
      { ruangan_id: pti1.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: pti1.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: pti1.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: pti1.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk pti 2
      { ruangan_id: pti2.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: pti2.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: pti2.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: pti2.ruang_id, fasilitas_id: tv.fasilitas_id },

      // Fasilitas untuk pti 3
      { ruangan_id: pti3.ruang_id, fasilitas_id: proyektor.fasilitas_id },
      { ruangan_id: pti3.ruang_id, fasilitas_id: papanTulis.fasilitas_id },
      { ruangan_id: pti3.ruang_id, fasilitas_id: speaker.fasilitas_id },
      { ruangan_id: pti3.ruang_id, fasilitas_id: tv.fasilitas_id },
    ],
  });

  console.log('Data RuanganFasilitas berhasil dibuat (relasi sukses).');
  console.log(`\nSeeding selesai.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
