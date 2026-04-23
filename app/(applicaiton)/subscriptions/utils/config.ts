// app/(applicaiton)/subscriptions/utils/config.ts
import { ISubscriptionHistory } from "@/types/subscription-history"
import { useMemo, useCallback } from "react"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      _id: "History ID",
      subscriberName: "Subscriber",
      subscriberEmail: "Email",
      planName: "Plan Name",
      planPrice: "Price",
      status: "Status",
      eventType: "Event",
      currentPeriodStart: "Start Date",
      currentPeriodEnd: "End Date",
    }),
    []
  )

  const headers = useMemo(
    () => Object.keys(columnMapping) as string[],
    [columnMapping]
  )

  const transformFunction = useCallback(
    (data: ISubscriptionHistory) => ({
      ...data,
      currentPeriodStart: new Date(data.currentPeriodStart).toLocaleDateString(),
      currentPeriodEnd: new Date(data.currentPeriodEnd).toLocaleDateString(),
    }),
    []
  )

  return {
    columnMapping,
    headers,
    entityName: "subscription_history",
    transformFunction,
    columnWidths: Array(9).fill({ wch: 20 }),
  }
}