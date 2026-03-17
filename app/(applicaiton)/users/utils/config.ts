import { User } from "@/types/user"
import { useMemo } from "react"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      id: "User ID",
      name: "Name",
      email: "Email",
      branch: "Branch",
      dutyStation: "Duty Station",
      pcsTimeline: "PCS Timeline",
      verified: "Verified",
      status: "Status",
    }),
    []
  )

  const headers = useMemo(
    () => ["id", "name", "email", "branch", "dutyStation", "pcsTimeline", "verified", "status"],
    []
  )

  const transformFunction = (data: User) => ({
    id: data.id,
    name: data.name,
    email: data.email,
    branch: data.branch,
    dutyStation: data.dutyStation,
    pcsTimeline: data.pcsTimeline,
    verified: data.verified ? "Verified" : "Not Verified",
    status: data.status,
  })

  return {
    columnMapping,
    headers,
    entityName: "users",
    transformFunction,
    columnWidths: [
      { wch: 10 },
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ],
  }
}
