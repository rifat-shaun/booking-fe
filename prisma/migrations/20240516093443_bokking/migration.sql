/*
  Warnings:

  - You are about to drop the column `pickup_point_id` on the `bookings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_end_point_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_pickup_point_id_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_start_point_id_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "pickup_point_id";
