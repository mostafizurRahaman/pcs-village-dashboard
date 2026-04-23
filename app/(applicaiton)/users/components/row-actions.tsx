"use client"

import * as React from "react"
import { Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Eye, XCircle, UserX, Trash2, CheckCircle2 } from "lucide-react"
import { User } from "@/types/user"
import { DeleteUserPopup } from "./actions/delete-user"
import { ViewUserModal } from "./actions/view-user"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false)
  const user = row.original as User

  const resetSelection = () => {
    table.resetRowSelection()
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewDialogOpen(true)}
          className="h-8 w-8 rounded-[6px] text-foreground hover:bg-muted"
        >
          <Eye className="size-4.5" />
        </Button>
        {/* <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-[6px] text-foreground hover:bg-muted"
        >
          {user.verified ? (
            <XCircle className="size-4.5" />
          ) : (
            <CheckCircle2 className="size-4.5" />
          )}
        </Button> */}
        {/* <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-[6px] text-foreground hover:bg-muted"
        >
          <UserX className="size-4.5" />
        </Button> */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDeleteDialogOpen(true)}
          className="h-8 w-8 rounded-[6px] text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="size-4.5" />
        </Button>
      </div>

      <ViewUserModal
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        user={user}
      />
      <DeleteUserPopup
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={user}
        onSuccess={resetSelection}
      />
    </>
  )
}
