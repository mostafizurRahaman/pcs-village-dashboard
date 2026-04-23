"use client"

import { useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { usePathname, useRouter } from "next/navigation"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchMe, isLoading, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  useEffect(() => {
    // 1. If not loading and not authenticated, redirect to login (except on auth pages)
    const isAuthPage =
      pathname.startsWith("/login") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/forgot-password") ||
      pathname.startsWith("/otp-verification") ||
      pathname.startsWith("/reset-password")

    if (!isLoading && !isAuthenticated && !isAuthPage) {
      router.replace("/login")
    }

    // 2. If authenticated and trying to access login/signup, redirect to dashboard
    if (!isLoading && isAuthenticated && isAuthPage) {
      router.replace("/dashboard")
    }
  }, [isLoading, isAuthenticated, pathname, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return <>{children}</>
}
