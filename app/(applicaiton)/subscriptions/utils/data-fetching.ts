"use client"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { preprocessSearch } from "@/components/data-table/utils"
import { subscriptions } from "@/data/subscription"

export function useSubscriptionData(
  page: number,
  pageSize: number,
  search: string,
  dateRange: { from_date: string; to_date: string },
  sortBy: string,
  sortOrder: string
) {
  return useQuery({
    queryKey: [
      "subscriptions",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      let filteredData = [...subscriptions]

      if (search) {
        const lowerSearch = preprocessSearch(search).toLowerCase()
        filteredData = filteredData.filter(
          (s) =>
            s.name.toLowerCase().includes(lowerSearch) ||
            s.email.toLowerCase().includes(lowerSearch) ||
            s.id.toLowerCase().includes(lowerSearch)
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

useSubscriptionData.isQueryHook = true
