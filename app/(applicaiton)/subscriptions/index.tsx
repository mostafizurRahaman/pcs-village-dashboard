"use client"
import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useSubscriptionData } from "./utils/data-fetching"
import { useExportConfig } from "./utils/config"
import { ISubscription } from "@/types/subscription"

export default function SubscriptionTable() {
  const exportConfig = useExportConfig()

  return (
    <DataTable<ISubscription, unknown>
      getColumns={getColumns}
      fetchDataFn={useSubscriptionData}
      idField="id"
      exportConfig={exportConfig}
      config={{
        enableRowSelection: false,
        enableSearch: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        columnResizingTableId: "sub-history-table",
        searchPlaceholder: "Search by name, email or ID...",
      }}
    />
  )
}
