import type { Metadata } from "next"
import SignupForm from "./signup-form"

export const metadata: Metadata = {
  title: "Create Account",
  description: "Register a new admin account for the PCS Village Admin Portal.",
}

export default function SignupPage() {
  return <SignupForm />
}
