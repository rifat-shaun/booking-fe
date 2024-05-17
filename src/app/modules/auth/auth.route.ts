// import { Role } from '@prisma/client';
import express from 'express';
// import auth from '../../middlewares/auth';
import validate from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

//** phone number verification route */
router.post(
  '/verifications/phone',
  validate(AuthValidation.phoneVerification),
  AuthController.phoneVerification,
);

//**resend otp for phone number verification route */
router.post(
  '/verifications/phone/resend-otp',
  validate(AuthValidation.phoneVerification),
  AuthController.phoneVerification,
);

//**  signup route */
router.post('/signup', validate(AuthValidation.signup), AuthController.signup);

//** Login with email password route **/
router.post(
  '/login',
  validate(AuthValidation.loginWithEmailPassword),
  AuthController.loginWithEmailPassword,
);

//** Login with phone password route **/
router.post(
  '/login/phone-pass',
  validate(AuthValidation.loginWithPhonePassword),
  AuthController.loginWithPhonePassword,
);

//** validate token route **
router.get('/validate-token/:token', AuthController.validateToken);

//** send otp for login route */
router.post(
  '/login/send-otp',
  validate(AuthValidation.phoneVerification),
  AuthController.sendOtpForLogin,
);

//** login with phone-otp route */
router.post(
  '/login/phone-otp',
  validate(AuthValidation.loginWithPhoneOtp),
  AuthController.loginWithPhoneOtp,
);

// forgot password route
router.post(
  '/forgot-password',
  validate(AuthValidation.forgotPassword),
  AuthController.forgotPassword,
);

//** reset password route */
router.patch(
  '/reset-password',
  validate(AuthValidation.resetPassword),
  AuthController.resetPassword,
);

//** get user info */
router.get(
  '/user-info',
  // auth(Role.admin, Role.super_admin, Role.user),
  AuthController.getUserInfo,
);

//** get single user info */
router.get('/user', auth(), AuthController.getSingleUserInfo);

//** update user name */
router.patch('/user-info/:id', auth(), AuthController.updateUserName);

//** Export Auth Routes  */
export const AuthRoute = router;
