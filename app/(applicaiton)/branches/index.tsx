"use client"

import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useExportConfig } from "./utils/config"
import { ToolbarOptions } from "./components/toolbar-options"
import { useBranchData } from "./utils/data-fetching"
import { IBranch } from "@/types/branches"

export default function BranchesTable() {
  const exportConfig = useExportConfig()

  return (
    <DataTable<IBranch, unknown>
      getColumns={getColumns}
      exportConfig={exportConfig}
      fetchDataFn={useBranchData}
      idField="id"
      pageSizeOptions={[10, 20, 50]}
      renderToolbarContent={({
        selectedRows,
        totalSelectedCount,
        resetSelection,
      }) => (
        <ToolbarOptions
          selectedBases={selectedRows.map((row) => ({
            id: String(row.id),
            name: row.branchName,
          }))}
          totalSelectedCount={totalSelectedCount}
          resetSelection={resetSelection}
        />
      )}
      config={{
        enableRowSelection: true,
        enableSearch: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        columnResizingTableId: "branch-table",
        defaultSortBy: "id",
        defaultSortOrder: "asc",
      }}
    />
  )
}
