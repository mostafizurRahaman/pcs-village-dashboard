"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Checkbox } from "@/components/ui/checkbox"
import { Typography } from "@/components/typography"
import { DataTableRowActions } from "./row-actions"
import { IBranch } from "@/types/branches"
import { cn } from "@/lib/utils"

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<IBranch>[] => {
  const branchColumns: ColumnDef<IBranch>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="BRANCH ID" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-foreground uppercase">
          {row.getValue("id")}
        </Typography>
      ),
      size: 150,
    },
    {
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="BRANCH NAME" />
      ),
      cell: ({ row }) => (
        <Typography variant="Medium_H6" className="text-foreground">
          {row.getValue("branchName")}
        </Typography>
      ),
      size: 250,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="CREATED DATE" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-muted-foreground">
          {row.getValue("createdAt")}
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
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              status === "Active"
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-red-500/10 text-red-500"
            )}
          >
            {status}
          </div>
        )
      },
      size: 150,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ACTIONS" />
      ),
      cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
      size: 150,
    },
  ]

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
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              if (!value && handleRowDeselection) handleRowDeselection(row.id)
            }}
            className="translate-y-0.5"
          />
        ),
        enableSorting: false,
        size: 50,
      },
      ...branchColumns,
    ]
  }

  return branchColumns
}
