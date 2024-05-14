/*
  Warnings:

  - You are about to drop the `fingerprints` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `identitycards` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cardnumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fingerprint]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardnumber` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datebirth` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fathername` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fingerprint` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuedon` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalstatus` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mathername` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `naturalfrom` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residence` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexo` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validuntil` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `fingerprints` DROP FOREIGN KEY `fingerprints_userId_fkey`;

-- DropForeignKey
ALTER TABLE `identitycards` DROP FOREIGN KEY `identityCards_userId_fkey`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `cardnumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `datebirth` DATETIME(3) NOT NULL,
    ADD COLUMN `fathername` VARCHAR(191) NOT NULL,
    ADD COLUMN `fingerprint` VARCHAR(191) NOT NULL,
    ADD COLUMN `height` DOUBLE NOT NULL,
    ADD COLUMN `issuedon` DATETIME(3) NOT NULL,
    ADD COLUMN `maritalstatus` ENUM('single', 'married', 'widower', 'divorced', 'separate') NOT NULL,
    ADD COLUMN `mathername` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `naturalfrom` VARCHAR(191) NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `residence` VARCHAR(191) NOT NULL,
    ADD COLUMN `sexo` ENUM('masculine', 'feminino') NOT NULL,
    ADD COLUMN `validuntil` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `fingerprints`;

-- DropTable
DROP TABLE `identitycards`;

-- CreateIndex
CREATE UNIQUE INDEX `users_cardnumber_key` ON `users`(`cardnumber`);

-- CreateIndex
CREATE UNIQUE INDEX `users_fingerprint_key` ON `users`(`fingerprint`);
