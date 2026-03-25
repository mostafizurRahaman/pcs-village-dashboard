"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Typography } from "@/components/typography"
import { IReferral } from "@/types/referral"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export const getColumns = (): ColumnDef<IReferral>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REFERRAL ID" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="text-foreground uppercase">
        {row.getValue("id")}
      </Typography>
    ),
    size: 120,
  },
  {
    accessorKey: "invitedByName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REFERRED BY" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("invitedByName") as string
      const email = row.original.invitedByEmail
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary uppercase">
              {name.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Typography
              variant="Medium_H6"
              className="line-clamp-1 text-foreground"
            >
              {name}
            </Typography>
            <Typography
              variant="Regular_H7"
              className="line-clamp-1 text-muted-foreground"
            >
              {email}
            </Typography>
          </div>
        </div>
      )
    },
    size: 250,
  },
  {
    accessorKey: "invitedContact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="INVITED CONTACT" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="text-foreground">
        {row.getValue("invitedContact")}
      </Typography>
    ),
    size: 200,
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
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase",
            status === "Joined"
              ? "bg-emerald-500/10 text-emerald-500"
              : "border border-slate-200 bg-slate-500/10 text-slate-500"
          )}
        >
          {status}
        </div>
      )
    },
    size: 150,
  },
  {
    accessorKey: "joinDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JOIN DATE" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="text-muted-foreground">
        {row.getValue("joinDate")}
      </Typography>
    ),
    size: 150,
  },
]
