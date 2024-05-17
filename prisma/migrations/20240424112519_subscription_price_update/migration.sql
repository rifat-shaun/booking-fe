-- AlterTable
ALTER TABLE "subscription_packages" ADD COLUMN     "monthly_stripe_price_id" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "yearly_stripe_price_id" TEXT NOT NULL DEFAULT '';
