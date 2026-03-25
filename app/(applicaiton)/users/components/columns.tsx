"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Checkbox } from "@/components/ui/checkbox"
import { Typography } from "@/components/typography"

import { DataTableRowActions } from "./row-actions"
import { User } from "@/types/user"
import { CheckCircle2, XCircle } from "lucide-react"

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<User>[] => {
  const baseColumns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="USER ID" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-foreground">
          {row.getValue("id")}
        </Typography>
      ),
      size: 100,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="NAME" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shrink-0">
            <Typography variant="Regular_H6" className="text-success-foreground">
              {row.original.initial}
            </Typography>
          </div>
          <Typography variant="Medium_H6" className="text-foreground">
            {row.getValue("name")}
          </Typography>
        </div>
      ),
      size: 200,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="EMAIL" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-muted-foreground">
          {row.getValue("email")}
        </Typography>
      ),
      size: 220,
    },
    {
      accessorKey: "branch",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="BRANCH" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-foreground">
          {row.getValue("branch")}
        </Typography>
      ),
      size: 130,
    },
    {
      accessorKey: "dutyStation",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DUTY STATION" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-foreground">
          {row.getValue("dutyStation")}
        </Typography>
      ),
      size: 200,
    },
    {
      accessorKey: "pcsTimeline",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PCS TIMELINE" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-foreground">
          {row.getValue("pcsTimeline")}
        </Typography>
      ),
      size: 130,
    },
    {
      accessorKey: "verified",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="VERIFIED" />
      ),
      cell: ({ row }) => {
        const isVerified = row.getValue("verified") as boolean;
        if (isVerified) {
          return (
            <div className="bg-success rounded-full inline-flex items-center px-2.5 py-1 gap-1.5 h-[22px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-success-foreground" />
              <Typography variant="Regular_H7" className="text-success-foreground leading-none !text-[12px]">Verified</Typography>
            </div>
          )
        }
        return (
          <div className="border border-border rounded-full inline-flex items-center px-2.5 py-1 gap-1.5 h-[22px]">
            <XCircle className="w-3.5 h-3.5 text-foreground" />
            <Typography variant="Regular_H7" className="text-foreground leading-none !text-[12px]">Not Verified</Typography>
          </div>
        )
      },
      size: 150,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="STATUS" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        if (status === "Active") {
          return (
            <div className="bg-success rounded-full inline-flex items-center px-2.5 py-1 h-[22px]">
              <Typography variant="Regular_H7" className="text-success-foreground leading-none !text-[12px]">Active</Typography>
            </div>
          )
        }
        return (
          <div className="bg-destructive rounded-full inline-flex items-center px-2.5 py-1 h-[22px]">
            <Typography variant="Regular_H7" className="text-destructive-foreground leading-none !text-[12px]">Suspended</Typography>
          </div>
        )
      },
      size: 130,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ACTIONS" />
      ),
      cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
      size: 200,
    },
  ]

  // Only include selection column if row selection is enabled
  if (handleRowDeselection !== null) {
    return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5 cursor-pointer border-border"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              if (!value && handleRowDeselection) {
                handleRowDeselection(row.id)
              }
            }}
            aria-label="Select row"
            className="translate-y-0.5 cursor-pointer border-border"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50,
      },
      ...baseColumns,
    ]
  }

  return baseColumns
}
