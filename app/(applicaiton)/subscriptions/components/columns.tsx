"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Typography } from "@/components/typography"
import { ISubscription } from "@/types/subscription"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { FileText, ExternalLink } from "lucide-react"
import { PlanTypeBadge } from "@/components/batches/plan-type"
import { SubscriptionStatusBadge } from "@/components/batches/subscription-status"

export const getColumns = (): ColumnDef<ISubscription>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SUBSCRIBER" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary uppercase">
              {name.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Typography variant="Medium_H6" className="text-foreground">
              {name}
            </Typography>
            <Typography variant="Regular_H7" className="text-muted-foreground">
              {row.original.email}
            </Typography>
          </div>
        </div>
      )
    },
    size: 250,
  },
  {
    accessorKey: "planType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PLAN" />
    ),
    cell: ({ row }) => <PlanTypeBadge type={row.getValue("planType")} />,
  },

  {
    accessorKey: "subscribedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="START DATE" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H7">
        {row.getValue("subscribedAt")}
      </Typography>
    ),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EXPIRY DATE" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H7">{row.getValue("endDate")}</Typography>
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
    accessorKey: "invoiceURL",
    header: "INVOICE",
    cell: ({ row }) => (
      <a
        href={row.original.invoiceURL}
        className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        <FileText className="size-4" />
        <span>View</span>
      </a>
    ),
  },
]
