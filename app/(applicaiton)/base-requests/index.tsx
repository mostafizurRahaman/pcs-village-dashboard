"use client"
import { DataTable } from "@/components/data-table/data-table"
import { getColumns } from "./components/columns"
import { useBaseRequestData } from "./utils/data-fetching"
import { IBaseRequest } from "@/types/base-request"

export default function BaseRequestTable() {
  return (
    <DataTable<IBaseRequest, unknown>
      getColumns={getColumns}
      fetchDataFn={useBaseRequestData}
      idField="id"
      // renderToolbarContent={() => <ToolbarOptions />}
      exportConfig={{
        entityName: "base-requests",
        columnMapping: {
          id: "ID",
          baseName: "Base",
          requesterName: "Requester",
          status: "Status",
        },
        columnWidths: [{ wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 10 }],
        headers: ["id", "baseName", "requesterName", "status"],
      }}
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
