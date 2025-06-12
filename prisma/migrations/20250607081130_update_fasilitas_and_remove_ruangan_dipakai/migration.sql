/*
  Warnings:

  - You are about to drop the `ruangandipakai` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `fasilitas_ruangan` ADD COLUMN `satuan` VARCHAR(50) NULL;

-- DropTable
DROP TABLE `ruangandipakai`;
