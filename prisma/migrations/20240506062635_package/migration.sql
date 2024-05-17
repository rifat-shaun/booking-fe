/*
  Warnings:

  - You are about to drop the column `parent_user_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupPermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Layout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderPayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PickupSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `addon_variations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `addons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `banners` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `business_hours` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offer_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offer_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `offers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_social_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `predefined_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_variations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscription_packages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "GroupPermissions" DROP CONSTRAINT "GroupPermissions_featureId_fkey";

-- DropForeignKey
ALTER TABLE "GroupPermissions" DROP CONSTRAINT "GroupPermissions_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderPayment" DROP CONSTRAINT "OrderPayment_order_id_fkey";

-- DropForeignKey
ALTER TABLE "OrderPayment" DROP CONSTRAINT "OrderPayment_payment_id_fkey";

-- DropForeignKey
ALTER TABLE "PickupSchedule" DROP CONSTRAINT "PickupSchedule_order_id_fkey";

-- DropForeignKey
ALTER TABLE "addon_variations" DROP CONSTRAINT "addon_variations_addon_id_fkey";

-- DropForeignKey
ALTER TABLE "addons" DROP CONSTRAINT "addons_product_id_fkey";

-- DropForeignKey
ALTER TABLE "banners" DROP CONSTRAINT "banners_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "business_hours" DROP CONSTRAINT "business_hours_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_category_id_fkey";

-- DropForeignKey
ALTER TABLE "offer_categories" DROP CONSTRAINT "offer_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "offer_categories" DROP CONSTRAINT "offer_categories_offer_id_fkey";

-- DropForeignKey
ALTER TABLE "offer_products" DROP CONSTRAINT "offer_products_offer_id_fkey";

-- DropForeignKey
ALTER TABLE "offer_products" DROP CONSTRAINT "offer_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "offers" DROP CONSTRAINT "offers_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_social_details" DROP CONSTRAINT "organization_social_details_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_subscriptions" DROP CONSTRAINT "organization_subscriptions_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_subscriptions" DROP CONSTRAINT "organization_subscriptions_subscription_package_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_layout_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_variations" DROP CONSTRAINT "product_variations_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "tables" DROP CONSTRAINT "tables_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_parent_user_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "parent_user_id",
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "Feature";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "GroupPermissions";

-- DropTable
DROP TABLE "Layout";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "OrderPayment";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "PickupSchedule";

-- DropTable
DROP TABLE "addon_variations";

-- DropTable
DROP TABLE "addons";

-- DropTable
DROP TABLE "banners";

-- DropTable
DROP TABLE "business_hours";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "offer_categories";

-- DropTable
DROP TABLE "offer_products";

-- DropTable
DROP TABLE "offers";

-- DropTable
DROP TABLE "organization_social_details";

-- DropTable
DROP TABLE "organization_subscriptions";

-- DropTable
DROP TABLE "organizations";

-- DropTable
DROP TABLE "predefined_categories";

-- DropTable
DROP TABLE "product_images";

-- DropTable
DROP TABLE "product_variations";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "subscription_packages";

-- DropTable
DROP TABLE "tables";

-- DropTable
DROP TABLE "templates";

-- DropEnum
DROP TYPE "BannerMediaType";

-- DropEnum
DROP TYPE "OfferApplicableTo";

-- DropEnum
DROP TYPE "OfferType";

-- CreateTable
CREATE TABLE "packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "active_days" "Business_HourDay"[],
    "limit" INTEGER NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_packages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,

    CONSTRAINT "sub_packages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sub_packages" ADD CONSTRAINT "sub_packages_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
