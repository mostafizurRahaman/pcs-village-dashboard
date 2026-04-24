/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Trash2, Ban, Loader2, Circle, CheckCircle } from "lucide-react"
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
import { Typography } from "@/components/typography"
import { reportApi } from "@/api/report.api"
import { renameSync } from "node:fs"
import { useQueryClient } from "@tanstack/react-query"

export function ApprovReportModal({
  open,
  onOpenChange,
  report,
  onSuccess,
}: any) {
  const [loading, setLoading] = React.useState(false)
  const queryClient = useQueryClient()

  
  const handleResolve = async () => {
   setLoading(true)
   try {
     const res = await reportApi.approveReport(report._id)
     if(res.success){ 
      toast.success(res.message) 
      setLoading(false)
      onSuccess?.()
      onOpenChange(false)
      queryClient.invalidateQueries({ queryKey: ["reports"]})
     } else { 
       toast.error(res.message) 
     }
   } catch (err: any) {
      toast.error(err.message || 'Failed to approved the report!')  
   }finally{ 
    setLoading(false)
   }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-4 text-green-600">
            <CheckCircle  size={25} />
          </div>
        </div>
        <DialogHeader>
          <DialogTitle >
            <Typography variant="Medium_H3">
              Approve Report?
            </Typography>
          </DialogTitle>
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
            variant="default"
             className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={handleResolve}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Approve"}
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
