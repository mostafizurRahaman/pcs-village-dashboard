"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Shield } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"
import { otpSchema, type OtpFormValues } from "@/schemas/auth"
import { useRouter } from "next/navigation"
import { authApi } from "@/api/auth.api"

const OTP_LENGTH = 6
const RESEND_COOLDOWN = 60 // seconds

export default function OtpForm() {
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Resend cooldown timer
  const [cooldown, setCooldown] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startCooldown() {
    setCooldown(RESEND_COOLDOWN)
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return
    const digit = value.slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    setValue("otp", next.join(""), { shouldValidate: true })
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH)
    const next = [...otp]
    pasted.split("").forEach((ch, i) => { next[i] = ch })
    setOtp(next)
    setValue("otp", next.join(""), { shouldValidate: true })
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  async function onSubmit(data: OtpFormValues) {
    const email = sessionStorage.getItem("fp_email") ?? ""
    if (!email) {
      toast.error("Session expired. Please start over.")
      router.replace("/forgot-password")
      return
    }
    try {
      const res = await authApi.verifyOtp({ email, otp: data.otp })
      // Store resetToken for the next step
      sessionStorage.setItem("fp_resetToken", res.data.resetToken)
      toast.success("Code verified! You may now reset your password.")
      router.push("/reset-password")
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Invalid or expired code. Please try again."
      toast.error(msg)
    }
  }

  async function handleResend() {
    const email = sessionStorage.getItem("fp_email") ?? ""
    if (!email) {
      toast.error("Session expired. Please start over.")
      router.replace("/forgot-password")
      return
    }
    try {
      await authApi.resendOtp(email)
      toast.success("OTP resent successfully!")
      startCooldown()
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Failed to resend OTP."
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
          OTP Verification
        </Typography>
        <Typography variant="Regular_P" className="text-muted-foreground !text-[15px]">
          Enter the 6-digit code sent to your email address
        </Typography>
      </div>

      {/* OTP form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
        <div className="flex flex-col items-center gap-3">
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className={cn(
                  "h-14 w-12 rounded-xl border-2 text-center text-xl font-bold outline-none transition-all duration-200",
                  "bg-background text-foreground",
                  digit
                    ? "border-primary shadow-sm"
                    : "border-input focus:border-primary focus:shadow-sm",
                  errors.otp ? "border-destructive" : ""
                )}
                aria-label={`OTP digit ${i + 1}`}
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-xs text-destructive text-center">{errors.otp.message}</p>
          )}
        </div>

        <Button
          id="otp-submit"
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold rounded-lg shadow-md"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify Code"}
        </Button>
      </form>

      {/* Resend + back links */}
      <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
        <p>
          Didn&apos;t receive the code?{" "}
          {cooldown > 0 ? (
            <span className="text-muted-foreground font-medium">
              Resend in {cooldown}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-secondary hover:underline"
            >
              Resend OTP
            </button>
          )}
        </p>
        <Link href="/forgot-password">
          <span className="text-muted-foreground hover:text-foreground hover:underline text-xs">
            ← Back to forgot password
          </span>
        </Link>
      </div>
    </div>
  )
}
