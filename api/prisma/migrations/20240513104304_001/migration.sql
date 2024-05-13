-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` ENUM('masculine', 'feminino') NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_id_key`(`id`),
    UNIQUE INDEX `users_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phones` (
    `id` VARCHAR(191) NOT NULL,
    `phone1` INTEGER NOT NULL,
    `phone2` INTEGER NOT NULL,
    `phone3` INTEGER NULL,
    `phone4` INTEGER NULL,
    `phone5` INTEGER NULL,
    `userId` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `phones_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `identityCards` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `fathername` VARCHAR(191) NOT NULL,
    `mathename` VARCHAR(191) NOT NULL,
    `mothename` VARCHAR(191) NOT NULL,
    `residence` VARCHAR(191) NOT NULL,
    `naturalfrom` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `datebirth` DATETIME(3) NOT NULL,
    `sexo` ENUM('masculine', 'feminino') NOT NULL,
    `height` INTEGER NOT NULL,
    `maritalstatus` ENUM('single', 'married', 'widower', 'divorced', 'separate') NOT NULL,
    `issuedon` DATETIME(3) NOT NULL,
    `validuntil` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `identityCards_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fingerprints` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `fingerprints_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `phones` ADD CONSTRAINT `phones_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `identityCards` ADD CONSTRAINT `identityCards_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fingerprints` ADD CONSTRAINT `fingerprints_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
