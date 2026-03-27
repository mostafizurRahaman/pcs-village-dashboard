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
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/schemas/auth"

const inputCls =
  "h-11 border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary"

export default function ResetPasswordForm() {
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  })

  async function onSubmit(data: ResetPasswordFormValues) {
    try {
      await new Promise((r) => setTimeout(r, 1000))
      console.log("Reset password:", data)
      toast.success("Password reset successfully! Please sign in.")
    } catch {
      toast.error("Something went wrong. Please try again.")
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
          Reset Password
        </Typography>
        <Typography variant="Regular_P" className="text-muted-foreground !text-[15px]">
          Create a strong new password for your account
        </Typography>
      </div>

      {/* Password strength hint */}
      <div className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
        Password must be at least{" "}
        <strong className="text-foreground">8 characters</strong>{" "}
        and include uppercase, lowercase, a number and a symbol.
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        {/* New Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="reset-new">
            <Typography variant="Medium_H5" className="text-foreground !text-[14px]" as="span">
              New Password
            </Typography>
          </Label>
          <div className="relative">
            <Input
              id="reset-new"
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              className={`${inputCls} pr-10`}
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={() => setShowNew((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle new password visibility"
            >
              {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-xs text-destructive">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="reset-confirm">
            <Typography variant="Medium_H5" className="text-foreground !text-[14px]" as="span">
              Confirm New Password
            </Typography>
          </Label>
          <div className="relative">
            <Input
              id="reset-confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter new password"
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
          id="reset-submit"
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-lg shadow-md"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset Password"}
        </Button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link href="/login">
          <span className="font-semibold text-secondary hover:underline">Back to sign in</span>
        </Link>
      </p>
    </div>
  )
}
