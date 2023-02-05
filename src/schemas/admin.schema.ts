import { object, string, TypeOf, array } from "zod";

export const registerAdminSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({ required_error: "Password is required" }).min(
      6,
      "Mininum of 6 characters is required"
    ),
    confirmPassword: string({ required_error: "Confirm Password is required" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export const verifyAdminSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export const forgotPasswordAdminSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Not a valid email"
    ),
  }),
});

export const resetPasswordAdminSchema = object({
  params: object({ id: string(), passwordResetCode: string() }),
  body: object({
    password: string({ required_error: "Password is required" }).min(
      6,
      "Mininum of 6 characters is required"
    ),
    confirmPassword: string({ required_error: "Confirm Password is required" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});

export const approveProverbSchema = object({
  params: object({
    submitProverbid: string(),
  }),
});

// Interfaces
export type RegisterAdminInput = TypeOf<typeof registerAdminSchema>["body"];
export type VerifyAdminInput = TypeOf<typeof verifyAdminSchema>["params"];
export type ForgotPasswordAdminInput = TypeOf<
  typeof forgotPasswordAdminSchema
>["body"];
export type ResetPasswordAdminInput = TypeOf<typeof resetPasswordAdminSchema>;
