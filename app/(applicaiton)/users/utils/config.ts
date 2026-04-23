import { User } from "@/types/user"
import { useMemo } from "react"
import { format } from "date-fns"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      _id: "User ID",
      name: "Name",
      email: "Email",
      status: "Status",
      branchName: "Branch",
      affiliation: "Affiliation",
      currentStationName: "Current Station",
      futureStationName: "Future Station",
      estimatedPcsDate: "PCS Date",
      createdAt: "Joined Date",
    }),
    []
  )

  const headers = useMemo(() => Object.keys(columnMapping), [columnMapping])

  const transformFunction = (data: User) => ({
    _id: data._id,
    name: data.name,
    email: data.email,
    status: data.status,
    branchName: data.branchName,
    affiliation: data.affiliation,
    currentStationName: data.currentStationName,
    futureStationName: data.futureStationName,
    estimatedPcsDate: data.estimatedPcsDate
      ? format(new Date(data.estimatedPcsDate), "yyyy-MM-dd")
      : "N/A",
    createdAt: format(new Date(data.createdAt), "yyyy-MM-dd"),
  })

  return {
    columnMapping,
    headers,
    entityName: "users",
    transformFunction,
    columnWidths: Array(10).fill({ wch: 20 }),
  }
}
