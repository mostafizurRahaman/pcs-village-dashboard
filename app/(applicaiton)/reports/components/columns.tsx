"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/column-header"
import { Typography } from "@/components/typography"
import { IReport } from "@/types/reports"
import { ReportTypeBadge } from "@/components/batches/report-type"
import { DataTableRowActions } from "./row-actions"
import Image from "next/image"
import { BinaryBadge } from "@/components/batches/binary-badge"
import { RequestStatusBadge } from "@/components/batches/base-request-status"
import { formatDate } from "@/components/data-table/utils"
import { AttachmentModal } from "./actions/view-attachment"

export const getColumns = (): ColumnDef<IReport>[] => [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="REPORT ID" />
    ),
    cell: ({ row }) => (
      <Typography variant="Regular_H6" className="uppercase">
        {row.getValue("_id")}
      </Typography>
    ),
  },
  {
    accessorKey: "postId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Post ID" />
    ),
    cell: ({ row }) =>  <Typography variant="Regular_H6" className="lowercase">
          {row.getValue("postId")}
        </Typography>
  },
  {
    accessorKey: "postContent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Post Content" />
    ),
    cell: ({ row }) =>  <Typography variant="Regular_H6" className="lowercase">
          {row.getValue("postContent")}
        </Typography>
  },
  {
  accessorKey: "postAttachments",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Post Attachments" />
  ),
  cell: ({ row }) => {
    const rawValue = row.getValue("postAttachments");
    
    // Normalize data: ensure it's always an array for the modal
    let attachments = [];
    if (Array.isArray(rawValue)) {
      attachments = rawValue;
    } else if (typeof rawValue === "string" && rawValue.length > 0) {
      // Handle JSON strings if your API returns them that way
      try { attachments = JSON.parse(rawValue); } catch { attachments = []; }
    }

    return <AttachmentModal attachmentUrls={attachments} />;
  },
},

  {
    accessorKey: "authorId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author ID" />
    ),
    cell: ({ row }) =>  <Typography variant="Regular_H6" className="lowercase">
          {row.getValue("authorId")}
        </Typography>
  },

  {
    accessorKey: "authorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author Name" />
    ),
    cell: ({ row }) =>  <Typography variant="Regular_H6" className="uppercase">
          {row.getValue("authorName")}
        </Typography>
  },
  {
    accessorKey: "reporterName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reporter Name" />
    ),
    cell: ({ row }) => {
    

  return <div>
         
        <Typography variant="Regular_H6" className="uppercase">
          {row.getValue("reporterName")}
        </Typography>
        </div>
  
  } 
  },
   {
    accessorKey: "reporterEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reporter Eamil" />
    ),
    cell: ({ row }) => {
    

  return <div>
         
        <Typography variant="Regular_H6" className="lowercase">
          {row.getValue("reporterEmail")}
        </Typography>
        </div>
  
  } 
  },
  {
    accessorKey: "reportReason",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Report Reason" />
    ),
    cell: ({ row }) =>  <Typography variant="Regular_H6" className="lowercase">
          {row.getValue("reportReason")}
        </Typography>
  },
  {
    accessorKey: "isGroup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Group Post" />
    ),
    cell: ({ row }) => <BinaryBadge value={row.original.isGroup}/>
  },
  
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <RequestStatusBadge status={row.original.status}/>
  },
 
  {
    accessorKey: "reportedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reported At" />
    ),
     cell: ({ row }) => { 
      const reportedAt = row.original.reportedAt
      const dateFormat = formatDate(new Date(reportedAt))
      return  <Typography variant="Regular_H6" className="lowercase">
          {dateFormat}
        </Typography>
     }, 
     
  },
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ACTIONS" />
    ),
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
      },
]
