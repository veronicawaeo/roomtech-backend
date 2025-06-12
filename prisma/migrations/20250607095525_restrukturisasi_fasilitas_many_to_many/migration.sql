/*
  Warnings:

  - You are about to drop the `fasilitas_ruangan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `fasilitas_ruangan` DROP FOREIGN KEY `fasilitas_ruangan_ruang_id_fkey`;

-- DropTable
DROP TABLE `fasilitas_ruangan`;

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

-- AddForeignKey
ALTER TABLE `ruangan_fasilitas` ADD CONSTRAINT `ruangan_fasilitas_ruangan_id_fkey` FOREIGN KEY (`ruangan_id`) REFERENCES `ruangan`(`ruang_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ruangan_fasilitas` ADD CONSTRAINT `ruangan_fasilitas_fasilitas_id_fkey` FOREIGN KEY (`fasilitas_id`) REFERENCES `fasilitas`(`fasilitas_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
