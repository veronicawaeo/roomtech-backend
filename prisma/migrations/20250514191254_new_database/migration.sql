-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(500) NOT NULL,
    `email` VARCHAR(500) NOT NULL,
    `nim` INTEGER NULL,
    `nip` INTEGER NULL,
    `nomor_telepon` VARCHAR(500) NULL,
    `password` VARCHAR(500) NOT NULL,

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

    PRIMARY KEY (`gedung_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruanganDipakai` (
    `ruang_id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_ruangan` VARCHAR(500) NOT NULL,
    `lokasi_ruangan` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`ruang_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruangan` (
    `ruang_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gedungId` INTEGER NOT NULL,
    `nama_ruangan` VARCHAR(500) NOT NULL,
    `lokasi_ruangan` VARCHAR(500) NOT NULL,
    `status_ruangan` ENUM('TERSEDIA', 'TIDAK_TERSEDIA') NOT NULL,
    `hari_pinjam` VARCHAR(191) NOT NULL,
    `jam_mulai_pinjam` VARCHAR(191) NOT NULL,
    `jam_selesai_pinjam` VARCHAR(191) NOT NULL,
    `kapasitas_ruangan` INTEGER NOT NULL,

    PRIMARY KEY (`ruang_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fasilitas_ruangan` (
    `fasilitas_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ruang_id` INTEGER NOT NULL,
    `nama_fasilitas` VARCHAR(500) NOT NULL,
    `harga_fasilitas` INTEGER NOT NULL,

    PRIMARY KEY (`fasilitas_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `identitas` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `catatan` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `konfirmasi` (
    `konfirmasi_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('TERSEDIA', 'TIDAK_TERSEDIA') NOT NULL,
    `ruangan_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `gedung_id` INTEGER NULL,

    PRIMARY KEY (`konfirmasi_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ruangan` ADD CONSTRAINT `ruangan_gedungId_fkey` FOREIGN KEY (`gedungId`) REFERENCES `gedung`(`gedung_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fasilitas_ruangan` ADD CONSTRAINT `fasilitas_ruangan_ruang_id_fkey` FOREIGN KEY (`ruang_id`) REFERENCES `ruangan`(`ruang_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `identitas` ADD CONSTRAINT `identitas_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konfirmasi` ADD CONSTRAINT `konfirmasi_ruangan_id_fkey` FOREIGN KEY (`ruangan_id`) REFERENCES `ruangan`(`ruang_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konfirmasi` ADD CONSTRAINT `konfirmasi_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `konfirmasi` ADD CONSTRAINT `konfirmasi_gedung_id_fkey` FOREIGN KEY (`gedung_id`) REFERENCES `gedung`(`gedung_id`) ON DELETE SET NULL ON UPDATE CASCADE;
