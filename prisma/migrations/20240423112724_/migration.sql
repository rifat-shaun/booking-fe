/*
  Warnings:

  - You are about to drop the column `subscription_model_id` on the `subscription_packages` table. All the data in the column will be lost.
  - You are about to drop the `subscription_models` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `monthly_price` to the `subscription_packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearly_price` to the `subscription_packages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subscription_packages" DROP CONSTRAINT "subscription_packages_subscription_model_id_fkey";

-- DropIndex
DROP INDEX "subscription_packages_subscription_model_id_name_key";

-- AlterTable
ALTER TABLE "subscription_packages" DROP COLUMN "subscription_model_id",
ADD COLUMN     "monthly_price" INTEGER NOT NULL,
ADD COLUMN     "yearly_price" INTEGER NOT NULL;

-- DropTable
DROP TABLE "subscription_models";
