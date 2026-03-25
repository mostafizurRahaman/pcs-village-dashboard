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
import { IBranch } from "@/types/branches"

export function DeleteBranchPopup({
  open,
  onOpenChange,
  branch,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  branch: IBranch | null
  onSuccess?: () => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    setTimeout(() => {
      toast.success(`Branch "${branch?.branchName}" deleted`)
      setIsDeleting(false)
      onOpenChange(false)
      onSuccess?.()
    }, 1000)
  }

  if (!branch) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm rounded-xl p-6"
        showCloseButton={false}
      >
        <div className="mb-5 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        <DialogHeader className="items-center text-center">
          <DialogTitle>
            <Typography variant="Bold_H4">Delete Branch?</Typography>
          </DialogTitle>
          <Typography variant="Regular_H7" className="text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-bold text-foreground">
              {branch.branchName}
            </span>
            ?
          </Typography>
        </DialogHeader>
        <DialogFooter className="mt-6 flex gap-3">
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
            disabled={isDeleting}
            className="flex-1"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
