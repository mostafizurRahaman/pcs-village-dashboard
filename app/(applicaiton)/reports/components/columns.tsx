"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Typography } from "@/components/typography"
import { IReport } from "@/types/reports"
import { ReportTypeBadge } from "@/components/batches/report-type"
import { DataTableRowActions } from "./row-actions"

export const getColumns = (): ColumnDef<IReport>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REPORT ID" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="uppercase">
        {row.getValue("id")}
      </Typography>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TYPE" />
    ),
    cell: ({ row }) => <ReportTypeBadge type={row.getValue("type")} />,
  },
  {
    accessorKey: "content",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REPORTED CONTENT" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="line-clamp-1 max-w-[300px]">
        {row.getValue("content")}
      </Typography>
    ),
  },
  {
    accessorKey: "reportedUser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REPORTED USER" />
    ),
  },
  {
    accessorKey: "reporter",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REPORTER" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DATE" />
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
