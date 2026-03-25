"use client"

import { PlusIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"
import { BulkDeletePopup } from "./actions/bulk-base"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { AddBaseModal } from "./actions/add-base"
import { toast } from "sonner"

interface ToolbarOptionsProps {
  selectedBases: { id: string; name: string }[]
  allSelectedIds?: string[]
  totalSelectedCount: number
  resetSelection: () => void
}

export const ToolbarOptions = ({
  selectedBases,
  allSelectedIds = [],
  totalSelectedCount,
  resetSelection,
}: ToolbarOptionsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [addBaseDialogOpen, setAddBaseDialogOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        size="sm"
        onClick={() => setAddBaseDialogOpen((prev) => !prev)}
        // className={cn(
        //   "border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
        // )}
      >
        <PlusIcon />
        <Typography variant="Medium_H7">Add New Base</Typography>
      </Button>

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
            selectedBases={selectedBases}
            allSelectedIds={allSelectedIds}
            totalSelectedCount={totalSelectedCount}
            resetSelection={resetSelection}
          />
        </>
      )}

      {addBaseDialogOpen && (
        <AddBaseModal
          onOpenChange={setAddBaseDialogOpen}
          open={addBaseDialogOpen}
          onSuccess={() => {
            toast.success("Base Added successfully")
          }}
        />
      )}
    </div>
  )
}
