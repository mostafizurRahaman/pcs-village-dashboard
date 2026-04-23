"use client"

import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useExportConfig } from "./utils/config"

import { ToolbarOptions } from "./components/toolbar-options"
import { useBaseData } from "./utils/data-fetching"
import { IBase } from "@/types/bases"
import { branches as bases } from "@/data/branches"

const fetchByIdsFn = async (ids: string[] | number[]): Promise<IBase[]> => {
  const stringIds = ids.map((id) => String(id))
  const newBases = bases.filter((base) =>
    stringIds.includes(base._id!.toString())
  )

  return (
    newBases?.map(
      (base) =>
        ({
          _id: base._id,
          name: base.name,
          country: base.country,
          state: base.state,
          city: base.city,
          type: base.type,
          createdAt: base.createdAt,
        }) as IBase
    ) || []
  )
}

export default function BasesTable() {
  const exportConfig = useExportConfig()

  return (
    <DataTable<IBase, unknown>
      getColumns={getColumns}
      exportConfig={exportConfig}
      fetchDataFn={useBaseData}
      fetchByIdsFn={fetchByIdsFn}
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
