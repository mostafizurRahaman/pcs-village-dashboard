"use client"

import * as React from "react"
import { Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash2, Edit, Power } from "lucide-react"

import { IBranch } from "@/types/branches"
import { EditBranchModal } from "./actions/edit-branch"
import { DeleteBranchPopup } from "./actions/delete-branch"
import { ToggleBranchStatusModal } from "./actions/toggle-status" // Import new modal
import { cn } from "@/lib/utils"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = React.useState(false) // State for toggle

  const branch = row.original as IBranch

  const resetSelection = () => {
    table.resetRowSelection()
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Edit Action */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setEditDialogOpen(true)}
          className="h-8 w-8 rounded-[6px] text-foreground hover:bg-muted"
        >
          <Edit className="size-4.5" />
        </Button>

        {/* Status Toggle Action */}
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setStatusDialogOpen(true)}
          className={cn(
            "h-8 w-8 rounded-[6px] transition-colors",
            branch.status === "Active"
              ? "text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Power className="size-4.5" />
        </Button> */}

        {/* Delete Action */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDeleteDialogOpen(true)}
          className="h-8 w-8 rounded-[6px] text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="size-4.5" />
        </Button>
      </div>

      {/* Modals */}
      {/* <ToggleBranchStatusModal
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        branch={branch}
        onSuccess={resetSelection}
      /> */}

      <EditBranchModal
        branch={branch}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSuccess={resetSelection}
      />

      <DeleteBranchPopup
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        branch={branch}
        onSuccess={resetSelection}
      />
    </>
  )
}
