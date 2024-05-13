/*
  Warnings:

  - You are about to drop the column `mathename` on the `identitycards` table. All the data in the column will be lost.
  - You are about to drop the column `mothename` on the `identitycards` table. All the data in the column will be lost.
  - Added the required column `mathername` to the `identityCards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `identitycards` DROP COLUMN `mathename`,
    DROP COLUMN `mothename`,
    ADD COLUMN `mathername` VARCHAR(191) NOT NULL;
