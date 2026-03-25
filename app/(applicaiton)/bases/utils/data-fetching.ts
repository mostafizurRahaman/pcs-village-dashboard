"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { preprocessSearch } from "@/components/data-table/utils"
import { branches } from "@/data/branches"

export function useBaseData(
  page: number,
  pageSize: number,
  search: string,
  dateRange: { from_date: string; to_date: string },
  sortBy: string,
  sortOrder: string
) {
  return useQuery({
    queryKey: [
      "bases",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      let filteredData = [...branches]

      if (search) {
        const lowerSearch = preprocessSearch(search)
        filteredData = filteredData.filter(
          (base) =>
            base.baseName.toLowerCase().includes(lowerSearch) ||
            base.id.toLowerCase().includes(lowerSearch) ||
            base.country.toLowerCase().includes(lowerSearch) ||
            base.city.toLowerCase().includes(lowerSearch) ||
            base.state.toLowerCase().includes(lowerSearch)
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

// Add this property for the DataTable component
useBaseData.isQueryHook = true
