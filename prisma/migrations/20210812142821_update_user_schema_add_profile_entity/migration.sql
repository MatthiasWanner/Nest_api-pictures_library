/*
  Warnings:

  - You are about to drop the column `user_id` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `pictures` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `biography` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `users` table. All the data in the column will be lost.
  - Added the required column `profile_id` to the `albums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `pictures` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "albums" DROP CONSTRAINT "albums_user_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_user_id_fkey";

-- DropForeignKey
ALTER TABLE "pictures" DROP CONSTRAINT "pictures_user_id_fkey";

-- AlterTable
ALTER TABLE "albums" DROP COLUMN "user_id",
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "user_id",
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pictures" DROP COLUMN "user_id",
ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_url",
DROP COLUMN "biography",
DROP COLUMN "firstname",
DROP COLUMN "lastname";

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "biography" TEXT,
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_user_id_unique" ON "profiles"("user_id");

-- AddForeignKey
ALTER TABLE "profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pictures" ADD FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "albums" ADD FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
