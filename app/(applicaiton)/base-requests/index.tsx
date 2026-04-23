"use client"
import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useBaseRequestData } from "./utils/data-fetching"
import { IBaseRequest } from "@/types/base-request"
import { useExportConfig } from "./utils/config"

export default function BaseRequestTable() {
  const exportConfig = useExportConfig()
  return (
    <DataTable<IBaseRequest, unknown>
      getColumns={getColumns}
      fetchDataFn={useBaseRequestData}
      idField="_id"
      // renderToolbarContent={() => <ToolbarOptions />}
      exportConfig={exportConfig}
      config={{
        enableRowSelection: false,
        enableSearch: true,
        enableColumnVisibility: true,
        enableUrlState: true,
        columnResizingTableId: "base-req-table",
      }}
    />
  )
}
