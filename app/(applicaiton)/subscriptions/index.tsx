// app/(applicaiton)/subscriptions/index.tsx
"use client"
import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useSubscriptionData } from "./utils/data-fetching"
import { useExportConfig } from "./utils/config"
import { ISubscriptionHistory } from "@/types/subscription-history"

export default function SubscriptionTable() {
  const exportConfig = useExportConfig()

  return (
    <DataTable<ISubscriptionHistory, unknown>
      getColumns={getColumns}
      fetchDataFn={useSubscriptionData}
      idField="_id" // Updated to match your JSON
      exportConfig={exportConfig}
      config={{
        enableRowSelection: false,
        enableSearch: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        columnResizingTableId: "sub-history-table",
        searchPlaceholder: "Search by name, email or ID...",
        defaultSortBy: 'createdAt',
        defaultSortOrder: 'desc'
      }}
    />
  )
}