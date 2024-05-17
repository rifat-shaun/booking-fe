/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { comparePassword, hashPassword } from '../../../shared/bcrypt';
import prisma from '../../../shared/prisma';
import { sendEmail } from '../../../utils/sendMail';
import {
  ILoginWithEmailPasswordPayload,
  ILoginWithPhoneOtpPayload,
  ILoginWithPhonePasswordPayload,
  ISignupPayload,
} from './auth.interface';
import { sendSms } from '../../../utils/sendSms';

// ** phone-verification service **
const phoneVerification = async (phone: string) => {
  // check if user already exists associated with the phone number
  const user = await prisma.user.findUnique({
    where: {
      phone: phone,
    },
    select: {
      id: true,
    },
  });
  // if user exists, return error
  if (user) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User already exists with this phone number',
    );
  }

  // generate 6 digit otp code
  const otpCode = Math.floor(100000 + Math.random() * 900000);
  //! remove this segment after testing
  console.log(otpCode);
  //! remove this segment after testing

  //   initiate new transaction
  const result = await prisma.$transaction(async transactionClient => {
    // send otp to phone number
    // TODO: uncomment this line to send sms
    await sendSms(phone, `Your OTP code is ${otpCode}`);

    // prepare otp data
    const otpData = {
      phone,
      otp: otpCode.toString(),
      expires_at: new Date(
        Date.now() + Number(config.otp.expires_in) * 60 * 1000,
      ),
    };

    // delete old otp code
    await transactionClient.otp.deleteMany({
      where: {
        phone,
      },
    });

    // save otp code to database
    const responseData = await transactionClient.otp.create({
      data: otpData,
      select: {
        phone: true,
        expires_at: true,
      },
    });

    // return response data
    return responseData;
  });
  return result;
};
const resendPhoneVerificationOtp = async (phone: string) => {
  // check if user already exists associated with the phone number
  const user = await prisma.user.findUnique({
    where: {
      phone: phone,
    },
    select: {
      id: true,
    },
  });
  // if user exists, return error
  if (!user) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User is not exists with this phone number',
    );
  }

  // generate 6 digit otp code
  const otpCode = Math.floor(100000 + Math.random() * 900000);
  //! remove this segment after testing
  console.log(otpCode);
  //! remove this segment after testing

  //   initiate new transaction
  const result = await prisma.$transaction(async transactionClient => {
    // send otp to phone number
    // TODO: uncomment this line to send sms
    await sendSms(phone, `Your OTP code is ${otpCode}`);

    // prepare otp data
    const otpData = {
      phone,
      otp: otpCode.toString(),
      expires_at: new Date(
        Date.now() + Number(config.otp.expires_in) * 60 * 1000,
      ),
    };

    // delete old otp code
    await transactionClient.otp.deleteMany({
      where: {
        phone,
      },
    });

    // save otp code to database
    const responseData = await transactionClient.otp.create({
      data: otpData,
      select: {
        phone: true,
        expires_at: true,
      },
    });

    // return response data
    return responseData;
  });

  return result;
};

// ** signup service **
const signup = async (payload: ISignupPayload) => {
  // get phone, otp, email, password from payload
  const { name, phone, email, password, role } = payload;

  // check if user exists associated with the phone number or email
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          phone,
        },
        {
          email,
        },
      ],
    },
  });

  // check if user exists
  if (userExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'User already exists associated with this phone number or email',
    );
  }

  // // get otp data from database otp table associated with the phone number
  // const otpData = await prisma.otp.findFirst({
  //   where: {
  //     phone,
  //   },
  // });

  // // check if otp data exists on database
  // if (!otpData) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'OTP not found. Resend OTP');
  // }

  // check if otp code is expired
  // if (otpData.expires_at < new Date() || otpData.is_used) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     'OTP code is expired or already used'
  //   );
  // }

  // // check if otp code is correct
  // if (otpData.otp !== otp) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'OTP code is incorrect');
  // }

  // hash password
  const encryptedPassword = await hashPassword(password);

  // prepare user data
  const userData = {
    name,
    phone,
    email,
    password: encryptedPassword,
    role: role ? Role.admin : Role.user,
  };

  const result = await prisma.user.create({
    data: userData,
  });

  // //   initiate new transaction to save user data and delete otp code
  // await prisma.$transaction(async transactionClient => {
  //   // save user data
  //   await transactionClient.user.create({
  //     data: userData,
  //     select: {
  //       id: true,
  //     },
  //   });

  //   // delete otp code
  //   // await transactionClient.otp.deleteMany({
  //   //   where: {
  //   //     phone,
  //   //   },
  //   // });
  // });

  return result;
};

const loginWithEmailPassword = async (
  payload: ILoginWithEmailPasswordPayload,
) => {
  // get email and password from payload
  const { email, password } = payload;
  console.log(email);

  // get user data
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  // check if user exists
  if (!user) {
    throw new ApiError(400, 'User not found');
  }

  // check if password is correct or not
  if (user.password && !(await comparePassword(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password in incorrect');
  }

  // ! remove this segment after testing

  //   prepare jwt payload token data
  const jwtPayload = { userId: user.id, role: user.role };

  //   generate access token
  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return { accessToken, user, id: user.id };
};

//** login with phone-password service **
const loginWithPhonePassword = async (
  payload: ILoginWithPhonePasswordPayload,
) => {
  // get phone and password from payload
  const { phone, password } = payload;

  //   get user data
  const user = await prisma.user.findFirst({
    where: {
      phone,
    },
  });

  //   check if user exists or not
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User not found associated with this phone number',
    );
  }

  // check if password is correct or not
  if (user.password && !(await comparePassword(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password in incorrect');
  }

  // ! remove this segment after testing
  let permissions: any = {
    product: {
      create: true,
      update: true,
      delete: true,
      view: true,
    },

    category: {
      create: false,
      update: true,
      delete: true,
      view: true,
    },
  };

  if (user.role === Role.admin || user.role === Role.super_admin) {
    permissions = null;
  } else {
    console.log('user.role', user.role);
    // TODO: get permissions from database
  }
  // ! remove this segment after testing

  //   prepare jwt payload token data
  const jwtPayload = { userId: user.id, role: user.role, permissions };

  //   generate access token
  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return { accessToken };
};

// ** validate token service **
const validateToken = async (token: string) => {
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Token is required');
  }
  //   verify token
  const result = await jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret,
  );

  if (!result) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }

  // get user data from database
  const user = await prisma.user.findUnique({
    where: {
      id: result.userId,
    },
    select: {
      id: true,
      role: true,
      email: true,
    },
  });

  // check if user exists
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

