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
exports.PriceService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createPrice = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isPackageExists = yield prisma_1.default.package.findFirst({
        where: {
            id: payload.package_id,
        },
    });
    if (!isPackageExists) {
        throw new Error('Package not found');
    }
    const isGuestExists = yield prisma_1.default.guest.findFirst({
        where: {
            id: payload.guest_id,
        },
    });
    if (!isGuestExists) {
        throw new Error('guest not found');
    }
    const isStartPointExists = yield prisma_1.default.start_Location.findFirst({
        where: {
            id: payload.start_point_id,
        },
    });
    // check if start point exists
    if (!isStartPointExists) {
        throw new Error('Start point not found');
    }
    const isEndPointExists = yield prisma_1.default.end_Location.findFirst({
        where: {
            id: payload.end_point_id,
        },
    });
    if (!isEndPointExists) {
        throw new Error('End point not found');
    }
    const newPrice = yield prisma_1.default.price.create({
        data: payload,
    });
    return newPrice;
});
const getPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    const prices = yield prisma_1.default.price.findMany({
        include: {
            package: true,
            start_point: true,
            end_point: true,
            guest: true,
        },
    });
    return prices;
});
// get price depends on location, package and guest
const getPriceForAdultGuest = (package_id, start_point_id, end_point_id, guest_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!guest_id) {
        throw new Error('Please provide all required fields');
    }
    const price = yield prisma_1.default.price.findFirst({
        where: {
            package_id,
            start_point_id,
            end_point_id,
            guest_id,
        },
        include: {
            package: true,
            start_point: true,
            end_point: true,
            guest: true,
        },
    });
    return price;
});
// get price depends on location, package and guest
const getPriceForChildGuest = (package_id, start_point_id, end_point_id, guest_id) => __awaiter(void 0, void 0, void 0, function* () {
    const price = yield prisma_1.default.price.findFirst({
        where: {
            package_id,
            start_point_id,
            end_point_id,
            guest_id,
        },
        include: {
            package: true,
            start_point: true,
            end_point: true,
            guest: true,
        },
    });
    return price;
});
exports.PriceService = {
    createPrice,
    getPriceForChildGuest,
    getPrices,
    getPriceForAdultGuest,
};
