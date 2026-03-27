"use client"
import * as React from "react"
import { Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash2, Ban } from "lucide-react"
import { ResolveReportModal, BlockUserModal } from "./actions/moderation-modals"
import { IReport } from "@/types/reports"

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
          className="h-8 w-8 text-red-500 hover:bg-red-50"
        >
          <Trash2 className="size-4.5" />
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
      <ResolveReportModal
        open={resolveOpen}
        onOpenChange={setResolveOpen}
        report={report}
        onSuccess={() => table.resetRowSelection()}
      />
      <BlockUserModal
        open={blockOpen}
        onOpenChange={setBlockOpen}
        user={report.reportedUser}
        onSuccess={() => table.resetRowSelection()}
      />
    </>
  )
}
