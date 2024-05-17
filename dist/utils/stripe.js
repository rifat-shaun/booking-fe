"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../config"));
exports.stripe = new stripe_1.default((_b = (_a = process.env.STRIPE_SECRET_KEY_LIVE) !== null && _a !== void 0 ? _a : config_1.default.stripe.secret_key) !== null && _b !== void 0 ? _b : '', {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2024-04-10',
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
        name: 'Smart Menu',
        version: '0.1.0',
    },
});
