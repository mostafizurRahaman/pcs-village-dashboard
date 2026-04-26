"use client"
import * as React from "react"
import { Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash2, Ban, CheckCircle } from "lucide-react"
import { ApprovReportModal, BlockUserModal } from "./actions/approval-modal"
import { IReport } from "@/types/reports"
import { RejectionModal } from "./actions/rejection-modal"

export function DataTableRowActions<TData>({
  row,
  table,
}: {
  row: Row<TData>
  table: Table<TData>
}) {
  const [resolveOpen, setResolveOpen] = React.useState(false)
  const [blockOpen, setBlockOpen] = React.useState(false)
  const report = row.original as IReport

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setResolveOpen(true)}
          className="h-8 w-8 text-green-500 hover:text-green-300"
        >
          <CheckCircle className="size-4.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setBlockOpen(true)}
          className="h-8 w-8 text-red-500 hover:bg-red-50"
        >
          <Ban className="size-4.5" />
        </Button>
      </div>
      <ApprovReportModal
        open={resolveOpen}
        onOpenChange={setResolveOpen}
        report={report}
        onSuccess={() => table.resetRowSelection()}
      />
      <RejectionModal
        open={blockOpen}
        onOpenChange={setBlockOpen}
        report={report}
        onSuccess={() => table.resetRowSelection()}
      />
    </>
  )
}
