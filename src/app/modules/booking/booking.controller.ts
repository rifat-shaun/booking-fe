import axios from 'axios';
const { v4: uuidv4 } = require('uuid');
import catchAsync from '../../../shared/catchAsync';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req: any, res: any) => {
  const payload = req.body;
  const orderNumber = uuidv4();
  console.log(payload);
  const queryString = `merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae&trnAmount=${payload?.totalAmount}&trnOrderNumber=${orderNumber}&ordName=${encodeURIComponent(payload?.user?.name)}&ordEmailAddress=${payload?.user?.email}&ordAddress1=${encodeURIComponent(payload?.user?.address)}` 

  const fullUrl = `https://web.na.bambora.com/scripts/payment/payment.asp?${queryString}`;

  console.log(fullUrl);

  return res.status(201).json({
    success: true,
    url: fullUrl,
  });
});

// get all bookings
const getAllBookings = catchAsync(async (req: any, res: any) => {
  const bookings = await bookingService.getAllBookings();
  return res.status(200).json({
    success: true,
    data: bookings,
  });
});

// get single booking by user id
const getSingleBookingByUserId = catchAsync(async (req: any, res: any) => {
  const user = req.user;
  const bookings = await bookingService.getSingleBookingByUserId(user?.userId);
  return res.status(200).json({
    success: true,
    data: bookings,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getSingleBookingByUserId,
};
