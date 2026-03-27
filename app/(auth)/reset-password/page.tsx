import type { Metadata } from "next"
import ResetPasswordForm from "./reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Create a new secure password for your PCS Village Admin account.",
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
