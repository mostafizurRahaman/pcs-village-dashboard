"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { preprocessSearch } from "@/components/data-table/utils"
import { IBranch } from "@/types/branches"
import { branchApi } from "@/api/branch.api"
import { toDate } from "date-fns"

export function useBranchData(
  page: number,
  pageSize: number,
  search: string,
  dateRange: { from_date: string; to_date: string },
  sortBy: string,
  sortOrder: string
) {
  return useQuery({
    queryKey: [
      "branches",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const response = await branchApi.getAll({
        page,
        limit: pageSize,
        searchTerm: search || undefined,
        fromDate: dateRange.from_date || undefined,
        toDate: dateRange.to_date || undefined,
        sortBy: sortBy,
        sortOrder: sortOrder,
      })

      return {
        success: response.success,
        data: response.data,
        pagination: {
          page: response.meta.page,
          limit: response.meta.limit,
          totalPage: response.meta.totalPages,
          totalItems: response.meta.total,
        },
      }
    },
    placeholderData: keepPreviousData,
  })
}

useBranchData.isQueryHook = true
