"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Mail, Shield } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Typography } from "@/components/typography"
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/schemas/auth"
import { useRouter } from "next/navigation"
import { authApi } from "@/api/auth.api"

export default function ForgotPasswordForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(data: ForgotPasswordFormValues) {
    try {
      await authApi.forgotPassword(data.email)
      // Persist email so the OTP page can use it
      sessionStorage.setItem("fp_email", data.email)
      toast.success("Verification code sent! Check your inbox.")
      router.push("/otp-verification")
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Something went wrong. Please try again."
      toast.error(msg)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Logo + page title */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
          <Shield className="h-7 w-7 text-primary-foreground" />
        </div>
        <Typography variant="Bold_H2" className="text-primary !text-[28px] mt-2">
          Forgot Password
        </Typography>
        <Typography variant="Regular_P" className="text-muted-foreground !text-[15px]">
          Enter your email and we&apos;ll send you a verification code
        </Typography>
      </div>

      {/* Email illustration */}
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 border-2 border-secondary/30">
          <Mail className="h-9 w-9 text-secondary" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <div className="flex flex-col gap-2">
          <Label htmlFor="forgot-email">
            <Typography variant="Medium_H5" className="text-foreground !text-[14px]" as="span">
              Email Address
            </Typography>
          </Label>
          <Input
            id="forgot-email"
            type="email"
            placeholder="admin@pcsvillage.com"
            className="h-11 border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <Button
          id="forgot-submit"
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-lg shadow-md"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Send Verification Code"
          )}
        </Button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login">
          <span className="font-semibold text-secondary hover:underline">Back to sign in</span>
        </Link>
      </p>
    </div>
  )
}
