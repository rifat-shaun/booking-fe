/*
  Warnings:

  - Added the required column `order_number` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "order_number" INTEGER NOT NULL;
