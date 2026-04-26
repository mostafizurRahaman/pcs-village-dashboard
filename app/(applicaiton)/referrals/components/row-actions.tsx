"use client"
import * as React from "react"
import { Row, Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { ApproveRequestModal } from "./actions/approval-modal"
import { IBaseRequest } from "@/types/base-request"
import { Typography } from "@/components/typography"
import { RejectRequestModal } from "./actions/rejection-modal"

export function DataTableRowActions<TData>({
  row,
  table,
}: {
  row: Row<TData>
  table: Table<TData>
}) {
  const [approveOpen, setApproveOpen] = React.useState(false)
  const [rejectOpen, setRejectOpen] = React.useState(false)
  const request = row.original as IBaseRequest

  if (request.status !== "PENDING") {
    return (
      <Typography
        variant="Regular_H7"
        className="px-2 text-muted-foreground italic"
      >
        Processed
      </Typography>
    )
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setApproveOpen(true)}
          className="h-8 w-8 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600"
        >
          <Check className="h-4.5 w-4.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setRejectOpen(true)}
          className="h-8 w-8 text-red-500 hover:bg-red-500/10 hover:text-red-600"
        >
          <X className="h-4.5 w-4.5" />
        </Button>
      </div>
      <ApproveRequestModal
        open={approveOpen}
        onOpenChange={setApproveOpen}
        request={request}
        onSuccess={() => table.resetRowSelection()}
      />
      <RejectRequestModal
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        request={request}
        onSuccess={() => table.resetRowSelection()}
      />
    </>
  )
}
