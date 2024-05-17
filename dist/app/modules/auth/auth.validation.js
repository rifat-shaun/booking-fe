"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const phoneVerification = zod_1.z.object({
    body: zod_1.z
        .object({
        phone: zod_1.z
            .string()
            .min(10)
            .max(14)
            .regex(/^(\+\d{1,4}\s?)?(\d{1,4}[-.\s]?)?\(?\d{1,6}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,5})?$/, 'Phone number must be a valid number'),
    })
        .strict(),
});
const signup = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().min(2).max(50).optional(),
        phone: zod_1.z
            .string()
            .min(10)
            .max(14)
            .regex(/^(\+\d{1,4}\s?)?(\d{1,4}[-.\s]?)?\(?\d{1,6}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,5})?$/, 'Phone number must be a valid number'),
        email: zod_1.z.string().email('Email must be a valid email'),
        password: zod_1.z
            .string()
            .min(8, 'Password must be at least 6 characters')
            .optional(),
        role: zod_1.z.string().optional(),
    })
        .strict(),
});
const loginWithEmailPassword = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z.string().email('Email must be a valid email'),
        password: zod_1.z.string(),
    })
        .strict(),
});
const loginWithPhonePassword = zod_1.z.object({
    body: zod_1.z
        .object({
        phone: zod_1.z.string(),
        password: zod_1.z.string(),
    })
        .strict(),
});
const loginWithPhoneOtp = zod_1.z.object({
    body: zod_1.z
        .object({
        phone: zod_1.z.string(),
        otp: zod_1.z.string().length(6, 'OTP must be 6 digits'),
    })
        .strict(),
});
const forgotPassword = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z.string().email('Email must be a valid email'),
    })
        .strict(),
});
const resetPassword = zod_1.z.object({
    body: zod_1.z.object({
        token: zod_1.z.string(),
        password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    }),
});
exports.AuthValidation = {
    phoneVerification,
    signup,
    loginWithEmailPassword,
    loginWithPhonePassword,
    loginWithPhoneOtp,
    forgotPassword,
    resetPassword,
};
