/*
  Warnings:

  - A unique constraint covering the columns `[order_number]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bookings_order_number_key" ON "bookings"("order_number");
