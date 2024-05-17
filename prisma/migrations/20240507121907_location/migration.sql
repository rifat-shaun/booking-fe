/*
  Warnings:

  - Added the required column `parent_id` to the `End_Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parent_id` to the `Start_Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "End_Location" ADD COLUMN     "parent_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Start_Location" ADD COLUMN     "parent_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Parent_Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Parent_Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Start_Location" ADD CONSTRAINT "Start_Location_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Parent_Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "End_Location" ADD CONSTRAINT "End_Location_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Parent_Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
