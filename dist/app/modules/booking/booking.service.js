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
    var _a, _b, _c;
    const fetchedPackage = yield prisma_1.default.package.findUnique({
        where: { id: payload === null || payload === void 0 ? void 0 : payload.package_id },
    });
    if (!fetchedPackage) {
        throw new Error('Package not found');
    }
    const fetchedUser = yield prisma_1.default.user.findUnique({
        where: { email: (_a = payload === null || payload === void 0 ? void 0 : payload.user) === null || _a === void 0 ? void 0 : _a.email },
    });
    if (!fetchedUser) {
        throw new Error('User not found');
    }
    const newData = Object.assign(Object.assign({}, payload), { package: { connect: { id: payload.package_id } }, Sub_Package: ((_b = payload.Sub_Package_id) === null || _b === void 0 ? void 0 : _b.id)
            ? { connect: { id: payload.Sub_Package_id } }
            : undefined, user: { connect: { email: (_c = payload === null || payload === void 0 ? void 0 : payload.user) === null || _c === void 0 ? void 0 : _c.email } } });
    delete newData.package_id;
    delete newData.Sub_Package_id;
    const booking = yield prisma_1.default.booking.create({
        data: Object.assign({}, newData),
    });
    return booking;
});
// all booking data
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield prisma_1.default.booking.findMany({
        include: {
            user: true,
            package: true,
        },
    });
    return bookings;
});
const getBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({
        where: {
            order_number: data === null || data === void 0 ? void 0 : data.order_number,
        },
        include: {
            package: true,
        },
    });
    return booking;
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
        },
    });
    return booking;
});
exports.bookingService = {
    createBooking,
    getAllBookings,
    getBooking,
    getSingleBookingByUserId,
};