//** send otp for login service **
const sendOtpForLogin = async (phone: string) => {
  // check if user exists or not
  const user = await prisma.user.findUnique({
    where: {
      phone,
    },
  });
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User not found associated with this phone number',
    );
  }

  // generate 6 digit otp code
  const otpCode = Math.floor(100000 + Math.random() * 900000);
  //   TODO: remove this line after testing
  console.log(otpCode);

  // new transaction
  await prisma.$transaction(async transactionClient => {
    // send otp to phone number
    // TODO: uncomment this line to send sms
    // await sendSms(phone, `Your OTP code is ${otpCode}`);

    // prepare otp data
    const otpData = {
      phone,
      otp: otpCode.toString(),
      expires_at: new Date(
        Date.now() + Number(config.otp.expires_in) * 60 * 1000,
      ),
    };

    // delete old otp code
    await transactionClient.otp.deleteMany({
      where: {
        phone,
      },
    });

    // save otp code to database
    await transactionClient.otp.create({
      data: otpData,
    });
  });

  return;
};

//** Login with phone and otp service */
const loginWithPhoneOtp = async (payload: ILoginWithPhoneOtpPayload) => {
  const { phone, otp } = payload;

  const result = await prisma.$transaction(async transactionClient => {
    // check if user exists
    const user = await transactionClient.user.findUnique({
      where: {
        phone,
      },
    });

    // check if user exists or not
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'User not found associated with this phone number',
      );
    }

    // get otp data
    const otpData = await transactionClient.otp.findFirst({
      where: {
        phone,
      },
    });

    // check if otp data exists
    if (!otpData) {
      throw new ApiError(httpStatus.NOT_FOUND, 'OTP data not found');
    }

    // check if otp code is expired
    if (otpData.expires_at < new Date() || otpData.is_used) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'OTP code is expired or already used',
      );
    }

    // check if otp code is correct
    if (otpData.otp !== otp) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'OTP code is incorrect');
    }

    // ! remove this segment after testing
    let permissions: any = {
      product: {
        create: true,
        update: true,
        delete: true,
        view: true,
      },

      category: {
        create: false,
        update: true,
        delete: true,
        view: true,
      },
    };

    if (user.role === Role.admin || user.role === Role.super_admin) {
      permissions = null;
    } else {
      console.log('user.role', user.role);
      // TODO: get permissions from database
    }
    // ! remove this segment after testing

    //   prepare jwt payload token data
    const jwtPayload = { userId: user.id, role: user.role, permissions };

    //   generate access token
    const accessToken = jwtHelpers.createToken(
      jwtPayload,
      config.jwt.secret as Secret,
      config.jwt.expires_in as string,
    );

    // update otp code status to used
    await transactionClient.otp.update({
      where: {
        id: otpData.id,
      },
      data: {
        is_used: true,
      },
    });

    return { accessToken };
  });

  return result;
};

//** forgot password service */
const forgotPassword = async (email: string) => {
  // check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'User not found associated with this email',
    );
  }

  //   generate reset password token
  const resetPasswordToken = jwtHelpers.createToken(
    { userId: user.id },
    config.forgot_password_secret as Secret,
    config.forgot_password_secret_expires_in as string,
  );

  // prepare reset-password link
  const resetPasswordLink = `<p>Reset your account password.</p><a href="${config.client_url}/reset-password?token=${resetPasswordToken}">Reset Password</a>`;
  // send email reset-password link
  sendEmail(email, 'Reset Smart Menu Account Password', resetPasswordLink);

  return 'An reset-password link has been sent to your email.';
};

//** reset password service */
const resetPassword = async (token: string, password: string) => {
  //   verify token
  const decodedData = jwtHelpers.verifyToken(
    token,
    config.forgot_password_secret as Secret,
  );

  if (!decodedData) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }

  // hash password
  const encryptedPassword = await hashPassword(password);

  // update user password
  const result = await prisma.user.update({
    where: {
      id: decodedData.userId,
    },
    data: {
      password: encryptedPassword,
    },
  });

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Can't Update Password. Try Again",
    );
  }

  return 'Password reset successful';
};

//** Get user info service */
// userId: string
const getUserInfo = async () => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user;
};

// get single user info

const getSingleUserInfo = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

// update user name

const updateUserName = async (userId: string, name: string) => {
  console.log({ userId, name });
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });
  console.log(user);
  return user;
};

//** Export Auth Services */
export const AuthService = {
  phoneVerification,
  resendPhoneVerificationOtp,
  signup,
  loginWithEmailPassword,
  loginWithPhonePassword,
  validateToken,
  sendOtpForLogin,
  loginWithPhoneOtp,
  forgotPassword,
  resetPassword,
  getUserInfo,
  updateUserName,
  getSingleUserInfo,
};
