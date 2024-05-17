/*
  Warnings:

  - The values [Saturday,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday] on the enum `Business_HourDay` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Business_HourDay_new" AS ENUM ('saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday');
ALTER TABLE "packages" ALTER COLUMN "active_days" TYPE "Business_HourDay_new"[] USING ("active_days"::text::"Business_HourDay_new"[]);
ALTER TYPE "Business_HourDay" RENAME TO "Business_HourDay_old";
ALTER TYPE "Business_HourDay_new" RENAME TO "Business_HourDay";
DROP TYPE "Business_HourDay_old";
COMMIT;
