"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const http_status_1 = __importDefault(require("http-status"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const sendEmail = (to, subject, data) => {
    // prepare mailOptions
    const mailOptions = {
        from: `Smart-Menu <${config_1.default.mail.email}>`,
        to: to,
        subject: subject,
        html: data,
    };
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: config_1.default.mail.email,
            pass: config_1.default.mail.password,
        },
    });
    //   send mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Couldn't send email");
        }
        else {
            //   console.log('Email sent: ' + info.response);
            return info;
        }
    });
};
exports.sendEmail = sendEmail;
