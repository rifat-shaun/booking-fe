import axios from 'axios';
import catchAsync from '../../../shared/catchAsync';
import { bookingService } from './booking.service';

const createBooking = catchAsync(async (req: any, res: any) => {
  const payload = req.body;
  console.log(payload);
  const invoice = await axios.post(
    `https://web.na.bambora.com/scripts/payment/payment.asp?merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae`,
  );
  const credentials = `${387193277}:${'b24c06ff0EE74bE598A32C7Ad9C02Bf1'}`;

  // Base64 encode the credentials
  // const encodedCredentials = Buffer.from(credentials).toString('base64');
  // const test = await axios.post(
  //   `https://api.na.bambora.com/v1/payments`,
  //   {
  //     amount: 400,
  //     payment_method: 'card',
  //   },
  //   {
  //     headers: {
  //       Authorization: `Passcode ${encodedCredentials}`,
  //       'Content-Type': 'application/json', // Adjust this if you're sending a different content type
  //     },
  //   },
  // );
  // console.log(test.data.response.data);
  // res.redirect(
  //   'https://web.na.bambora.com/scripts/payment/payment.asp?merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae',
  // );
  // const booking = await bookingService.createBooking(payload);
  return res.status(201).json({
    success: true,
    url: 'https://web.na.bambora.com/scripts/payment/payment.asp?merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae',
    // data: booking,
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
