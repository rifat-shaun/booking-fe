import { z } from 'zod';

const phoneVerification = z.object({
  body: z
    .object({
      phone: z
        .string()
        .min(10)
        .max(14)
        .regex(
          /^(\+\d{1,4}\s?)?(\d{1,4}[-.\s]?)?\(?\d{1,6}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,5})?$/,
          'Phone number must be a valid number',
        ),
    })
    .strict(),
});

const signup = z.object({
  body: z
    .object({
      name: z.string().min(2).max(50).optional(),
      phone: z
        .string()
        .min(10)
        .max(14)
        .regex(
          /^(\+\d{1,4}\s?)?(\d{1,4}[-.\s]?)?\(?\d{1,6}\)?[-.\s]?\d{1,9}([-.\s]?\d{1,5})?$/,
          'Phone number must be a valid number',
        ),
      email: z.string().email('Email must be a valid email'),
      password: z
        .string()
        .min(8, 'Password must be at least 6 characters')
        .optional(),
      role: z.string().optional(),
    })
    .strict(),
});

const loginWithEmailPassword = z.object({
  body: z
    .object({
      email: z.string().email('Email must be a valid email'),
      password: z.string(),
    })
    .strict(),
});

const loginWithPhonePassword = z.object({
  body: z
    .object({
      phone: z.string(),
      password: z.string(),
    })
    .strict(),
});

const loginWithPhoneOtp = z.object({
  body: z
    .object({
      phone: z.string(),
      otp: z.string().length(6, 'OTP must be 6 digits'),
    })
    .strict(),
});

const forgotPassword = z.object({
  body: z
    .object({
      email: z.string().email('Email must be a valid email'),
    })
    .strict(),
});

const resetPassword = z.object({
  body: z.object({
    token: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

export const AuthValidation = {
  phoneVerification,
  signup,
  loginWithEmailPassword,
  loginWithPhonePassword,
  loginWithPhoneOtp,
  forgotPassword,
  resetPassword,
};
