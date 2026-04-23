"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Typography } from "@/components/typography"
import { ISubscriptionPlan } from "@/types/subscription-plan"
import { PlanStatusBadge } from "@/components/batches/plan-status"
import { DataTableRowActions } from "./row-actions"
import { formatDate } from "@/components/data-table/utils"
import { BinaryBadge } from "@/components/batches/binary-badge"

export const getColumns = (): ColumnDef<ISubscriptionPlan>[] => [
   {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plan ID" />
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
      <DataTableColumnHeader column={column} title="PLAN NAME" />
    ),
    cell: ({ row }) => (
      <Typography variant="Medium_H6" className="text-foreground">
        {row.getValue("name")}
      </Typography>
    ),
    size: 250,
  },
   {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DESCRIPTION" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="text-foreground uppercase">
        {row.getValue("description")}
      </Typography>
    ),
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
    accessorKey: "currency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CURRENCY" />
    ),
    cell: ({ row }) => (
      <Typography variant="Bold_H6" className="text-success">
        {row.getValue("currency")}
      </Typography>
    ),
  },
  {
    accessorKey: "interval",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="INTERVAL" />
    ),
    cell: ({ row }) => (
      <Typography variant="Bold_H6" className="text-success">
        {row.getValue("interval")}
      </Typography>
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => <BinaryBadge value={row.getValue("isActive")} />,
  }
  ,{
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-muted-foreground">
          {row.getValue("createdAt")
            ? formatDate(new Date(row.getValue("createdAt")))
            : "-"}
        </Typography>
      ),
    },

  // {
  //   id: "actions",
  //   header: "ACTIONS",
  //   cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  // },
]
