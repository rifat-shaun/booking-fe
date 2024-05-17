import catchAsync from '../../../shared/catchAsync';
import SSLCommerzPayment from 'sslcommerz-lts';
import sendResponse from '../../../shared/sendResponse';
import config from '../../../config';
const {
  ssl: { store_id, store_password },
} = config;
const is_live = false;
const paymentInitializer = catchAsync(async (req, res) => {
  const data = {
    total_amount: 100,
    currency: 'BDT',
    tran_id: 'REF123', // use unique tran_id for each api call
    success_url: 'http://localhost:5000/api/v1/sslcz/success',
    fail_url: 'http://localhost:5000/api/v1/sslcz/fail',
    cancel_url: 'http://localhost:5000/api/v1/sslcz/cancel',
    ipn_url: 'http://localhost:5000/api/v1/sslcz/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_password, is_live);
  const sslData = await sslcz.init(data);
  const GatewayPageURL = sslData.GatewayPageURL;
  console.log({ GatewayPageURL });
  res.redirect(GatewayPageURL);
  //   sendResponse(res, {
  //     statusCode: 200,
  //     success: true,
  //     message: 'Payment initiated successfully',
  //     data: sslData,
  //   });
});

// payment success
const paymentSuccessController = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment success',
  });
});
// payment fail
const paymentFailController = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment Failed',
  });
});
// payment cancel
const paymentCancelController = catchAsync(async (req, res) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment Cancel',
  });
});
export const SslczController = {
  paymentInitializer,
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};
