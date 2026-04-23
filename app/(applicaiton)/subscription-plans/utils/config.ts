
import { ISubscriptionPlan } from "@/types/subscription-plan"
import { useMemo, useCallback } from "react"

export function useExportConfig() {
  const columnMapping = useMemo(
    () => ({
      _id: "Plan ID",
      name: "Plan Name",
      description: "Description",
      price: 'Price',
      currency: 'Currency',
      interval: "Plan Interval",
      stripePriceId: "Price ID", 
      isActive : "Status",
      createdAt: "Created Date",
    }),
    []
  )

  const headers = useMemo(
    () => Object.keys(columnMapping) as string[],
    [columnMapping]
  )

  const transformFunction = useCallback((data: ISubscriptionPlan) => {
    return {
      _id: data._id,
      name: data.name,
      description: data.description,
      price: data.price,
      currency: data.currency,
      interval: data.interval,
      stripePriceId: data.stripePriceId,
      isActive: data.isActive,
      createdAt: data.createdAt,
    }
  }, [])

  return {
    columnMapping,
    headers,
    entityName: "subscription-plans",
    transformFunction,
    columnWidths: [
      { wch: 15 }, // id
      { wch: 25 }, // name
      { wch: 25 }, // description
      {  wch: 20}, // price
      {  wch: 20}, // currency
      {  wch: 20}, // interval
      {  wch: 20}, // price id
      {  wch: 20}, // active 
      { wch: 20 }, // createdAt
    ],
  }
}