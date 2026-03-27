import { z } from "zod"

/* ─────────────────────────────────────────────
   Shared rules
───────────────────────────────────────────── */
const emailField = z
  .string()
  .min(1, "Email address is required")
  .email("Enter a valid email address")

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")

/* ─────────────────────────────────────────────
   Login
───────────────────────────────────────────── */
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

/* ─────────────────────────────────────────────
   Signup
───────────────────────────────────────────── */
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(80, "Full name must be at most 80 characters"),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignupFormValues = z.infer<typeof signupSchema>

/* ─────────────────────────────────────────────
   Forgot Password
───────────────────────────────────────────── */
export const forgotPasswordSchema = z.object({
  email: emailField,
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

/* ─────────────────────────────────────────────
   OTP Verification
───────────────────────────────────────────── */
export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Please enter the complete 6-digit code")
    .regex(/^\d{6}$/, "OTP must contain digits only"),
})

export type OtpFormValues = z.infer<typeof otpSchema>

/* ─────────────────────────────────────────────
   Reset Password
───────────────────────────────────────────── */
export const resetPasswordSchema = z
  .object({
    newPassword: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
