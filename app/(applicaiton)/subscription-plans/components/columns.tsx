"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Typography } from "@/components/typography"
import { ISubscriptionPlan } from "@/types/subscription-plan"
import { PlanStatusBadge } from "@/components/batches/plan-status"
import { DataTableRowActions } from "./row-actions"

export const getColumns = (): ColumnDef<ISubscriptionPlan>[] => [
  {
    accessorKey: "planName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PLAN NAME" />
    ),
    cell: ({ row }) => (
      <Typography variant="Medium_H6" className="text-foreground">
        {row.getValue("planName")}
      </Typography>
    ),
    size: 250,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PRICE" />
    ),
    cell: ({ row }) => (
      <Typography variant="Bold_H6" className="text-success">
        ${row.getValue("price")}
      </Typography>
    ),
  },
  {
    accessorKey: "interval",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="INTERVAL" />
    ),
  },
  {
    accessorKey: "subscribers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SUBSCRIBERS" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => <PlanStatusBadge status={row.getValue("status")} />,
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
]
