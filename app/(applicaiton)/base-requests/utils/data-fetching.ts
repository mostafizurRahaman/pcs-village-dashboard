"use client"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { preprocessSearch } from "@/components/data-table/utils"
import { baseRequestApi } from "@/api"

export function useBaseRequestData(
  page: number,
  pageSize: number,
  search: string,
  dateRange: { from_date: string; to_date: string },
  sortBy: string,
  sortOrder: string
) {
  return useQuery({
    queryKey: [
      "base-requests",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const response = await baseRequestApi.getAll({
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

useBaseRequestData.isQueryHook = true
