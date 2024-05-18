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
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const booking_service_1 = require("./booking.service");
const generateUniqueOrderNumber = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const day = String(now.getDate()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const uniqueNumber = `${year}${day}${minute}${randomNum}`;
    return uniqueNumber;
};
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const payload = req.body;
    const orderNumber = generateUniqueOrderNumber();
    const queryString = `merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae&trnAmount=${payload === null || payload === void 0 ? void 0 : payload.totalAmount}&trnOrderNumber=${orderNumber}&ordName=${encodeURIComponent((_a = payload === null || payload === void 0 ? void 0 : payload.user) === null || _a === void 0 ? void 0 : _a.name)}&ordEmailAddress=${(_b = payload === null || payload === void 0 ? void 0 : payload.user) === null || _b === void 0 ? void 0 : _b.email}&shipPhoneNumber=${(_c = payload === null || payload === void 0 ? void 0 : payload.user) === null || _c === void 0 ? void 0 : _c.phone}&ordAddress1=${encodeURIComponent((_d = payload === null || payload === void 0 ? void 0 : payload.user) === null || _d === void 0 ? void 0 : _d.address)}`;
    const fullUrl = `https://web.na.bambora.com/scripts/payment/payment.asp?${queryString}`;
    const orderData = {
        adult_guests: payload === null || payload === void 0 ? void 0 : payload.adult_guest,
        child_guests: payload === null || payload === void 0 ? void 0 : payload.child_guest,
        infant: payload === null || payload === void 0 ? void 0 : payload.infant_guest,
        package_id: payload === null || payload === void 0 ? void 0 : payload.package_id,
        Sub_Package_id: (payload === null || payload === void 0 ? void 0 : payload.sub_package_id) || null,
        start_point: payload === null || payload === void 0 ? void 0 : payload.start_point,
        end_point: payload === null || payload === void 0 ? void 0 : payload.end_point,
        date: payload === null || payload === void 0 ? void 0 : payload.date,
        total_price: payload === null || payload === void 0 ? void 0 : payload.totalAmount,
        user: payload === null || payload === void 0 ? void 0 : payload.user,
        order_number: orderNumber,
        total_guests: (payload === null || payload === void 0 ? void 0 : payload.adult_guest) + (payload === null || payload === void 0 ? void 0 : payload.child_guest)
    };
    return booking_service_1.bookingService.createBooking(orderData).then(() => {
        return res.status(201).json({
            success: true,
            url: fullUrl,
        });
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
// get single booking
const getBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_number = req.order_number;
    const bookings = yield booking_service_1.bookingService.getBooking({ order_number });
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
    getBooking,
    getSingleBookingByUserId,
};
