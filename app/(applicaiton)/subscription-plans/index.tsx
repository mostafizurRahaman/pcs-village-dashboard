"use client"
import { DataTable } from "@/components/data-table/data-table"


import { ISubscriptionPlan } from "@/types/subscription-plan"
import { getColumns } from "./components/columns"
import { useExportConfig } from "./utils/config"
import { useSubscriptionPlanData } from "./utils/data-fetching"

export default function PlanManagementTable() {
  const exportConfig = useExportConfig()
  return (
    <DataTable<ISubscriptionPlan, unknown>
      getColumns={getColumns}
      fetchDataFn={useSubscriptionPlanData}
      idField="_id"
      exportConfig={exportConfig}
      config={{
        enableRowSelection: false,
        enableSearch: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        columnResizingTableId: "plan-management-table",
        defaultSortBy: 'createdAt', 
        defaultSortOrder: 'desc'
      }}
    />
  )
}
