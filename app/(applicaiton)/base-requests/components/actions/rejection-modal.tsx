"use client"
import * as React from "react"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
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
import { toast } from "sonner"
import { IBaseRequest } from "@/types/base-request"
import { baseRequestApi } from "@/api"
import { useQueryClient } from "@tanstack/react-query"

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: IBaseRequest | null
  onSuccess: () => void
}
export function RejectRequestModal({
  open,
  onOpenChange,
  request,
  onSuccess,
}: ModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const queryClient = useQueryClient()

  const handleReject = async () => {
    setIsLoading(true)
       
           try {
             const res = await baseRequestApi.resolve(request?._id as string, {
               status: "REJECTED", 
             })
       
             if (res.success) {
               toast.success(res.message)
               onSuccess?.()
               onOpenChange(false)
    
               queryClient.invalidateQueries({ queryKey: ["base-requests"] })
             } else {
               toast.success(res.message)
             }
           } catch {
             toast.error("Failed to approved base request")
           } finally {
             setIsLoading(false)
           }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm overflow-hidden rounded-xl border-border bg-card p-0">
        <div className="h-1.5 w-full bg-red-500" />
        <div className="p-6">
          <div className="mb-4 flex justify-center">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <DialogHeader className="items-center text-center">
            <DialogTitle>
              <Typography variant="Bold_H4">Reject Request</Typography>
            </DialogTitle>
            <DialogDescription asChild>
              <Typography
                variant="Regular_H7"
                className="mt-2 text-muted-foreground"
              >
                Are you sure you want to reject the request for{" "}
                <b>{request?.baseName}</b>?
              </Typography>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Reject"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
