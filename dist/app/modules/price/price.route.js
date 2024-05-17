"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceRoute = void 0;
const express_1 = __importDefault(require("express"));
const price_controller_1 = require("./price.controller");
const router = express_1.default.Router();
// create a price
router.post('/', price_controller_1.PriceController.createPriceController);
// get all price
router.get('/', price_controller_1.PriceController.getPrices);
// get all guest price
router.get('/adult-guest-price', price_controller_1.PriceController.getPriceForAdultGuest);
router.get('/child-guest-price', price_controller_1.PriceController.getPriceForChildGuest);
exports.PriceRoute = router;
