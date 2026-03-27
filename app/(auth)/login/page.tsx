"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Typography } from "@/components/typography"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      {/* Logo + page title */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
          <Shield className="h-7 w-7 text-primary-foreground" />
        </div>
        <Typography variant="Bold_H2" className="text-primary !text-[28px] mt-2">
          Welcome Back
        </Typography>
        <Typography variant="Regular_P" className="text-muted-foreground !text-[15px]">
          Sign in to your PCS Village admin account
        </Typography>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="login-email">
            <Typography variant="Medium_H5" className="text-foreground !text-[14px]" as="span">
              Email Address
            </Typography>
          </Label>
          <Input
            id="login-email"
            type="email"
            placeholder="admin@pcsvillage.com"
            className="h-11 border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">
              <Typography variant="Medium_H5" className="text-foreground !text-[14px]" as="span">
                Password
              </Typography>
            </Label>
            <Link href="/forgot-password">
              <Typography variant="Medium_H6" className="text-secondary hover:underline !text-[13px]" as="span">
                Forgot password?
              </Typography>
            </Link>
          </div>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="h-11 border border-input bg-background text-foreground placeholder:text-muted-foreground pr-10 focus-visible:border-primary"
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
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <Checkbox id="remember-me" />
          <Label htmlFor="remember-me" className="cursor-pointer">
            <Typography variant="Regular_H6" className="text-muted-foreground !text-[13px]" as="span">
              Remember me for 30 days
            </Typography>
          </Label>
        </div>

        {/* Submit */}
        <Button
          id="login-submit"
          type="submit"
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-lg shadow-md"
        >
          Sign In
        </Button>
      </form>

      {/* Footer link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup">
          <span className="font-semibold text-secondary hover:underline">
            Create account
          </span>
        </Link>
      </p>
    </div>
  )
}
