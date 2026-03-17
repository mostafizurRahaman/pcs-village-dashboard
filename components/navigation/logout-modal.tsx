"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PowerIcon, Loader2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"

// ─── Props ────────────────────────────────────────────────────────────────────

interface LogoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Override the default logout behaviour (navigates to /login) */
  onConfirm?: () => void | Promise<void>
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LogoutModal({ open, onOpenChange, onConfirm }: LogoutModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      if (onConfirm) {
        await onConfirm()
      } else {
        // TODO: call your auth signOut() here, e.g. await signOut()
        router.push("/")
      }
    } finally {
      setIsLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/*
        Override DialogContent to match Figma exactly:
        - bg: #1a2332  (var --surface)
        - border: 2px solid #29b4aa (teal)
        - rounded-[20px]
        - max-w-[500px]
        Remove shadcn's default bg-background and ring so our styles take priority.
      */}
      <DialogContent
        showCloseButton={false}
        className={cn(
          "flex flex-col items-center gap-8 p-8",
          "w-full max-w-[500px] sm:max-w-[500px] rounded-[20px]",
          "border-2 border-[#29b4aa]",
          "bg-[#1a2332]",
          "[&>button]:hidden" // hide default X button — we use DialogClose in footer
        )}
      >
        {/* ── Power icon — Figma: 70px circle bg rgba(245,101,101,0.18) ── */}
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{ width: 70, height: 70, backgroundColor: "rgba(245,101,101,0.18)" }}
        >
          <PowerIcon
            size={36}
            strokeWidth={2}
            style={{ color: "#f56565" }}
          />
        </div>

        {/* ── Header: title + description ─────────────────────────────── */}
        <DialogHeader className="flex flex-col items-center gap-4 text-center w-full">
          {/*
            DialogTitle — Figma: 35px SemiBold, white
            Override the default "text-base leading-none font-medium" with our sizes
          */}
          <DialogTitle
            className="font-semibold text-white text-center leading-tight"
            style={{ fontSize: 35 }}
          >
            Ready to sign out?
          </DialogTitle>

          {/*
            DialogDescription — Figma: 20px Medium, #a0aec0
            Two lines, each its own paragraph
          */}
          <DialogDescription
            className="flex flex-col gap-3 font-medium text-center"
            style={{ fontSize: 20, color: "#a0aec0" }}
          >
            <Typography variant="Medium_H5" as="span" className="text-muted-foreground">
              Do you really want to log out?
            </Typography>
            <Typography variant="Medium_H5" as="span" className="text-muted-foreground">
              You will need to log in again to access admin
            </Typography>
          </DialogDescription>
        </DialogHeader>

        {/* ── Footer: Cancel + Log out ─────────────────────────────────── */}
        <DialogFooter
          className={cn(
            // Remove DialogFooter's default -mx-4 -mb-4 border-t bg-muted/50 p-4 styles
            "flex-row items-center justify-center gap-4",
            "border-none bg-transparent p-0 m-0 mt-2 w-full sm:justify-center"
          )}
        >
          {/*
            Cancel — Figma: bg-[#0a1628], border-[1.6px] border-[#a0aec0], rounded-[16px], w-215px
            Use Button variant="outline" as base, override colors
          */}
          <DialogClose asChild>
            <Button
              id="btn-logout-cancel"
              variant="outline"
              size="lg"
              className={cn(
                "font-bold rounded-[16px] h-[56px]",
                "border-[1.6px] border-[#a0aec0]",
                "bg-[#0a1628] text-white",
                "hover:bg-[#0a1628]/80 hover:text-white hover:border-[#a0aec0]",
                "dark:border-[#a0aec0] dark:bg-[#0a1628] dark:hover:bg-[#0a1628]/80"
              )}
              style={{ width: 215, fontSize: 18 }}
            >
              Cancel
            </Button>
          </DialogClose>

          {/*
            Log out — Figma: bg-[#0a1628], border-[1.6px] border-[#f56565], rounded-[16px], w-215px, color-[#f56565]
            Use Button variant="destructive" as base, override to outline-style destructive
          */}
          <Button
            id="btn-logout-confirm"
            variant="outline"
            size="lg"
            disabled={isLoading}
            onClick={handleLogout}
            className={cn(
              "font-bold rounded-[16px] h-[56px]",
              "border-[1.6px] border-[#f56565]",
              "bg-[#0a1628] text-[#f56565]",
              "hover:bg-[#f56565]/10 hover:text-[#f56565] hover:border-[#f56565]",
              "dark:border-[#f56565] dark:bg-[#0a1628] dark:hover:bg-[#f56565]/10 dark:text-[#f56565]"
            )}
            style={{ width: 215, fontSize: 18 }}
          >
            {isLoading && <Loader2 size={16} className="mr-2 animate-spin" />}
            {isLoading ? "Signing out…" : "Log out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
