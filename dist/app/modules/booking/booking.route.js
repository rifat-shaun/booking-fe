"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
// create booking
router.post('/', booking_controller_1.bookingController.createBooking);
// get single booking
router.get('/', booking_controller_1.bookingController.getBooking);
// get all bookings
router.get('/all', (0, auth_1.default)(client_1.Role.super_admin), booking_controller_1.bookingController.getAllBookings);
// get single booking by user id
router.get('/user', (0, auth_1.default)(client_1.Role.user), booking_controller_1.bookingController.getSingleBookingByUserId);
exports.bookingRoute = router;
