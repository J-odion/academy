import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const QUERY_KEYS = {
  signUp: "signup",
  adminSignUp: "adminSignUp",
  superAdminSignUp: "superAdminSignUp",
  adminLogin: "adminLogin",
  login: "login",
  profile: "profile",
  confirmOtp: "confirmOtp",
  resendOtp: "resendOtp",
  verifyEmail: "verifyEmail",
  forgotPassword: "forgotPassword",
  resetPassword: "resetPassword",
  getProfile: "getProfile",
  updateProfile: "updateProfile",
  changePassword: "changePassword",
};


export const LOCAL_DATA = {
  spicityUserMail: "",
}
