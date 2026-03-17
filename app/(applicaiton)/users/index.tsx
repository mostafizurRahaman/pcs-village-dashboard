"use client"

import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useExportConfig } from "./utils/config"

import { ToolbarOptions } from "./components/toolbar-options"

import { User } from "@/types/user"
import { users } from "@/data/users"
import { useUserData } from "./utils/data-fetching"

const fetchByIdsFn = async (ids: string[] | number[]): Promise<User[]> => {
  const stringIds = ids.map((id) => String(id))
  const newUsers = users.filter((user) =>
    stringIds.includes(user.id.toString())
  )

  return (
    newUsers?.map(
      (user) =>
        ({
          id: user.id,
          name: user.name,
          email: user.email,
          image: user?.image,
          createdAt: user.createdAt,
          role: user.role,
          status: user.status,
          lastLogin: user.lastLogin,
        }) as User
    ) || []
  )
}

export default function CategoriesTable() {
  const exportConfig = useExportConfig()

  return (
    <DataTable<User, unknown>
      getColumns={getColumns}
      exportConfig={exportConfig}
      fetchDataFn={useUserData}
      fetchByIdsFn={fetchByIdsFn}
      idField="id"
      pageSizeOptions={[2, 5, 10, 20, 50, 100]}
      renderToolbarContent={({
        selectedRows,
        totalSelectedCount,
        resetSelection,
      }) => (
        <ToolbarOptions
          selectedUsers={selectedRows.map((row) => ({
            id: String(row.id),
            name: row.name,
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
