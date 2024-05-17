import axios from 'axios';
import prisma from '../../../shared/prisma';

const createBooking = async (payload: any) => {
  // const booking = await prisma.booking.create({
  //   data: payload,
  // });
  // return booking;
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
