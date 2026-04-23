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
import { userApi } from "@/api"
import { useQueryClient } from "@tanstack/react-query"

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
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const res = await userApi.delete(user?._id as string)
      console.log(res)

      if (res.success) {
        toast.success(res.message)
        if (onSuccess) {
          onSuccess()
        }
        onOpenChange(!open)

        queryClient.invalidateQueries({ queryKey: ["users"] })
      } else {
        toast.error(res.message)
      }
      setIsDeleting(false)
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user!")
      setIsDeleting(false)
    } finally {
      setIsDeleting(false)
    }
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm rounded-xl border-border bg-card p-6"
        showCloseButton={false}
      >
        {/* Warning icon */}
        <div className="mb-5 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4 ring-4 ring-destructive/5">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>

        <DialogHeader className="items-center gap-2 text-center">
          <DialogTitle asChild>
            <Typography variant="Bold_H4" className="text-foreground">
              Delete User?
            </Typography>
          </DialogTitle>
          <Typography
            variant="Regular_H7"
            className="leading-relaxed text-muted-foreground"
          >
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
