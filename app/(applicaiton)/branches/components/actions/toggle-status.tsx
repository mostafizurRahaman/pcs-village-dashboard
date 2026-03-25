"use client"

import * as React from "react"
import { Loader2, Power, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { IBranch } from "@/types/branches"

interface ToggleStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  branch: IBranch | null
  onSuccess?: () => void
}

export function ToggleBranchStatusModal({
  open,
  onOpenChange,
  branch,
  onSuccess,
}: ToggleStatusModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  if (!branch) return null

  const isActivating = branch.status === "Inactive"
  const actionLabel = isActivating ? "Activate" : "Deactivate"

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      // Simulated API Call
      await new Promise((resolve) => setTimeout(resolve, 800))

      toast.success(
        `Branch "${branch.branchName}" has been ${isActivating ? "activated" : "deactivated"}`
      )
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to update status")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm overflow-hidden rounded-xl border-border bg-card p-0">
        {/* Dynamic accent bar based on action */}
        <div
          className={`h-1.5 w-full ${isActivating ? "bg-emerald-500" : "bg-amber-500"}`}
        />

        <div className="p-6">
          <div className="mb-5 flex justify-center">
            <div
              className={`rounded-full p-4 ring-4 ${
                isActivating
                  ? "bg-emerald-500/10 text-emerald-500 ring-emerald-500/5"
                  : "bg-amber-500/10 text-amber-500 ring-amber-500/5"
              }`}
            >
              {isActivating ? (
                <CheckCircle2 className="h-8 w-8" />
              ) : (
                <Power className="h-8 w-8" />
              )}
            </div>
          </div>

          <DialogHeader className="items-center gap-2 text-center">
            <DialogTitle asChild>
              <Typography variant="Bold_H4">{actionLabel} Branch?</Typography>
            </DialogTitle>
            <DialogDescription asChild>
              <Typography
                variant="Regular_H7"
                className="leading-relaxed text-muted-foreground"
              >
                Are you sure you want to {actionLabel.toLowerCase()} the branch{" "}
                <span className="font-semibold text-foreground">
                  {branch.branchName}
                </span>
                ?
              </Typography>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-8 flex gap-3 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1 border-border"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleToggle}
              disabled={isLoading}
              className={`flex-1 text-white ${
                isActivating
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>Confirm {actionLabel}</>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
