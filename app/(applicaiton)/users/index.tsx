"use client"

import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useExportConfig } from "./utils/config"
import { ToolbarOptions } from "./components/toolbar-options"
import { User } from "@/types/user"
import { useUserData } from "./utils/data-fetching"
import { userApi } from "@/api"

export default function UsersTable() {
  const exportConfig = useExportConfig()

  const fetchByIdsFn = async (ids: string[] | number[]): Promise<User[]> => {
    try {
      return await userApi.getByIds(ids.map(String))
    } catch (error) {
      return []
    }
  }

  return (
    <DataTable<User, unknown>
      getColumns={getColumns}
      exportConfig={exportConfig}
      fetchDataFn={useUserData}
      fetchByIdsFn={fetchByIdsFn}
      idField="_id" // 🔥 CRITICAL FIX
      pageSizeOptions={[10, 20, 50, 100]}
      renderToolbarContent={({
        selectedRows,
        totalSelectedCount,
        resetSelection,
      }) => (
        <></>
        // <ToolbarOptions
        //   selectedUsers={selectedRows.map((row) => ({
        //     id: row._id,
        //     name: row.name,
        //   }))}
        //   allSelectedIds={selectedRows.map((r) => r._id)}
        //   totalSelectedCount={totalSelectedCount}
        //   resetSelection={resetSelection}
        // />
      )}
      config={{
        enableRowSelection: true,
        enableSearch: true,
        enableDateFilter: true,
        enableUrlState: true,
        columnResizingTableId: "users-table-v3",
        defaultSortBy: "createdAt",
        defaultSortOrder: "desc",
      }}
    />
  )
}
