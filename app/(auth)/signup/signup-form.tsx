"use client"

import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2, Shield } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Typography } from "@/components/typography"
import { signupSchema, type SignupFormValues } from "@/schemas/auth"

const inputCls =
  "h-11 border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary"

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  })

  async function onSubmit(data: SignupFormValues) {
    try {
      await new Promise((r) => setTimeout(r, 1000))
      console.log("Signup data:", data)
      toast.success("Account created successfully!")
    } catch {
      toast.error("Registration failed. Please try again.")
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
          Create Account
        </Typography>
        <Typography variant="Regular_P" className="text-muted-foreground !text-[15px]">
          Register a new PCS Village admin account
        </Typography>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="signup-name">
            <Typography variant="Medium_H5" className="text-foreground !text-[14px]" as="span">
              Full Name
            </Typography>
          </Label>
          <Input
            id="signup-name"
            type="text"
            placeholder="John Doe"
            className={inputCls}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="signup-email">
            <Typography variant="Medium_H5" className="text-foreground !text-[14px]" as="span">
              Email Address
            </Typography>
          </Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="admin@pcsvillage.com"
            className={inputCls}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="signup-password">
            <Typography variant="Medium_H5" className="text-foreground !text-[14px]" as="span">
              Password
            </Typography>
          </Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              className={`${inputCls} pr-10`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="signup-confirm">
            <Typography variant="Medium_H5" className="text-foreground !text-[14px]" as="span">
              Confirm Password
            </Typography>
          </Label>
          <div className="relative">
            <Input
              id="signup-confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              className={`${inputCls} pr-10`}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <Button
          id="signup-submit"
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-lg shadow-md"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
        </Button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login">
          <span className="font-semibold text-secondary hover:underline">Sign in</span>
        </Link>
      </p>
    </div>
  )
}
