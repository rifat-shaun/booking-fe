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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
// ** phoneVerification controller **
const phoneVerification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructuring phone number from request body
    const { phone } = req.body;
    //   call phone verification service
    const result = yield auth_service_1.AuthService.phoneVerification(phone);
    //   return response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Verification code sent to your phone number',
        data: result,
    });
}));
const resendPhoneVerificationOtp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // destructuring phone number from request body
    const { phone } = req.body;
    //   call phone verification service
    const result = yield auth_service_1.AuthService.phoneVerification(phone);
    //   return response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Verification code sent to your phone number',
        data: result,
    });
}));
// ** signup controller **
const signup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // call signup service
    const result = yield auth_service_1.AuthService.signup(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Signup successful',
        data: result,
    });
}));
//** login with email-password route controller */
const loginWithEmailPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // call login with email password service
    const result = yield auth_service_1.AuthService.loginWithEmailPassword(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Login successful',
        data: result,
    });
}));
//** login with phone-password route controller */
const loginWithPhonePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // call login with phone password service
    const result = yield auth_service_1.AuthService.loginWithPhonePassword(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Login successful',
        data: result,
    });
}));
//** Validate Token Controller */
const validateToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract token from request params
    const token = req.params.token;
    // call validate token service
    const result = yield auth_service_1.AuthService.validateToken(token);
    // return response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Token is valid',
        data: result,
    });
}));
//** send otp for login route controller */
const sendOtpForLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get phone number from request body
    const { phone } = req.body;
    //   call phone verification service to send otp
    yield auth_service_1.AuthService.sendOtpForLogin(phone);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'An OTP has been sent to your phone number',
    });
}));
//** login with phone-otp route controller */
const loginWithPhoneOtp = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // call login with phone otp service
    const result = yield auth_service_1.AuthService.loginWithPhoneOtp(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Login successful',
        data: result,
    });
}));
//** forgot password route controller */
const forgotPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get email from request body
    const { email } = req.body;
    // call forgot password service
    const result = yield auth_service_1.AuthService.forgotPassword(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result || '',
    });
}));
//** reset password route controller */
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get token and password from request body
    const { token, password } = req.body;
    // call reset password service
    const result = yield auth_service_1.AuthService.resetPassword(token, password);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: result,
    });
}));
//** get user info controller */
const getUserInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!req.user) {
    //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
    // }
    // req.user?.userId
    const result = yield auth_service_1.AuthService.getUserInfo();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User info fetched successfully',
        data: result,
    });
}));
//** get single user info controller */
const getSingleUserInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield auth_service_1.AuthService.getSingleUserInfo(user === null || user === void 0 ? void 0 : user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User info fetched successfully',
        data: result,
    });
}));
// update user info
const updateUserName = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { id } = req.params;
    const { name } = req.body;
    const result = yield auth_service_1.AuthService.updateUserName(id, name);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User name updated successfully',
        data: result,
    });
}));
//** Export Auth Controllers */
exports.AuthController = {
    phoneVerification,
    resendPhoneVerificationOtp,
    signup,
    loginWithEmailPassword,
    validateToken,
    loginWithPhonePassword,
    sendOtpForLogin,
    loginWithPhoneOtp,
    forgotPassword,
    resetPassword,
    getUserInfo,
    updateUserName,
    getSingleUserInfo,
};
