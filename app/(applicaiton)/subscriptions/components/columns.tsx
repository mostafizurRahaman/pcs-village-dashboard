// app/(applicaiton)/subscriptions/components/columns.tsx
"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Typography } from "@/components/typography"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SubscriptionStatusBadge } from "@/components/batches/subscription-status"
import { formatDate } from "@/components/data-table/utils"
import { ISubscriptionHistory } from "@/types/subscription-history"

export const getColumns = (): ColumnDef<ISubscriptionHistory>[] => [
  {
    accessorKey: "subscriberName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SUBSCRIBER" />
    ),
    cell: ({ row }) => {
      const name = row.original.subscriberName
      const email = row.original.subscriberEmail
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary uppercase">
              {name?.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Typography variant="Medium_H6" className="text-foreground">
              {name}
            </Typography>
            <Typography variant="Regular_H7" className="text-muted-foreground">
              {email}
            </Typography>
          </div>
        </div>
      )
    },
    size: 250,
  },
  {
    accessorKey: "planName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PLAN" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <Typography variant="Medium_H7">{row.getValue("planName")}</Typography>
        <Typography variant="Regular_H7" className="text-muted-foreground">
          ${row.original.planPrice} / {row.original.planInterval}
        </Typography>
      </div>
    ),
  },
  {
    accessorKey: "currentPeriodStart",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="START DATE" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H7">
        {formatDate(new Date(row.getValue("currentPeriodStart")))}
      </Typography>
    ),
  },
  {
    accessorKey: "currentPeriodEnd",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EXPIRY DATE" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H7">
        {formatDate(new Date(row.getValue("currentPeriodEnd")))}
      </Typography>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="STATUS" />
    ),
    cell: ({ row }) => (
      <SubscriptionStatusBadge status={row.getValue("status")} />
    ),
  },
  {
    accessorKey: "eventType",
    header: "EVENT",
    cell: ({ row }) => (
      <Typography variant="Medium_H7" className="text-xs uppercase text-muted-foreground">
        {row.getValue("eventType")}
      </Typography>
    ),
  },
]