"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Checkbox } from "@/components/ui/checkbox"
import { Typography } from "@/components/typography"
import { DataTableRowActions } from "./row-actions"

import { IBase } from "@/types/bases"

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<IBase>[] => {
  const baseColumns: ColumnDef<IBase>[] = [
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
      accessorKey: "baseName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Base Name" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Typography variant="Medium_H6" className="text-foreground">
            {row.getValue("baseName")}
          </Typography>
        </div>
      ),
      size: 200,
    },

    {
      accessorKey: "country",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Country" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-foreground">
          {row.getValue("country")}
        </Typography>
      ),
      size: 130,
    },
    {
      accessorKey: "state",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="State" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-foreground">
          {row.getValue("state")}
        </Typography>
      ),
      size: 200,
    },
    {
      accessorKey: "city",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="City" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6" className="text-foreground">
          {row.getValue("city")}
        </Typography>
      ),
      size: 130,
    },

    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="STATUS" />
    //   ),
    //   cell: ({ row }) => {
    //     const status = row.getValue("status") as string
    //     return <UserStatus status={status} className="h-6 w-25 font-medium" />
    //   },
    //   size: 130,
    // },
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
