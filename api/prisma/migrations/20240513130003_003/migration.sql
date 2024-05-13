/*
  Warnings:

  - You are about to drop the column `phone3` on the `phones` table. All the data in the column will be lost.
  - You are about to drop the column `phone4` on the `phones` table. All the data in the column will be lost.
  - You are about to drop the column `phone5` on the `phones` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `phones` DROP COLUMN `phone3`,
    DROP COLUMN `phone4`,
    DROP COLUMN `phone5`;
