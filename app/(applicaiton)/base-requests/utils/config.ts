
import { IBaseRequest } from "@/types/base-request"
import { useMemo, useCallback } from "react"

export function useExportConfig() {
  // Column label mapping (for export headers)
  const columnMapping = useMemo(
    () => ({
      _id: "Base ID",
      name: "Base Name",
      email: "Requested By",
      country: "Country",
      state: "State",
      city: "City",
      type: "Base Type",
      createdAt: "Created At",
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
  const transformFunction = useCallback((data: IBaseRequest) => {
    return {
      _id: data._id,
      name: data.name,
      email: data.email,
      country: data.country,
      state: data.state,
      city: data.city,
      type: data.type,
      createdAt: data.createdAt,
    }
  }, [])

  return {
    columnMapping,
    headers,
    entityName: "base-request",
    transformFunction,

    // Fixed: match column count (6 columns)
    columnWidths: [
      { wch: 10 }, // id
      { wch: 20 }, // name
      { wch: 20 }, // email
      { wch: 20 }, // country
      { wch: 20 }, // state
      { wch: 20 }, // city
      { wch: 20 }, // type
      { wch: 20 }, // createdAt
    ],
  }
}
