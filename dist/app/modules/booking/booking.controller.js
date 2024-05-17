"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const axios_1 = __importDefault(require("axios"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    console.log(payload);
    const invoice = yield axios_1.default.post(`https://web.na.bambora.com/scripts/payment/payment.asp?merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae`);
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
}));
// get all bookings
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield booking_service_1.bookingService.getAllBookings();
    return res.status(200).json({
        success: true,
        data: bookings,
    });
}));
// get single booking by user id
const getSingleBookingByUserId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const bookings = yield booking_service_1.bookingService.getSingleBookingByUserId(user === null || user === void 0 ? void 0 : user.userId);
    return res.status(200).json({
        success: true,
        data: bookings,
    });
}));
exports.bookingController = {
    createBooking,
    getAllBookings,
    getSingleBookingByUserId,
};
