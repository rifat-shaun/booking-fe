export type ISignupPayload = {
  name: string;
  phone: string;
  email: string;
  role: string;
  password: string;
};

export type ILoginWithEmailPasswordPayload = {
  email: string;
  password: string;
};

export type ILoginWithPhonePasswordPayload = {
  phone: string;
  password: string;
};

export type ILoginWithPhoneOtpPayload = {
  phone: string;
  otp: string;
};
