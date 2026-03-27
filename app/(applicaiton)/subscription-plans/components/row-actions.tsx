"use client"

import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { EditPlanModal } from "./actions/edit-plan"

import { ISubscriptionPlan } from "@/types/subscription-plan"
import { useState } from "react"
import { DeletePlanPopup } from "./actions/delete-plan"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTableRowActions<TData>({ row, table }: any) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const plan = row.original as ISubscriptionPlan

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setEditOpen(true)}>
          <Edit className="size-4.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDeleteOpen(true)}
          className="text-destructive"
        >
          <Trash2 className="size-4.5" />
        </Button>
      </div>
      <EditPlanModal
        open={editOpen}
        onOpenChange={setEditOpen}
        plan={plan}
        onSuccess={() => table.resetRowSelection()}
      />
      <DeletePlanPopup
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        plan={plan}
        onSuccess={() => table.resetRowSelection()}
      />
    </>
  )
}
