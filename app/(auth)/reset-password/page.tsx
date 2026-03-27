"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Typography } from "@/components/typography"

export default function ResetPasswordPage() {
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

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
      <form className="flex flex-col gap-5">
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
              className="h-11 border border-input bg-background text-foreground placeholder:text-muted-foreground pr-10 focus-visible:border-primary"
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
              className="h-11 border border-input bg-background text-foreground placeholder:text-muted-foreground pr-10 focus-visible:border-primary"
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
        </div>

        {/* Submit */}
        <Button
          id="reset-submit"
          type="submit"
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-lg shadow-md"
        >
          Reset Password
        </Button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link href="/login">
          <span className="font-semibold text-secondary hover:underline">
            Back to sign in
          </span>
        </Link>
      </p>
    </div>
  )
}
