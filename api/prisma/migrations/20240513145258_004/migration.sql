/*
  Warnings:

  - A unique constraint covering the columns `[cardnumber]` on the table `identityCards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardnumber` to the `identityCards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `identitycards` ADD COLUMN `cardnumber` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `identityCards_cardnumber_key` ON `identityCards`(`cardnumber`);
