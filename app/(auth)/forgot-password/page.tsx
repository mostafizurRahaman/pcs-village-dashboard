import type { Metadata } from "next"
import ForgotPasswordForm from "./forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your PCS Village Admin password by verifying your email address.",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
