/*
  Warnings:

  - You are about to drop the column `parent_id` on the `End_Location` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `Start_Location` table. All the data in the column will be lost.
  - You are about to drop the `Parent_Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "End_Location" DROP CONSTRAINT "End_Location_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "Start_Location" DROP CONSTRAINT "Start_Location_parent_id_fkey";

-- AlterTable
ALTER TABLE "End_Location" DROP COLUMN "parent_id";

-- AlterTable
ALTER TABLE "Start_Location" DROP COLUMN "parent_id";

-- DropTable
DROP TABLE "Parent_Location";

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_point_id" TEXT,
    "end_point_id" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_start_point_id_fkey" FOREIGN KEY ("start_point_id") REFERENCES "Start_Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_end_point_id_fkey" FOREIGN KEY ("end_point_id") REFERENCES "End_Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
