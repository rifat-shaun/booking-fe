import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

// ** phoneVerification controller **
const phoneVerification = catchAsync(async (req: Request, res: Response) => {
  // destructuring phone number from request body
  const { phone } = req.body;

  //   call phone verification service
  const result = await AuthService.phoneVerification(phone);

  //   return response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Verification code sent to your phone number',
    data: result,
  });
});
const resendPhoneVerificationOtp = catchAsync(
  async (req: Request, res: Response) => {
    // destructuring phone number from request body
    const { phone } = req.body;

    //   call phone verification service
    const result = await AuthService.phoneVerification(phone);

    //   return response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Verification code sent to your phone number',
      data: result,
    });
  },
);

// ** signup controller **
const signup = catchAsync(async (req: Request, res: Response) => {
  // call signup service
  const result = await AuthService.signup(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Signup successful',
    data: result,
  });
});

//** login with email-password route controller */
const loginWithEmailPassword = catchAsync(
  async (req: Request, res: Response) => {
    // call login with email password service
    const result = await AuthService.loginWithEmailPassword(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login successful',
      data: result,
    });
  },
);

//** login with phone-password route controller */
const loginWithPhonePassword = catchAsync(
  async (req: Request, res: Response) => {
    // call login with phone password service
    const result = await AuthService.loginWithPhonePassword(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login successful',
      data: result,
    });
  },
);

//** Validate Token Controller */
const validateToken = catchAsync(async (req: Request, res: Response) => {
  // extract token from request params
  const token = req.params.token;

  // call validate token service
  const result = await AuthService.validateToken(token);

  // return response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Token is valid',
    data: result,
  });
});

//** send otp for login route controller */
const sendOtpForLogin = catchAsync(async (req: Request, res: Response) => {
  // get phone number from request body
  const { phone } = req.body;

  //   call phone verification service to send otp
  await AuthService.sendOtpForLogin(phone);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'An OTP has been sent to your phone number',
  });
});

//** login with phone-otp route controller */
const loginWithPhoneOtp = catchAsync(async (req: Request, res: Response) => {
  // call login with phone otp service
  const result = await AuthService.loginWithPhoneOtp(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

//** forgot password route controller */
const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  // get email from request body
  const { email } = req.body;
  // call forgot password service
  const result = await AuthService.forgotPassword(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result || '',
  });
});

//** reset password route controller */
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  // get token and password from request body
  const { token, password } = req.body;

  // call reset password service
  const result = await AuthService.resetPassword(token, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result,
  });
});

//** get user info controller */
const getUserInfo = catchAsync(async (req: Request, res: Response) => {
  // if (!req.user) {
  //   throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
  // }
  // req.user?.userId
  const result = await AuthService.getUserInfo();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User info fetched successfully',
    data: result,
  });
});

//** get single user info controller */
const getSingleUserInfo = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await AuthService.getSingleUserInfo(user?.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User info fetched successfully',
    data: result,
  });
});

// update user info
const updateUserName = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
  const { id } = req.params;
  const { name } = req.body;
  const result = await AuthService.updateUserName(id, name);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User name updated successfully',
    data: result,
  });
});

//** Export Auth Controllers */
export const AuthController = {
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
