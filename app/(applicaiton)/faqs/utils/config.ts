import { IFAQ } from "@/types/faq.types"
import { useMemo, useCallback } from "react"

export function useExportConfig() {
  // Column label mapping (for export headers)
  const columnMapping = useMemo(
    () => ({
      _id: "Faq ID",
      question: "Question",
      answer: "Answer",
      createdAt: "Created At",
      updatedAt: "Updated At",
    }),
    []
  )

  // Keys to export (single source of truth)
  // Cast to string[] to satisfy DataTable requirements
  const headers = useMemo(
    () => Object.keys(columnMapping) as string[],
    [columnMapping]
  )

  // Transform function (memoized for performance)
  const transformFunction = useCallback((data: IFAQ) => {
    return {
      _id: data._id,
      question: data.question,
      answer: data.answer,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  }, [])

  return {
    columnMapping,
    headers,
    entityName: "faqs",
    transformFunction,

    // Fixed: match column count (6 columns)
    columnWidths: [
      { wch: 10 }, // id
      { wch: 20 }, // baseName
      { wch: 20 }, // country
      { wch: 20 }, // state
      { wch: 20 }, // city
    ],
  }
}
