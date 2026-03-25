import { IBranch } from "@/types/branches"
import { useMemo, useCallback } from "react"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      id: "Branch ID",
      branchName: "Branch Name",
      createdAt: "Created Date",
      status: "Status",
    }),
    []
  )

  const headers = useMemo(
    () => Object.keys(columnMapping) as string[],
    [columnMapping]
  )

  const transformFunction = useCallback((data: IBranch) => {
    return {
      id: data.id,
      branchName: data.branchName,
      createdAt: data.createdAt,
      status: data.status,
    }
  }, [])

  return {
    columnMapping,
    headers,
    entityName: "branches",
    transformFunction,
    columnWidths: [
      { wch: 15 }, // id
      { wch: 25 }, // branchName
      { wch: 20 }, // createdAt
      { wch: 15 }, // status
    ],
  }
}
