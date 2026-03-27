"use client"
import { DataTable } from "@/components/data-table/data-table"


import { ISubscriptionPlan } from "@/types/subscription-plan"
import { getColumns } from "./components/columns"
import { subscriptionPlans } from "@/data/subscription-plans"

export default function PlanManagementTable() {
  return (
    <DataTable<ISubscriptionPlan, unknown>
      getColumns={getColumns}
      fetchDataFn={async () => ({
        success: true,
        data: subscriptionPlans,
        pagination: { page: 1, limit: 10, total_pages: 1, total_items: 3 },
      })}
      idField="id"
      exportConfig={{
        entityName: "plans",
        columnMapping: {},
        columnWidths: [],
        headers: [],
      }}
      config={{
        enableRowSelection: false,
        enableSearch: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        columnResizingTableId: "plan-management-table",
      }}
    />
  )
}
