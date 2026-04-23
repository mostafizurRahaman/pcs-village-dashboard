"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Checkbox } from "@/components/ui/checkbox"
import { Typography } from "@/components/typography"
import { DataTableRowActions } from "./row-actions"
import { User } from "@/types/user"
import { UserStatus } from "@/components/batches/user-status"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { UserRoleBadge } from "@/components/batches/user-role-status"

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<User>[] => {
  const baseColumns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="NAME" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.original.profileImage} />
            <AvatarFallback>
              {row.original.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Typography variant="Medium_H6" className="text-foreground">
              {row.getValue("name")}
            </Typography>
            <Typography variant="Regular_H7" className="text-muted-foreground">
              {row.original.email}
            </Typography>
          </div>
        </div>
      ),
      size: 250,
    },
    {
      accessorKey: "branchName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="BRANCH" />
      ),
      cell: ({ row }) => (
        <Typography variant="Regular_H6">
          {row.getValue("branchName")}
        </Typography>
      ),
      size: 150,
    },
    {
      accessorKey: "currentStationName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Current Station" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Typography variant="Regular_H6">
            {row.original.currentStationName}
          </Typography>
        </div>
      ),
      size: 250,
    },
    {
      accessorKey: "futureStationName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Future Station" />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Typography variant="Regular_H6">
            {row.original.futureStationName}
          </Typography>
        </div>
      ),
      size: 250,
    },
    {
      accessorKey: "estimatedPcsDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="PCS DATE" />
      ),
      cell: ({ row }) => {
        const date = row.getValue("estimatedPcsDate") as string
        return (
          <Typography variant="Regular_H6">
            {date ? format(new Date(date), "MMM yyyy") : "N/A"}
          </Typography>
        )
      },
      size: 130,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="STATUS" />
      ),
      cell: ({ row }) => <UserStatus status={row.getValue("status")} />,
      size: 120,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => <UserRoleBadge role={row.getValue("role")} />,
      size: 120,
    },
    {
      id: "actions",
      header: "ACTIONS",
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
      ...baseColumns,
    ]
  }
  return baseColumns
}
