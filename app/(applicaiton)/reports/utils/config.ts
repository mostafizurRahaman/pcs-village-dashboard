import { IReport } from "@/types/reports"
import { ISubscription } from "@/types/subscription"
import { useMemo, useCallback } from "react"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      _id: "Report ID",  
      postId: "Post ID",
      postContent: "Post Content",
      postAttachments: "Post Attachment",      
      authorId: "Author ID",
      authorName: "Author Name",
      reporterName: "Reporter Name", 
      reporterEmail:"Reporter Email", 
      reportReason: "Reporter Reason",
      isGroup: "Is Group",
      status: "Status", 
      reportedAt: "Reported At"
    }),
    []
  )

  const headers = useMemo(
    () => Object.keys(columnMapping) as string[],
    [columnMapping]
  )

  const transformFunction = useCallback(
    (data: IReport) => ({
      _id: data._id,
      postId: data.postId,
      postContent: data.postContent,
      postAttachments: data.postAttachments,      
      authorId: data.authorId,
      authorName: data.authorName,
      reporterName: data.reporterName, 
      reporterEmail: data.reporterEmail, 
      reportReason: data.reportReason,
      isGroup: data.isGroup,
      status: data.status, 
      reportedAt: data.reportedAt
    }),
    []
  )

  return {
    columnMapping,
    headers,
    entityName: "reports",
    transformFunction,
    columnWidths: [
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 50 },
    ],
  }
}

