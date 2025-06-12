/*
  Warnings:

  - You are about to drop the column `hari_pinjam` on the `ruangan` table. All the data in the column will be lost.
  - You are about to drop the column `jam_mulai_pinjam` on the `ruangan` table. All the data in the column will be lost.
  - You are about to drop the column `jam_selesai_pinjam` on the `ruangan` table. All the data in the column will be lost.
  - You are about to drop the `konfirmasi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `jam_mulai_dipakai` to the `ruanganDipakai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jam_selesai_dipakai` to the `ruanganDipakai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_dipakai` to the `ruanganDipakai` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `konfirmasi` DROP FOREIGN KEY `konfirmasi_gedung_id_fkey`;

-- DropForeignKey
ALTER TABLE `konfirmasi` DROP FOREIGN KEY `konfirmasi_ruangan_id_fkey`;

-- DropForeignKey
ALTER TABLE `konfirmasi` DROP FOREIGN KEY `konfirmasi_user_id_fkey`;

-- AlterTable
ALTER TABLE `gedung` ADD COLUMN `gambar_gedung` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `ruangan` DROP COLUMN `hari_pinjam`,
    DROP COLUMN `jam_mulai_pinjam`,
    DROP COLUMN `jam_selesai_pinjam`,
    ADD COLUMN `gambar_ruangan` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `ruangandipakai` ADD COLUMN `jam_mulai_dipakai` VARCHAR(500) NOT NULL,
    ADD COLUMN `jam_selesai_dipakai` VARCHAR(500) NOT NULL,
    ADD COLUMN `tanggal_dipakai` TIME(0) NOT NULL;

-- DropTable
DROP TABLE `konfirmasi`;

-- CreateTable
CREATE TABLE `Peminjaman` (
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
    `status_peminjaman` ENUM('PENGAJUAN', 'MENUNGGU_PERSETUJUAN', 'DISETUJUI', 'DITOLAK', 'SELESAI', 'DIBATALKAN') NOT NULL DEFAULT 'PENGAJUAN',

    INDEX `Peminjaman_user_id_idx`(`user_id`),
    INDEX `Peminjaman_ruangan_id_idx`(`ruangan_id`),
    INDEX `Peminjaman_gedung_id_idx`(`gedung_id`),
    PRIMARY KEY (`peminjaman_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_ruangan_id_fkey` FOREIGN KEY (`ruangan_id`) REFERENCES `ruangan`(`ruang_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_gedung_id_fkey` FOREIGN KEY (`gedung_id`) REFERENCES `gedung`(`gedung_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
