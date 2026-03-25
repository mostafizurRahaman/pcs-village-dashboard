"use client"

import { useState } from "react"
import { Loader2, AlertTriangle, Trash2 } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { User } from "@/types/user"

interface DeleteUserPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onSuccess?: () => void
}

export function DeleteUserPopup({
  open,
  onOpenChange,
  user,
  onSuccess,
}: DeleteUserPopupProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    setTimeout(() => {
      toast.success(`User "${user?.name}" has been removed`)
      setIsDeleting(false)
      onOpenChange(false)
      onSuccess?.()
    }, 1000)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-border bg-card rounded-xl p-6 max-w-sm"
        showCloseButton={false}
      >
        {/* Warning icon */}
        <div className="flex justify-center mb-5">
          <div className="rounded-full bg-destructive/10 p-4 ring-4 ring-destructive/5">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>

        <DialogHeader className="items-center text-center gap-2">
          <DialogTitle asChild>
            <Typography variant="Bold_H4" className="text-foreground">
              Delete User?
            </Typography>
          </DialogTitle>
          <Typography variant="Regular_H7" className="text-muted-foreground leading-relaxed">
            You are about to delete{" "}
            <span className="font-semibold text-foreground">{user.name}</span>.
            This will permanently revoke their access and cannot be undone.
          </Typography>
        </DialogHeader>

        <DialogFooter className="mt-6 flex gap-3 sm:gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="flex-1 border-border"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
