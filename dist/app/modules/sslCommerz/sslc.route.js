"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SslczRoute = void 0;
const express_1 = __importDefault(require("express"));
const sslc_controller_1 = require("./sslc.controller");
const router = express_1.default.Router();
router.get('/init', sslc_controller_1.SslczController.paymentInitializer);
router.post('/success', sslc_controller_1.SslczController.paymentSuccessController);
router.post('/fail', sslc_controller_1.SslczController.paymentFailController);
router.post('/cancel', sslc_controller_1.SslczController.paymentFailController);
exports.SslczRoute = router;
