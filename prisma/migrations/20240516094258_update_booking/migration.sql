/*
  Warnings:

  - You are about to drop the column `end_point_id` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `scheduled_time` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `start_point_id` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `end_point` to the `bookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_point` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "end_point_id",
DROP COLUMN "scheduled_time",
DROP COLUMN "start_date",
DROP COLUMN "start_point_id",
ADD COLUMN     "end_point" TEXT NOT NULL,
ADD COLUMN     "start_point" TEXT NOT NULL;
