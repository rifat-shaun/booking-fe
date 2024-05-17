"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
// import { Role } from '@prisma/client';
const express_1 = __importDefault(require("express"));
// import auth from '../../middlewares/auth';
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
//** phone number verification route */
router.post('/verifications/phone', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.phoneVerification), auth_controller_1.AuthController.phoneVerification);
//**resend otp for phone number verification route */
router.post('/verifications/phone/resend-otp', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.phoneVerification), auth_controller_1.AuthController.phoneVerification);
//**  signup route */
router.post('/signup', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.signup), auth_controller_1.AuthController.signup);
//** Login with email password route **/
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginWithEmailPassword), auth_controller_1.AuthController.loginWithEmailPassword);
//** Login with phone password route **/
router.post('/login/phone-pass', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginWithPhonePassword), auth_controller_1.AuthController.loginWithPhonePassword);
//** validate token route **
router.get('/validate-token/:token', auth_controller_1.AuthController.validateToken);
//** send otp for login route */
router.post('/login/send-otp', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.phoneVerification), auth_controller_1.AuthController.sendOtpForLogin);
//** login with phone-otp route */
router.post('/login/phone-otp', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginWithPhoneOtp), auth_controller_1.AuthController.loginWithPhoneOtp);
// forgot password route
router.post('/forgot-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.forgotPassword), auth_controller_1.AuthController.forgotPassword);
//** reset password route */
router.patch('/reset-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.resetPassword), auth_controller_1.AuthController.resetPassword);
//** get user info */
router.get('/user-info', 
// auth(Role.admin, Role.super_admin, Role.user),
auth_controller_1.AuthController.getUserInfo);
//** get single user info */
router.get('/user', (0, auth_1.default)(), auth_controller_1.AuthController.getSingleUserInfo);
//** update user name */
router.patch('/user-info/:id', (0, auth_1.default)(), auth_controller_1.AuthController.updateUserName);
//** Export Auth Routes  */
exports.AuthRoute = router;
