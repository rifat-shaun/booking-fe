-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "Sub_Package_id" TEXT,
    "user_id" TEXT NOT NULL,
    "child_guests" INTEGER NOT NULL,
    "adult_guests" INTEGER NOT NULL,
    "total_guests" INTEGER NOT NULL,
    "infant" INTEGER NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "start_date" TEXT NOT NULL,
    "start_point_id" TEXT NOT NULL,
    "end_point_id" TEXT NOT NULL,
    "pickup_point_id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "scheduled_time" TEXT NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_Sub_Package_id_fkey" FOREIGN KEY ("Sub_Package_id") REFERENCES "sub_packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_start_point_id_fkey" FOREIGN KEY ("start_point_id") REFERENCES "Start_Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_end_point_id_fkey" FOREIGN KEY ("end_point_id") REFERENCES "End_Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_pickup_point_id_fkey" FOREIGN KEY ("pickup_point_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
