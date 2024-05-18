import express from 'express';
import { bookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';

const router = express.Router();
// create booking
router.post('/', bookingController.createBooking);

// get single booking
router.get('/', bookingController.getBooking)

// get all bookings Count
router.get('/all-count', bookingController.getAllBookingsCountOfADay);

// get all bookings
router.get('/all', auth(Role.super_admin), bookingController.getAllBookings);
// get single booking by user id
router.get(
  '/user',
  auth(Role.user),
  bookingController.getSingleBookingByUserId,
);

export const bookingRoute = router;
