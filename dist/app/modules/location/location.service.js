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
exports.LocationService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// create start location
const createStartLocation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { child_locations, name } = payload;
    const result = yield prisma_1.default.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        const parentLocation = yield transaction.start_Location.create({
            data: {
                name,
            },
        });
        if (child_locations === null || child_locations === void 0 ? void 0 : child_locations.length) {
            const mergeLocation = child_locations.map(item => {
                return Object.assign(Object.assign({}, item), { start_point_id: parentLocation.id });
            });
            const locationData = yield transaction.location.createMany({
                data: mergeLocation,
            });
            if (!locationData) {
                throw new Error('Location not created');
            }
        }
    }));
    return result;
});
// create end location
const createEndLocation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { child_locations, name } = payload;
    const result = yield prisma_1.default.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        const parentLocation = yield transaction.end_Location.create({
            data: {
                name,
            },
        });
        if (child_locations === null || child_locations === void 0 ? void 0 : child_locations.length) {
            const mergeLocation = child_locations.map(item => {
                return Object.assign(Object.assign({}, item), { end_point_id: parentLocation.id });
            });
            const locationData = yield transaction.location.createMany({
                data: mergeLocation,
            });
            if (!locationData) {
                throw new Error('Location not created');
            }
        }
    }));
    return result;
});
const createLocation = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { start_point_id, end_point_id, name } = payload;
    if (start_point_id || end_point_id) {
        const startLocation = yield prisma_1.default.start_Location.findUnique({
            where: {
                id: start_point_id,
            },
        });
        if (!startLocation) {
            throw new Error('Start location is not exists');
        }
    }
    if (end_point_id) {
        const endLocation = yield prisma_1.default.end_Location.findUnique({
            where: {
                id: end_point_id,
            },
        });
        if (!endLocation) {
            throw new Error('End location is not exists');
        }
    }
    const result = yield prisma_1.default.location.create({
        data: payload,
    });
    return result;
});
// list start locations
const listStartLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.start_Location.findMany({
        include: {
            child_locations: true,
        },
    });
    return result;
});
// list end locations
const listEndLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.end_Location.findMany({
        include: {
            child_locations: true,
        },
    });
    return result;
});
// list locations
const listOfLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.location.findMany({
        include: {
            start_point: true,
            end_point: true,
        },
    });
    return result;
});
exports.LocationService = {
    createStartLocation,
    createEndLocation,
    listStartLocations,
    listEndLocations,
    listOfLocations,
    createLocation,
};
