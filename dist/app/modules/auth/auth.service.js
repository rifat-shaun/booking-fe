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
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const bcrypt_1 = require("../../../shared/bcrypt");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const sendMail_1 = require("../../../utils/sendMail");
const sendSms_1 = require("../../../utils/sendSms");
// ** phone-verification service **
const phoneVerification = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user already exists associated with the phone number
    const user = yield prisma_1.default.user.findUnique({
        where: {
            phone: phone,
        },
        select: {
            id: true,
        },
    });
    // if user exists, return error
    if (user) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User already exists with this phone number');
    }
    // generate 6 digit otp code
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    //! remove this segment after testing
    console.log(otpCode);
    //! remove this segment after testing
    //   initiate new transaction
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // send otp to phone number
        // TODO: uncomment this line to send sms
        yield (0, sendSms_1.sendSms)(phone, `Your OTP code is ${otpCode}`);
        // prepare otp data
        const otpData = {
            phone,
            otp: otpCode.toString(),
            expires_at: new Date(Date.now() + Number(config_1.default.otp.expires_in) * 60 * 1000),
        };
        // delete old otp code
        yield transactionClient.otp.deleteMany({
            where: {
                phone,
            },
        });
        // save otp code to database
        const responseData = yield transactionClient.otp.create({
            data: otpData,
            select: {
                phone: true,
                expires_at: true,
            },
        });
        // return response data
        return responseData;
    }));
    return result;
});
const resendPhoneVerificationOtp = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user already exists associated with the phone number
    const user = yield prisma_1.default.user.findUnique({
        where: {
            phone: phone,
        },
        select: {
            id: true,
        },
    });
    // if user exists, return error
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User is not exists with this phone number');
    }
    // generate 6 digit otp code
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    //! remove this segment after testing
    console.log(otpCode);
    //! remove this segment after testing
    //   initiate new transaction
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // send otp to phone number
        // TODO: uncomment this line to send sms
        yield (0, sendSms_1.sendSms)(phone, `Your OTP code is ${otpCode}`);
        // prepare otp data
        const otpData = {
            phone,
            otp: otpCode.toString(),
            expires_at: new Date(Date.now() + Number(config_1.default.otp.expires_in) * 60 * 1000),
        };
        // delete old otp code
        yield transactionClient.otp.deleteMany({
            where: {
                phone,
            },
        });
        // save otp code to database
        const responseData = yield transactionClient.otp.create({
            data: otpData,
            select: {
                phone: true,
                expires_at: true,
            },
        });
        // return response data
        return responseData;
    }));
    return result;
});
// ** signup service **
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // get phone, otp, email, password from payload
    const { name, phone, email, password, role } = payload;
    // check if user exists associated with the phone number or email
    const userExists = yield prisma_1.default.user.findFirst({
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
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User already exists associated with this phone number or email');
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
    const encryptedPassword = yield (0, bcrypt_1.hashPassword)(password);
    // prepare user data
    const userData = {
        name,
        phone,
        email,
        password: encryptedPassword,
        role: role ? client_1.Role.admin : client_1.Role.user,
    };
    const result = yield prisma_1.default.user.create({
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
});
const loginWithEmailPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // get email and password from payload
    const { email, password } = payload;
    console.log(email);
    // get user data
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email,
        },
    });
    // check if user exists
    if (!user) {
        throw new ApiError_1.default(400, 'User not found');
    }
    // check if password is correct or not
    if (user.password && !(yield (0, bcrypt_1.comparePassword)(password, user.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password in incorrect');
    }
    // ! remove this segment after testing
    //   prepare jwt payload token data
    const jwtPayload = { userId: user.id, role: user.role };
    //   generate access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken, user, id: user.id };
});
//** login with phone-password service **
const loginWithPhonePassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // get phone and password from payload
    const { phone, password } = payload;
    //   get user data
    const user = yield prisma_1.default.user.findFirst({
        where: {
            phone,
        },
    });
    //   check if user exists or not
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found associated with this phone number');
    }
    // check if password is correct or not
    if (user.password && !(yield (0, bcrypt_1.comparePassword)(password, user.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password in incorrect');
    }
    // ! remove this segment after testing
    let permissions = {
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
    if (user.role === client_1.Role.admin || user.role === client_1.Role.super_admin) {
        permissions = null;
    }
    else {
        console.log('user.role', user.role);
        // TODO: get permissions from database
    }
    // ! remove this segment after testing
    //   prepare jwt payload token data
    const jwtPayload = { userId: user.id, role: user.role, permissions };
    //   generate access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
// ** validate token service **
const validateToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Token is required');
    }
    //   verify token
    const result = yield jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token');
    }
    // get user data from database
    const user = yield prisma_1.default.user.findUnique({
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
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return user;
});
//** send otp for login service **
const sendOtpForLogin = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user exists or not
    const user = yield prisma_1.default.user.findUnique({
        where: {
            phone,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found associated with this phone number');
    }
    // generate 6 digit otp code
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    //   TODO: remove this line after testing
    console.log(otpCode);
    // new transaction
    yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // send otp to phone number
        // TODO: uncomment this line to send sms
        // await sendSms(phone, `Your OTP code is ${otpCode}`);
        // prepare otp data
        const otpData = {
            phone,
            otp: otpCode.toString(),
            expires_at: new Date(Date.now() + Number(config_1.default.otp.expires_in) * 60 * 1000),
        };
        // delete old otp code
        yield transactionClient.otp.deleteMany({
            where: {
                phone,
            },
        });
        // save otp code to database
        yield transactionClient.otp.create({
            data: otpData,
        });
    }));
    return;
});
//** Login with phone and otp service */
const loginWithPhoneOtp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, otp } = payload;
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // check if user exists
        const user = yield transactionClient.user.findUnique({
            where: {
                phone,
            },
        });
        // check if user exists or not
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found associated with this phone number');
        }
        // get otp data
        const otpData = yield transactionClient.otp.findFirst({
            where: {
                phone,
            },
        });
        // check if otp data exists
        if (!otpData) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'OTP data not found');
        }
        // check if otp code is expired
        if (otpData.expires_at < new Date() || otpData.is_used) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'OTP code is expired or already used');
        }
        // check if otp code is correct
        if (otpData.otp !== otp) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'OTP code is incorrect');
        }
        // ! remove this segment after testing
        let permissions = {
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
        if (user.role === client_1.Role.admin || user.role === client_1.Role.super_admin) {
            permissions = null;
        }
        else {
            console.log('user.role', user.role);
            // TODO: get permissions from database
        }
        // ! remove this segment after testing
        //   prepare jwt payload token data
        const jwtPayload = { userId: user.id, role: user.role, permissions };
        //   generate access token
        const accessToken = jwtHelpers_1.jwtHelpers.createToken(jwtPayload, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        // update otp code status to used
        yield transactionClient.otp.update({
            where: {
                id: otpData.id,
            },
            data: {
                is_used: true,
            },
        });
        return { accessToken };
    }));
    return result;
});
//** forgot password service */
const forgotPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user exists
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found associated with this email');
    }
    //   generate reset password token
    const resetPasswordToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user.id }, config_1.default.forgot_password_secret, config_1.default.forgot_password_secret_expires_in);
    // prepare reset-password link
    const resetPasswordLink = `<p>Reset your account password.</p><a href="${config_1.default.client_url}/reset-password?token=${resetPasswordToken}">Reset Password</a>`;
    // send email reset-password link
    (0, sendMail_1.sendEmail)(email, 'Reset Smart Menu Account Password', resetPasswordLink);
    return 'An reset-password link has been sent to your email.';
});
//** reset password service */
const resetPassword = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    //   verify token
    const decodedData = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.forgot_password_secret);
    if (!decodedData) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid token');
    }
    // hash password
    const encryptedPassword = yield (0, bcrypt_1.hashPassword)(password);
    // update user password
    const result = yield prisma_1.default.user.update({
        where: {
            id: decodedData.userId,
        },
        data: {
            password: encryptedPassword,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Can't Update Password. Try Again");
    }
    return 'Password reset successful';
});
//** Get user info service */
// userId: string
const getUserInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
        },
    });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return user;
});
// get single user info
const getSingleUserInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return user;
});
// update user name
const updateUserName = (userId, name) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ userId, name });
    const user = yield prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data: {
            name,
        },
    });
    console.log(user);
    return user;
});
//** Export Auth Services */
exports.AuthService = {
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
