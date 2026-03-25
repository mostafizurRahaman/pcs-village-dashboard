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

interface BulkDeleteBranchPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  allSelectedIds: string[]
  totalSelectedCount: number
  resetSelection: () => void
}

export function BulkDeleteBranchPopup({
  open,
  onOpenChange,
  allSelectedIds,
  totalSelectedCount,
  resetSelection,
}: BulkDeleteBranchPopupProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleBulkDelete = async () => {
    try {
      setIsLoading(true)

      const deletePromises = allSelectedIds.map(async (id) => {
        try {
          // Pointing to branch delete API
          const response = await fetch(`/api/branches/${id}`, {
            method: "DELETE",
          })
          if (!response.ok) throw new Error(`Failed to delete branch ${id}`)
          return { id, success: true }
        } catch (error) {
          console.error(`Error deleting branch ${id}:`, error)
          return { id, success: false, error }
        }
      })

      const results = await Promise.all(deletePromises)
      const successful = results.filter((r) => r.success)
      const failed = results.filter((r) => !r.success)

      if (successful.length > 0)
        toast.success(`${successful.length} branches deleted successfully`)
      if (failed.length > 0)
        toast.error(`Failed to delete ${failed.length} branches`)

      onOpenChange(false)
      resetSelection()
      router.refresh()

      // Invalidate the branch data query key
      await queryClient.invalidateQueries({ queryKey: ["branches"] })
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete branches"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm rounded-xl border-border bg-card p-6"
        showCloseButton={false}
      >
        {/* Warning icon */}
        <div className="mb-5 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4 ring-4 ring-destructive/5">
            <span className="sr-only">Warning</span>
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
        </div>

        <DialogHeader className="items-center gap-2 text-center">
          <DialogTitle asChild>
            <Typography variant="Bold_H4" className="text-foreground">
              Bulk Delete Branches
            </Typography>
          </DialogTitle>
          <Typography
            variant="Regular_H7"
            className="leading-relaxed text-muted-foreground"
          >
            Are you sure you want to permanently delete{" "}
            <span className="font-bold text-foreground">
              {totalSelectedCount}
            </span>{" "}
            selected branches? This action cannot be undone.
          </Typography>
        </DialogHeader>

        <DialogFooter className="mt-6 flex gap-3 sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="flex-1 border-border"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={isLoading}
            className="flex-1"
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
      </DialogContent>
    </Dialog>
  )
}
