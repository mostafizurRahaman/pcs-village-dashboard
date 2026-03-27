"use client"
import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { IReport } from "@/types/reports"
import { reports } from "@/data/reports"

export default function ReportsTable() {
  return (
    <DataTable<IReport, unknown>
      getColumns={getColumns}
      fetchDataFn={async () => ({
        success: true,
        data: reports,
        pagination: { page: 1, limit: 10, total_pages: 1, total_items: 4 },
      })}
      idField="id"
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
      }}
    />
  )
}
