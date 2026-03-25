"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { BulkDeletePopup } from "./actions/bulk-delete"

import { cn } from "@/lib/utils"

interface ToolbarOptionsProps {
  selectedUsers: { id: string; name: string }[]
  allSelectedIds?: string[]
  totalSelectedCount: number
  resetSelection: () => void
}

export const ToolbarOptions = ({
  selectedUsers,
  allSelectedIds = [],
  totalSelectedCount,
  resetSelection,
}: ToolbarOptionsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-2">




      {totalSelectedCount > 0 && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteDialogOpen(true)}
            className={cn(
              "border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            )}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <Typography variant="Medium_H7">
              Delete ({totalSelectedCount})
            </Typography>
          </Button>

          <BulkDeletePopup
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            selectedUsers={selectedUsers}
            allSelectedIds={allSelectedIds}
            totalSelectedCount={totalSelectedCount}
            resetSelection={resetSelection}
          />
        </>
      )}
    </div>
  )
}
