import axios from 'axios';
import catchAsync from '../../../shared/catchAsync';
import { bookingService } from './booking.service';

const generateUniqueOrderNumber = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const day = String(now.getDate()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const uniqueNumber = `${year}${day}${minute}${randomNum}`;

  return uniqueNumber;
};

const createBooking = catchAsync(async (req: any, res: any) => {
  const payload = req.body;
  const orderNumber = generateUniqueOrderNumber();

  console.log('This is payload ===>', payload);

  const queryString = `merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae&trnAmount=${payload?.totalAmount}&trnOrderNumber=${orderNumber}&ordName=${encodeURIComponent(payload?.user?.name)}&ordEmailAddress=${payload?.user?.email}&ordAddress1=${encodeURIComponent(payload?.user?.address)}`;

  const fullUrl = `https://web.na.bambora.com/scripts/payment/payment.asp?${queryString}`;

  const orderData = {
    adult_guests: payload?.adult_guest,
    child_guests: payload?.child_guest,
    infant: payload?.infant_guest,
    package_id: payload?.package_id,
    start_point: payload?.start_point,
    end_point: payload?.end_point,
    date: payload?.date,
    total_price: payload?.totalAmount,
    user_id: payload?.user?.id,
    order_number: orderNumber
  };

  return bookingService.createBooking(orderData).then(() => {
    return res.status(201).json({
      success: true,
      url: fullUrl,
    });
  })
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
