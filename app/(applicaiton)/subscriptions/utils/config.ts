import { ISubscription } from "@/types/subscription"
import { useMemo, useCallback } from "react"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      id: "ID",
      name: "Subscriber Name",
      email: "Email Address",
      subscribedAt: "Start Date",
      endDate: "End Date",
      planType: "Plan Type",
      status: "Status",
    }),
    []
  )

  const headers = useMemo(
    () => Object.keys(columnMapping) as string[],
    [columnMapping]
  )

  const transformFunction = useCallback(
    (data: ISubscription) => ({
      ...data,
    }),
    []
  )

  return {
    columnMapping,
    headers,
    entityName: "subscription_history",
    transformFunction,
    columnWidths: Array(7).fill({ wch: 20 }),
  }
}
