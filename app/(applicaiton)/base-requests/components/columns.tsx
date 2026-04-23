"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Typography } from "@/components/typography"
import { DataTableRowActions } from "./row-actions"
import { IBaseRequest } from "@/types/base-request"
import { cn } from "@/lib/utils"
import { DutyStationBadge } from "@/components/batches/base-type"
import { formatDate } from "@/components/data-table/utils"

export const getColumns = (): ColumnDef<IBaseRequest>[] => [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REQ ID" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="text-foreground uppercase">
        {row.getValue("_id")}
      </Typography>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BASE NAME" />
    ),
    cell: ({ row }) => (
      <Typography variant="Medium_H6" className="text-foreground">
        {row.getValue("name")}
      </Typography>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REQUESTER" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6">{row.getValue("email")}</Typography>
    ),
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6">{row.getValue("country")}</Typography>
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="state" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6">{row.getValue("state")}</Typography>
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="city" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6">{row.getValue("city")}</Typography>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Base Type" />
    ),
    cell: ({ row }) => <DutyStationBadge type={row.original.type} />,
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATE" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="text-muted-foreground">
        {row.getValue("createdAt")
          ? formatDate(new Date(row.getValue("createdAt")))
          : "-"}
      </Typography>
    ),
  },

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTIONS" />
    ),
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
]
