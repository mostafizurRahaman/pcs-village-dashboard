"use client"

import * as React from "react"
import { Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from "lucide-react"

import { toast } from "sonner"
import { IFAQ } from "@/types/faq.types"
import { DeleteFAQPopup } from "./actions/delete-faq"
import { EditFaqModal } from "./actions/edit-faq"

// 1. Remove the <IFAQ> generic from the interface name
interface DataTableRowActionsProps {
  row: Row<IFAQ>
  table: Table<IFAQ>
}

// 2. Remove the <IFAQ> generic from the function name
export function DataTableRowActions({ row, table }: DataTableRowActionsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)

  // Now TypeScript knows exactly what this is
  const faq = row.original

  const resetSelection = () => {
    table.resetRowSelection()
  }

  return (
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

      {/*  */}
      <DeleteFAQPopup
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        faq={faq}
        onSuccess={resetSelection}
      />

      <EditFaqModal
        faq={faq}
        onOpenChange={() => {
          setEditDialogOpen((prev) => !prev)
        }}
        open={editDialogOpen}
        onSuccess={() => {
          console.log("FAQ updated successfully!")
        }}
      />
    </>
  )
}
