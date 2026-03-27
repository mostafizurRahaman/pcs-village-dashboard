"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Loader2 } from "lucide-react"

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

interface LogoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm?: () => void | Promise<void>
}

export function LogoutModal({ open, onOpenChange, onConfirm }: LogoutModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      if (onConfirm) {
        await onConfirm()
      } else {
        router.push("/login")
      }
    } finally {
      setIsLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col items-center gap-5 p-6 w-full max-w-xs rounded-2xl border border-border bg-card [&>button]:hidden"
      >
        {/* Icon */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-destructive/10">
          <LogOut className="h-6 w-6 text-destructive" />
        </div>

        {/* Header */}
        <DialogHeader className="flex flex-col items-center gap-2 text-center w-full">
          <DialogTitle className="text-base font-semibold text-foreground leading-tight">
            Ready to sign out?
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center leading-relaxed">
            Do you really want to log out? You will need to sign in again to
            access the admin portal.
          </DialogDescription>
        </DialogHeader>

        {/* Footer */}
        <DialogFooter className="flex-row items-center justify-center gap-3 border-none bg-transparent p-0 m-0 w-full sm:justify-center">
          <DialogClose asChild>
            <Button
              id="btn-logout-cancel"
              variant="outline"
              className="flex-1 h-10 rounded-lg border-border text-foreground"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            id="btn-logout-confirm"
            variant="destructive"
            disabled={isLoading}
            onClick={handleLogout}
            className="flex-1 h-10 rounded-lg"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Log out"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
