import { object, string, TypeOf } from "zod";

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

export const createProverbSchema = object({
  body: object({
    proverb: string({ required_error: "Proverb not provided" }).min(
      40,
      "Characters seems too short"
    ),
    country: string({ required_error: "Country is required" }),
    interpretation: string({ required_error: "Interpretation is required" }),
    // translations: array
  }),
  params: object({
    adminId: string({ required_error: "Admin Id not provided" }),
  }),
});

export const deleteProverbSchema = object({
  params: object({
    proverbId: string(),
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
