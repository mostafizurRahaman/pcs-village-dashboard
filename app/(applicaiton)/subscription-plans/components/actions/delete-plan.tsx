"use client"

import { useState } from "react"
import { Loader2, AlertTriangle } from "lucide-react"
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
import { ISubscriptionPlan } from "@/types/subscription-plan"

export function DeletePlanPopup({
  open,
  onOpenChange,
  plan,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  plan: ISubscriptionPlan | null
  onSuccess?: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      // Stripe logic: Archive Price and Product
      await new Promise((r) => setTimeout(r, 1000))
      toast.success(`Plan "${plan?.planName}" archived`)
      onSuccess?.()
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (!plan) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm rounded-xl p-6"
        showCloseButton={false}
      >
        <div className="mb-5 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4 text-destructive ring-4 ring-destructive/5">
            <AlertTriangle className="h-8 w-8" />
          </div>
        </div>
        <DialogHeader className="items-center text-center">
          <DialogTitle>
            <Typography variant="Bold_H4">Archive Plan?</Typography>
          </DialogTitle>
          <DialogDescription asChild>
            <Typography
              variant="Regular_H7"
              className="mt-2 text-muted-foreground"
            >
              Archiving <b>{plan.planName}</b> will stop new users from
              subscribing. Existing subscribers will not be affected.
            </Typography>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-8 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Archive Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
