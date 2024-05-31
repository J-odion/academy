import { z } from "zod";

export const signUpFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 character(s) long",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
    role: z.string(),
    // token: z.string(),
});

export const signInFormSchema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 character(s)",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
});

export const contactFormSchema = z.object({
  fullname: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const emailVerificationSchema = z.object({
  otp_code: z
    .string()
    .min(6, {
      message: "otp must contain at least 6 character(s)",
    })
    .max(6, {
      message: "otp must contain at most 6 character(s)",
    }),
});

// export const confirmPasswordResetSchema = z.object({
//   email: z.string().email(),
//   otp_code: z
//     .string()
//     .min(6, {
//       message: "Password must not be less than 6 character(s)",
//     })
//     .max(6, { message: "Password must contain at most 6 character(s)" }),
// });

export const resetPasswordSchema = z.object({
  otp: z.string(),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at most 8 character(s)",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must contain at most 8 character(s)",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
});

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 character(s)",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 character(s)",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
  confirmPassword: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 character(s)",
    })
    .max(28, {
      message: "Password must contain at most 28 character(s)",
    }),
});

export const deleteCheckboxSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export const copyFormSchema = z.object({
  lead_id: z.string(),
  follower_id: z.string(),
  risk_type: z.string(),
  risk_multiplier: z.string(),
});

export const addAccountFormSchema = z.object({
  account_type: z.string(),
  account_number: z.string(),
  account_name: z
    .string()
    .min(4, { message: "Account name must contain at most 4 character(s)" }),
  account_password: z.string(),
  broker_server: z.string(),
  broker_name: z.string(),
});

export const deleteAccountFormSchema = z.object({
  delete_account: z.string(),
});
