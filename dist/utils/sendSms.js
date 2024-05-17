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
exports.sendSms = void 0;
const twilio_1 = __importDefault(require("twilio"));
const config_1 = __importDefault(require("../config"));
const accountSid = config_1.default.twilio.account_sid;
const authToken = config_1.default.twilio.auth_token;
const senderNumber = config_1.default.twilio.sender_number;
const sendSms = (phone, message) => __awaiter(void 0, void 0, void 0, function* () {
    // create twilio client
    const client = (0, twilio_1.default)(accountSid, authToken, {
        autoRetry: true,
        maxRetries: 3,
    });
    // send sms
    yield client.messages
        .create({
        body: message,
        from: senderNumber,
        to: phone,
        //   messagingServiceSid: serviceSid,
    })
        .then(message => console.log(message.sid));
});
exports.sendSms = sendSms;
