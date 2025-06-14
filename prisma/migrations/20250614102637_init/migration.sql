-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(500) NOT NULL,
    `email` VARCHAR(500) NOT NULL,
    `nim` VARCHAR(50) NULL,
    `nip` VARCHAR(50) NULL,
    `nomor_telepon` VARCHAR(500) NULL,
    `password` VARCHAR(500) NOT NULL,
    `user_type` VARCHAR(50) NOT NULL DEFAULT 'INTERNAL',

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_nim_key`(`nim`),
    UNIQUE INDEX `user_nip_key`(`nip`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gedung` (
    `gedung_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_gedung` VARCHAR(500) NOT NULL,
    `lokasi_gedung` VARCHAR(500) NOT NULL,
    `jam_buka` TIME(0) NOT NULL,
    `jam_tutup` TIME(0) NOT NULL,
    `fasilitas_gedung` VARCHAR(500) NOT NULL,
    `gambar_gedung` VARCHAR(500) NULL,

    PRIMARY KEY (`gedung_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruangan` (
    `ruang_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gedungId` INTEGER NOT NULL,
    `nama_ruangan` VARCHAR(500) NOT NULL,
    `lokasi_ruangan` VARCHAR(500) NOT NULL,
    `status_ruangan` ENUM('TERSEDIA', 'TIDAK_TERSEDIA') NOT NULL,
    `kapasitas_ruangan` INTEGER NOT NULL,
    `harga_ruangan` INTEGER NOT NULL DEFAULT 0,
    `gambar_ruangan` VARCHAR(500) NULL,

    PRIMARY KEY (`ruang_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fasilitas` (
    `fasilitas_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_fasilitas` VARCHAR(500) NOT NULL,
    `harga_fasilitas` INTEGER NOT NULL,
    `satuan` VARCHAR(50) NULL,

    UNIQUE INDEX `fasilitas_nama_fasilitas_key`(`nama_fasilitas`),
    PRIMARY KEY (`fasilitas_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruangan_fasilitas` (
    `ruangan_id` INTEGER NOT NULL,
    `fasilitas_id` INTEGER NOT NULL,

    PRIMARY KEY (`ruangan_id`, `fasilitas_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `identitas` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `catatan` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `peminjaman_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `ruangan_id` INTEGER NOT NULL,
    `gedung_id` INTEGER NOT NULL,
    `tanggal_pemesanan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggal_pinjam` DATETIME(3) NOT NULL,
    `jam_mulai` VARCHAR(5) NOT NULL,
    `jam_selesai` VARCHAR(5) NOT NULL,
    `durasi` DOUBLE NOT NULL,
    `surat_izin_path` VARCHAR(1000) NULL,
    `catatan_tambahan` TEXT NULL,
    `fasilitas_tambahan_terpilih` JSON NULL,
    `total_harga` INTEGER NOT NULL DEFAULT 0,
    `status_peminjaman` ENUM('PENGAJUAN', 'MENUNGGU_PEMBAYARAN', 'MENUNGGU_PERSETUJUAN', 'DISETUJUI', 'DITOLAK', 'SELESAI', 'DIBATALKAN') NOT NULL DEFAULT 'PENGAJUAN',

    INDEX `peminjaman_user_id_idx`(`user_id`),
    INDEX `peminjaman_ruangan_id_idx`(`ruangan_id`),
    INDEX `peminjaman_gedung_id_idx`(`gedung_id`),
    PRIMARY KEY (`peminjaman_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ruangan` ADD CONSTRAINT `ruangan_gedungId_fkey` FOREIGN KEY (`gedungId`) REFERENCES `gedung`(`gedung_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ruangan_fasilitas` ADD CONSTRAINT `ruangan_fasilitas_ruangan_id_fkey` FOREIGN KEY (`ruangan_id`) REFERENCES `ruangan`(`ruang_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ruangan_fasilitas` ADD CONSTRAINT `ruangan_fasilitas_fasilitas_id_fkey` FOREIGN KEY (`fasilitas_id`) REFERENCES `fasilitas`(`fasilitas_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `identitas` ADD CONSTRAINT `identitas_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_ruangan_id_fkey` FOREIGN KEY (`ruangan_id`) REFERENCES `ruangan`(`ruang_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_gedung_id_fkey` FOREIGN KEY (`gedung_id`) REFERENCES `gedung`(`gedung_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
