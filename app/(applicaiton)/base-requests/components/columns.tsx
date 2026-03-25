"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Typography } from "@/components/typography"
import { DataTableRowActions } from "./row-actions"
import { IBaseRequest } from "@/types/base-request"
import { cn } from "@/lib/utils"

export const getColumns = (): ColumnDef<IBaseRequest>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REQ ID" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="text-foreground uppercase">
        {row.getValue("id")}
      </Typography>
    ),
  },
  {
    accessorKey: "baseName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BASE NAME" />
    ),
    cell: ({ row }) => (
      <Typography variant="Medium_H6" className="text-foreground">
        {row.getValue("baseName")}
      </Typography>
    ),
  },
  {
    accessorKey: "requesterName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REQUESTER" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6">
        {row.getValue("requesterName")}
      </Typography>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATE" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="text-muted-foreground">
        {row.getValue("createdAt")}
      </Typography>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase",
            status === "Pending"
              ? "bg-amber-500/10 text-amber-500"
              : status === "Approved"
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-red-500/10 text-red-500"
          )}
        >
          {status}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTIONS" />
    ),
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
]
