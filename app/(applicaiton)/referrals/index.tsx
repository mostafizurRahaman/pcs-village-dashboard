"use client"
import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useReferralData } from "./utils/data-fetching"
import { useExportConfig } from "./utils/config"
import { IReferral } from "@/types/referral"

export default function ReferralTable() {
  const exportConfig = useExportConfig()

  return (
    <DataTable<IReferral, unknown>
      getColumns={getColumns}
      fetchDataFn={useReferralData}
      idField="id"
      exportConfig={exportConfig}
      config={{
        enableRowSelection: false,
        enableSearch: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        columnResizingTableId: "referral-table-v2",
        searchPlaceholder: "Search by name, email or contact...",
      }}
    />
  )
}
