"use client"
import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { IReport } from "@/types/reports"
import { useReportData } from "./utils/data-fetching"


export default function ReportsTable() {
  return (
    <DataTable<IReport, unknown>
      getColumns={getColumns}
      fetchDataFn={useReportData}
      idField="_id"
      exportConfig={{
        entityName: "reports",
        columnMapping: {},
        columnWidths: [],
        headers: [],
      }}
      config={{
        enableRowSelection: false,
        enableSearch: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        columnResizingTableId: "reports-table",
        defaultSortBy: "reportedAt", 
        defaultSortOrder: 'desc'
      }}
    />
  )
}
