import axios from 'axios';
import prisma from '../../../shared/prisma';

const createBooking = async (payload: any) => {
  const fetchedPackage = await prisma.package.findUnique({
    where: { id: payload?.package_id },
  });

  if (!fetchedPackage) {
    throw new Error('Package not found');
  }

  const fetchedUser = await prisma.user.findUnique({
    where: { email: payload?.user?.email },
  });

  if (!fetchedUser) {
    throw new Error('User not found');
  }

  const newData = {
    ...payload,
    package: { connect: { id: payload.package_id } },
    Sub_Package: payload.Sub_Package_id?.id
      ? { connect: { id: payload.Sub_Package_id } }
      : undefined,
    user: { connect: {email: payload?.user?.email} },
  };

  delete newData.package_id;
  delete newData.Sub_Package_id;

  const booking = await prisma.booking.create({
    data: {
      ...newData,
    },
  });
  return booking;
};

// all booking data

const getAllBookings = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      package: true,
    },
  });
  return bookings;
};

// get single booking by user Id
const getSingleBookingByUserId = async (id: string) => {
  const booking = await prisma.booking.findFirst({
    where: {
      user_id: id,
    },
    include: {
      user: true,
      package: true,
    },
  });
  return booking;
};

export const bookingService = {
  createBooking,
  getAllBookings,
  getSingleBookingByUserId,
};
