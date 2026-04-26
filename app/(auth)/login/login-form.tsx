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
import { Checkbox } from "@/components/ui/checkbox"
import { Typography } from "@/components/typography"
import { loginSchema, type LoginFormValues } from "@/schemas/auth"
import { useRouter } from "next/navigation"
import axiosInstance from "@/lib/axios"
import { useAuth } from "@/hooks/use-auth"

const inputCls =
  "h-11 border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-primary"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { fetchMe } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "dev.mostafiz04@gmail.com",
      password: "test123@PASS",
      rememberMe: false,
    },
  })

  const router = useRouter()

  async function onSubmit(data: LoginFormValues) {
    try {
      const response = await axiosInstance.post("/auth/login", data)

      if (response.data.success) {
        // 1. Save access token FIRST so the axios interceptor can attach it
        localStorage.setItem("accessToken", response.data.data.accessToken)

        // 2. Hydrate the auth store (token is now available for /auth/me)
        await fetchMe()

        // 3. Redirect
        router.push("/dashboard")
        toast.success("Signed in successfully!")
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to login!"
      toast.error(errorMsg)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Logo + page title */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
          <Shield className="h-7 w-7 text-primary-foreground" />
        </div>
        <Typography
          variant="Bold_H2"
          className="mt-2 !text-[28px] text-primary"
        >
          Welcome Back
        </Typography>
        <Typography
          variant="Regular_P"
          className="!text-[15px] text-muted-foreground"
        >
          Sign in to your PCS Village admin account
        </Typography>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        noValidate
      >
        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="login-email">
            <Typography
              variant="Medium_H5"
              className="!text-[14px] text-foreground"
              as="span"
            >
              Email Address
            </Typography>
          </Label>
          <Input
            id="login-email"
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
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">
              <Typography
                variant="Medium_H5"
                className="!text-[14px] text-foreground"
                as="span"
              >
                Password
              </Typography>
            </Label>
            <Link href="/forgot-password">
              <Typography
                variant="Medium_H6"
                className="!text-[13px] text-secondary hover:underline"
                as="span"
              >
                Forgot password?
              </Typography>
            </Link>
          </div>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`${inputCls} pr-10`}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <Checkbox id="remember-me" {...register("rememberMe")} />
          <Label htmlFor="remember-me" className="cursor-pointer">
            <Typography
              variant="Regular_H6"
              className="!text-[13px] text-muted-foreground"
              as="span"
            >
              Remember me for 30 days
            </Typography>
          </Label>
        </div>

        {/* Submit */}
        <Button
          id="login-submit"
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      {/* Footer link */}
      {/* <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup">
          <span className="font-semibold text-secondary hover:underline">
            Create account
          </span>
        </Link>
      </p> */}
    </div>
  )
}
