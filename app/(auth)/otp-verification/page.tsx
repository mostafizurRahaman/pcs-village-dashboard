import type { Metadata } from "next"
import OtpForm from "./otp-form"

export const metadata: Metadata = {
  title: "OTP Verification",
  description:
    "Enter the one-time code sent to your email to verify your identity.",
}

export default function OtpVerificationPage() {
  return <OtpForm />
}
