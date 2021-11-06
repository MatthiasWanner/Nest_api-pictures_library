/*
  Warnings:

  - You are about to drop the column `firstname` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
