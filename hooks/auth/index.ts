import axios, { AxiosRequestConfig } from "axios";
import {
  ConfirmOtpProps,
  LoginProps,
  SignUpProps,} from "./types";
import { toast } from "@/components/ui/use-toast";



export const AuthSignUp = async (payload: SignUpProps) => {
  const config = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_TOKEN_API_URL}/studentSignup`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log("Payload:", payload);
  return await axios(config);

};

export const AdminAuthSignUp = async (payload: SignUpProps) => {
  const config = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_TOKEN_API_URL}/superAdminSignup`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log("Payload:", payload);
  return await axios(config);
};

export const AuthLogin = async ({ ...rest }: LoginProps) => {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_TOKEN_API_URL}/studentLogin`,
    data: rest,
  };

  try {
    const response = await axios(config);
    console.log('Backend response:', response.data);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log('Error response from backend:', error.response.data);
      toast({
        title: `Something went wrong!`,
        description: error.response.data.message || "Unable to login",
        className: "toast-error",
      })
    }
    throw error;
  }
};

//changed adminLogin to superAdminLogin for testing. Will change back
export const AdminAuthLogin = async ({ ...rest }: LoginProps) => {
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_TOKEN_API_URL}/superAdminLogin`,
    data: rest,
  };

  try {
    const response = await axios(config);
    console.log('Backend response:', response.data);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log('Error response from backend:', error.response.data);
      toast({
        title: `Something went wrong!`,
        description: error.response.data.message || "Unable to login",
        className: "toast-error",
      })
    }
    throw error;
  }
};


export const AuthConfirmOtp = async (payload: {
  email: string;
  otp_code: string;
}) => {
  const config = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_TOKEN_API_URL}/otp/send-otp`,
    data: payload,
  };

  const { data } = await axios(config);

  return data;
};


export const ResendOtp = async (payload: {
}) => {
  const config = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_TOKEN_API_URL}/otp/resend-otp`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    }
  };

  const { data } = await axios(config);

  return data;
};
