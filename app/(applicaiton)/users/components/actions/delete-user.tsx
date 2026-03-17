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
    // Simulate API logic
    setTimeout(() => {
      console.log("User deleted successfully")
      toast.success(`User "${user?.name}" has been removed`)
      setIsDeleting(false)
      onOpenChange(false)
      onSuccess?.()
    }, 1000)
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* 1. Gradient Border Wrapper to match Login/Add forms */}
      <DialogContent className="border-chart bg-gradient-primary rounded-2xl border-2 p-0.5!" showCloseButton={false}>
        <div className="rounded-[14px] bg-background p-6">
          {/* 2. Visual Warning Icon */}
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>

          <DialogHeader className="items-center text-center">
            <DialogTitle>
              <Typography variant="Bold_H4" className="text-white">
                Delete User?
              </Typography>
            </DialogTitle>
            <div className="mt-2">
              <Typography
                variant="Regular_H7"
                className="text-muted-foreground"
              >
                You are about to delete{" "}
                <span className="font-medium text-white">{user.name}</span>.
                This will permanently revoke their access and delete their data.
              </Typography>
            </div>
          </DialogHeader>

          {/* 3. Action Buttons - High Contrast */}
          <DialogFooter className="flex w-full items-center gap-5 bg-background ">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isDeleting}
              size="lg"
              className="w-1/2 flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              size="lg"
              className="w-1/2 flex-1"
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
