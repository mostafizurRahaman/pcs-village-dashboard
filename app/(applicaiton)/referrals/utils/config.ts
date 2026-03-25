import { IReferral } from "@/types/referral"
import { useMemo, useCallback } from "react"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      id: "Referral ID",
      invitedByName: "Invited By (Name)",
      invitedByEmail: "Invited By (Email)",
      invitedContact: "Invited Contact",
      status: "Status",
      joinDate: "Join Date",
    }),
    []
  )

  const headers = useMemo(
    () => Object.keys(columnMapping) as string[],
    [columnMapping]
  )

  const transformFunction = useCallback((data: IReferral) => {
    return {
      id: data.id,
      invitedByName: data.invitedByName,
      invitedByEmail: data.invitedByEmail,
      invitedContact: data.invitedContact,
      status: data.status,
      joinDate: data.joinDate,
    }
  }, [])

  return {
    columnMapping,
    headers,
    entityName: "referrals",
    transformFunction,
    columnWidths: [
      { wch: 15 }, // id
      { wch: 20 }, // invitedByName
      { wch: 25 }, // invitedByEmail
      { wch: 25 }, // invitedContact
      { wch: 15 }, // status
      { wch: 15 }, // joinDate
    ],
  }
}
