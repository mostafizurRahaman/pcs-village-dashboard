"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2, AlertTriangle, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Typography } from "@/components/typography"

interface BulkDeletePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedUsers: { id: string; name: string }[]
  allSelectedIds: string[]
  totalSelectedCount: number
  resetSelection: () => void
}

export function BulkDeletePopup({
  open,
  onOpenChange,
  allSelectedIds,
  totalSelectedCount,
  resetSelection,
}: BulkDeletePopupProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleBulkDelete = async () => {
    try {
      setIsLoading(true)

      // Delete users one by one (or update to your bulk delete endpoint)
      const deletePromises = allSelectedIds.map(async (id) => {
        try {
          const response = await fetch(`/api/users/${id}`, {
            method: "DELETE",
          })

          if (!response.ok) {
            throw new Error(`Failed to delete user ${id}`)
          }

          return { id, success: true }
        } catch (error) {
          console.error(`Error deleting user ${id}:`, error)
          return { id, success: false, error }
        }
      })

      const results = await Promise.all(deletePromises)
      const successful = results.filter((r) => r.success)
      const failed = results.filter((r) => !r.success)

      if (successful.length > 0) {
        toast.success(`${successful.length} users deleted successfully`)
      }

      if (failed.length > 0) {
        toast.error(`Failed to delete ${failed.length} users`)
      }

      onOpenChange(false)
      resetSelection()

      // Refresh data
      router.refresh()
      await queryClient.invalidateQueries({ queryKey: ["users"] })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete users"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-chart bg-gradient-primary max-w-[420px] rounded-2xl border-2 p-0.5!"
        showCloseButton={false}
      >
        <div className="rounded-[14px] bg-background p-8">
          {/* Visual Warning Section */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-destructive/10 p-4 ring-8 ring-destructive/5">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>
          </div>

          <DialogHeader className="items-center text-center">
            <DialogTitle>
              <Typography variant="Bold_H4" className="text-white">
                Bulk Delete Users
              </Typography>
            </DialogTitle>
            <div className="mt-3">
              <Typography
                variant="Regular_H7"
                className="leading-relaxed text-muted-foreground"
              >
                Are you sure you want to permanently delete{" "}
                <span className="font-bold text-white">
                  {totalSelectedCount}
                </span>{" "}
                selected users? This action cannot be undone.
              </Typography>
            </div>
          </DialogHeader>

          <DialogFooter className="mt-10 flex flex-col gap-3 bg-background sm:flex-row sm:justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="h-12 border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white sm:flex-1"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={isLoading}
              className="h-12 bg-red-600 shadow-lg shadow-red-900/20 hover:bg-red-700 sm:flex-1"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete {totalSelectedCount}
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
