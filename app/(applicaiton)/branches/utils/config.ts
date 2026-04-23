import { IBranch } from "@/types/branches"
import { useMemo, useCallback } from "react"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      _id: "Branch ID",
      name: "Branch Name",
      slug: "Slug Name",
      createdAt: "Created Date",
      updatedAt: "updated Date",
    }),
    []
  )

  const headers = useMemo(
    () => Object.keys(columnMapping) as string[],
    [columnMapping]
  )

  const transformFunction = useCallback((data: IBranch) => {
    return {
      id: data._id,
      name: data.name,
      slug: data.slug,

      createdAt: data.createdAt,
      updatedAt: data.createdAt,
    }
  }, [])

  return {
    columnMapping,
    headers,
    entityName: "branches",
    transformFunction,
    columnWidths: [
      { wch: 15 }, // id
      { wch: 25 }, // name
      { wch: 25 }, // slug

      { wch: 20 }, // createdAt
      { wch: 20 }, // createdAt
    ],
  }
}
