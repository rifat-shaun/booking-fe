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
exports.GuestService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createGuest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isGuestExists = yield prisma_1.default.guest.findFirst({
        where: {
            name: payload.name,
        },
    });
    if (isGuestExists) {
        throw new Error('Guest already exists');
    }
    const newGuest = yield prisma_1.default.guest.create({
        data: payload,
    });
    if (!newGuest) {
        throw new Error('Guest not created');
    }
    return newGuest;
});
// list of guests
const getGuests = () => __awaiter(void 0, void 0, void 0, function* () {
    const guests = yield prisma_1.default.guest.findMany();
    return guests;
});
// update guest
const updateGuest = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.guest.findUnique({
        where: {
            id: id,
        },
        select: {
            name: true,
        },
    });
    if (!result) {
        throw new Error('Guest not found');
    }
    const data = yield prisma_1.default.guest.update({
        where: {
            id: id,
        },
        data: {
            name: payload.name,
        },
    });
    return data;
});
const deleteGuest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.guest.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.GuestService = {
    createGuest,
    getGuests,
    updateGuest,
    deleteGuest,
};
