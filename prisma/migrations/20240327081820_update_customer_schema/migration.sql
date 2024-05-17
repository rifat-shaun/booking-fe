/*
  Warnings:

  - You are about to drop the column `hashed_password` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "hashed_password",
ADD COLUMN     "password" TEXT;
