import type { Metadata } from "next"
import LoginForm from "./login-form"

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to the PCS Village Admin Portal to manage military bases, personnel, and community resources.",
}

export default function LoginPage() {
  return <LoginForm />
}
