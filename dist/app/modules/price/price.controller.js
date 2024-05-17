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
exports.PriceController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const price_service_1 = require("./price.service");
// create price controller
const createPriceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield price_service_1.PriceService.createPrice(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'create price successfully',
        data: result,
    });
}));
// get all price list
const getPrices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield price_service_1.PriceService.getPrices();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'get all price successfully',
        data: result,
    });
}));
// get price depends on location, package and guest
const getPriceForChildGuest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { package_id, start_point_id, end_point_id, guest_id } = req.query || {};
    console.log(req.query);
    const result = yield price_service_1.PriceService.getPriceForChildGuest(package_id, start_point_id, end_point_id, guest_id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'get price successfully',
        data: result,
    });
}));
// get price depends on location, package and guest
const getPriceForAdultGuest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { package_id, start_point_id, end_point_id, guest_id } = req.query || {};
    const result = yield price_service_1.PriceService.getPriceForAdultGuest(package_id, start_point_id, end_point_id, guest_id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'get price successfully',
        data: result,
    });
}));
exports.PriceController = {
    createPriceController,
    getPrices,
    getPriceForAdultGuest,
    getPriceForChildGuest,
};
