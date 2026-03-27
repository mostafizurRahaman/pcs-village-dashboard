/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Trash2, Ban, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import * as React from "react"

export function ResolveReportModal({
  open,
  onOpenChange,
  report,
  onSuccess,
}: any) {
  const [loading, setLoading] = React.useState(false)
  const handleResolve = () => {
    setLoading(true)
    setTimeout(() => {
      toast.success("Content removed and report resolved")
      onSuccess()
      onOpenChange(false)
      setLoading(false)
    }, 1000)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-red-100 p-4 text-red-600">
            <Trash2 />
          </div>
        </div>
        <DialogHeader>
          <DialogTitle>Remove Content?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          This will delete the reported content and close this report
          permanently.
        </DialogDescription>
        <DialogFooter className="mt-6 gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleResolve}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function BlockUserModal({ open, onOpenChange, user, onSuccess }: any) {
  const [loading, setLoading] = React.useState(false)
  const handleBlock = () => {
    setLoading(true)
    setTimeout(() => {
      toast.error(`User ${user} has been restricted`)
      onSuccess()
      onOpenChange(false)
      setLoading(false)
    }, 1000)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-orange-100 p-4 text-orange-600">
            <Ban />
          </div>
        </div>
        <DialogHeader>
          <DialogTitle>Block User?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to restrict <b>{user}</b> from accessing
          community features?
        </DialogDescription>
        <DialogFooter className="mt-6 gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleBlock}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Block User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
