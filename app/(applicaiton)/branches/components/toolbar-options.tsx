"use client"

import * as React from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"

import { AddBranchModal } from "./actions/add-branch"
import { BulkDeleteBranchPopup } from "./actions/bulk-delete-branch"
import { IBranch } from "@/types/branches"

export const ToolbarOptions = ({
  selectedBases,
  totalSelectedCount,
  resetSelection,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {
  const [addModalOpen, setAddModalOpen] = React.useState(false)
  const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => setAddModalOpen(true)}
        className="flex items-center gap-2"
        size="sm"
      >
        <Plus className="h-4 w-4" />
        <Typography variant="Medium_H7">Add Branch</Typography>
      </Button>

      {totalSelectedCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setBulkDeleteOpen(true)}
          className="border-destructive/50 text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <Typography variant="Medium_H7">
            Delete ({totalSelectedCount})
          </Typography>
        </Button>
      )}

      <AddBranchModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSuccess={resetSelection}
      />

      <BulkDeleteBranchPopup
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        allSelectedIds={selectedBases.map((b: IBranch) => b.id)}
        totalSelectedCount={totalSelectedCount}
        resetSelection={resetSelection}
      />
    </div>
  )
}
