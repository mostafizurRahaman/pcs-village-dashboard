"use client"

import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useExportConfig } from "./utils/config"

import { ToolbarOptions } from "./components/toolbar-options"
import { useFaqData } from "./utils/data-fetching"
import { IFAQ } from "@/types/faq.types"
import { branches as bases } from "@/data/branches"

export default function BasesTable() {
  const exportConfig = useExportConfig()

  return (
    <DataTable<IFAQ, unknown>
      getColumns={getColumns}
      exportConfig={exportConfig}
      fetchDataFn={useFaqData}
      // fetchByIdsFn={fetchByIdsFn}
      idField="_id"
      pageSizeOptions={[2, 5, 10, 20, 50, 100]}
      renderToolbarContent={({
        selectedRows,
        totalSelectedCount,
        resetSelection,
      }) => (
        <ToolbarOptions
          selectedBases={selectedRows.map((row) => ({
            id: String(row.id),
            // Map baseName to name and ensure it is a string
            name: String(row.baseName),
          }))}
          totalSelectedCount={totalSelectedCount}
          resetSelection={resetSelection}
        />
      )}
      config={{
        enableRowSelection: true,
        enableSearch: true,
        enableDateFilter: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        columnResizingTableId: "user-table",
        defaultSortBy: "createdAt",
        defaultSortOrder: "desc",
      }}
    />
  )
}
