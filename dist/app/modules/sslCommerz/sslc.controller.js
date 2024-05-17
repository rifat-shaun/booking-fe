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
exports.SslczController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const config_1 = __importDefault(require("../../../config"));
const { ssl: { store_id, store_password }, } = config_1.default;
const is_live = false;
const paymentInitializer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:5000/api/v1/sslcz/success',
        fail_url: 'http://localhost:5000/api/v1/sslcz/fail',
        cancel_url: 'http://localhost:5000/api/v1/sslcz/cancel',
        ipn_url: 'http://localhost:5000/api/v1/sslcz/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new sslcommerz_lts_1.default(store_id, store_password, is_live);
    const sslData = yield sslcz.init(data);
    const GatewayPageURL = sslData.GatewayPageURL;
    console.log({ GatewayPageURL });
    res.redirect(GatewayPageURL);
    //   sendResponse(res, {
    //     statusCode: 200,
    //     success: true,
    //     message: 'Payment initiated successfully',
    //     data: sslData,
    //   });
}));
// payment success
const paymentSuccessController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Payment success',
    });
}));
// payment fail
const paymentFailController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Payment Failed',
    });
}));
// payment cancel
const paymentCancelController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Payment Cancel',
    });
}));
exports.SslczController = {
    paymentInitializer,
    paymentSuccessController,
    paymentFailController,
    paymentCancelController,
};
