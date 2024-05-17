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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const stripe_1 = require("./utils/stripe");
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const options = [
    (0, cors_1.default)({
        origin: '*',
        methods: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
];
app.use(options);
//parser
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.static('public'));
app.use('/api/v1', routes_1.default);
//global error handler
app.use(globalErrorHandler_1.default);
app.post('/create-payment-intent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentIntent = yield stripe_1.stripe.paymentIntents.create({
            currency: 'EUR',
            amount: 1999,
            automatic_payment_methods: { enabled: true },
        });
        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
}));
app.post('/create_invoice', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = btoa('merchant_id:******');
    try {
        const invoice = yield axios_1.default.post(`https://web.na.bambora.com/scripts/payment/payment.asp?merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae`);
        console.log(invoice);
        res.json({
            redirect_url: `https://web.na.bambora.com/scripts/payment/payment.asp?merchant_id=387193277&hashValue=dceca395341dcd40c6a5de824646e773370b8cae`,
        });
        // res.status(200).json(invoice.data);
    }
    catch (error) {
        res.status(500).json(error.message);
        console.log(error);
    }
}));
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
app.get('/callback', (req, res) => {
    const { messageId, trnId, avsId, cvdId, messageText } = req.query;
    console.log(messageId);
    if (messageId) {
        const feedback = {
            success: true,
            transaction_id: trnId,
            message_id: messageId,
            avs: avsId,
            cvv: cvdId,
        };
        res.render('redirect-response.html', { feedback });
    }
    else {
        const feedback = {
            success: false,
            message: `${messageId}: ${messageText}`,
        };
        res.render('redirect-response.html', { feedback });
    }
});
exports.default = app;
// const crypto = require('crypto');
// const express = require('express');
// const queryString = require('querystring');
// const settings = require('./settings');
// const payments = express.Router();
// payments.get('', (req, res) => {
//   res.render('checkout.html');
// });
// payments.post('/redirect', (req, res) => {
//   const merchantId = settings.sandbox_merchant_id;
//   const hashKey = settings.sandbox_hash_key;
//   const { amount, name, postal } = req.body;
//   const termUrl = req.protocol + '://' + req.get('host') + '/payments/callback';
//   const hashData = queryString.stringify({
//     merchant_id: merchantId,
//     trnAmount: amount,
//     ordName: name,
//     ordPostalCode: postal,
//     ordProvince: 'BC',
//     ordCountry: 'CA',
//     approvedPage: termUrl,
//     declinedPage: termUrl,
//   });
//   const hash = crypto
//     .createHash('sha1')
//     .update(hashData + hashKey)
//     .digest('hex');
//   const checkoutUrl = ` https://web.na.bambora.com/scripts/payment/payment.asp?${hashData}&hashValue=${hash}`;
//   res.json({ redirect_url: checkoutUrl });
// });
// module.exports = payments;
