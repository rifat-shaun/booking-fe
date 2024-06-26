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
exports.bookingService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.create({
        data: payload,
    });
    return booking;
});
// all booking data
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield prisma_1.default.booking.findMany({
        include: {
            user: true,
            package: true,
            start_point: true,
            end_point: true,
        },
    });
    return bookings;
});
// get single booking by user Id
const getSingleBookingByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findFirst({
        where: {
            user_id: id,
        },
        include: {
            user: true,
            package: true,
            start_point: true,
            end_point: true,
        },
    });
    return booking;
});
exports.bookingService = {
    createBooking,
    getAllBookings,
    getSingleBookingByUserId,
};
