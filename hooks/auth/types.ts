export type SignUpProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // confirmPassword: string;
  username: string;
  role: string;
};


export type LoginProps = {
  email: string;
  password: string;
};


export type ConfirmOtpProps = {
  email: string;
  otp_code: string;
};
