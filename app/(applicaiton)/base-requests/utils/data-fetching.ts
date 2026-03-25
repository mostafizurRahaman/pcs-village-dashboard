"use client"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { preprocessSearch } from "@/components/data-table/utils"
import { baseRequests } from "@/data/base-request";


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
      let filteredData = [...baseRequests]

      if (search) {
        const lowerSearch = preprocessSearch(search).toLowerCase()
        filteredData = filteredData.filter(
          (r) =>
            r.baseName.toLowerCase().includes(lowerSearch) ||
            r.requesterName.toLowerCase().includes(lowerSearch)
        )
      }

      return {
        success: true,
        data: filteredData,
        pagination: {
          page: 1,
          limit: 10,
          totalPage: 1,
          totalPages: filteredData.length,
        },
      }
    },
    placeholderData: keepPreviousData,
  })
}

useBaseRequestData.isQueryHook = true
