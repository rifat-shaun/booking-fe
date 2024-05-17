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
exports.LocationController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const location_service_1 = require("./location.service");
// create start location
const createStartLocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield location_service_1.LocationService.createStartLocation(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'create start location successfully',
        data: result,
    });
}));
// create end location
const createEndLocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield location_service_1.LocationService.createEndLocation(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'create end location successfully',
        data: result,
    });
}));
// create location
const createLocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield location_service_1.LocationService.createLocation(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'create location successfully',
        data: result,
    });
}));
// list start locations
const listStartLocations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield location_service_1.LocationService.listStartLocations();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'list start locations successfully',
        data: result,
    });
}));
// list end locations
const listEndLocations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield location_service_1.LocationService.listEndLocations();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'list end locations successfully',
        data: result,
    });
}));
// list locations
const listOfLocations = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield location_service_1.LocationService.listOfLocations();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'list locations successfully',
        data: result,
    });
}));
exports.LocationController = {
    createStartLocation,
    createEndLocation,
    listStartLocations,
    listEndLocations,
    listOfLocations,
    createLocation,
};
