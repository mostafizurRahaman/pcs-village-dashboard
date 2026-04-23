"use client"

import * as React from "react"
import { Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"
import { DeleteUserPopup } from "./actions/delete-base"

import { IBase } from "@/types/bases"
import { EditBaseModal } from "./actions/edit-base"
import { toast } from "sonner"

interface DataTableRowActionsProps<TData> {
  row: Row<IBase>
  table: Table<IBase>
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const base = row.original as IBase

  console.log(base)
  const resetSelection = () => {
    table.resetRowSelection()
  }

  return (
    <>
      {base.isDeleteable && (
        <>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditDialogOpen(true)}
              className="h-8 w-8 rounded-[6px] text-foreground hover:bg-muted"
            >
              <Edit className="size-4.5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteDialogOpen(true)}
              className="h-8 w-8 rounded-[6px] text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="size-4.5" />
            </Button>
          </div>

          <DeleteUserPopup
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            base={base}
            onSuccess={resetSelection}
          />

          <EditBaseModal
            base={base}
            onOpenChange={() => {
              setEditDialogOpen((prev) => !prev)
            }}
            open={editDialogOpen}
            onSuccess={() => {
              toast.success("Based updated successfully!")
            }}
          />
        </>
      )}
    </>
  )
}
