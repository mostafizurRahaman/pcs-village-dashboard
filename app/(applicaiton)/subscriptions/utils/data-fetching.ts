// app/(applicaiton)/subscriptions/utils/data-fetching.ts
"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { subscriptionApi } from "@/api/subscription.api"
import { preprocessSearch } from "@/components/data-table/utils"

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
      "subscription-history",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const response = await subscriptionApi.getHistories({
        page,
        limit: pageSize,
        searchTerm: search || undefined,
        fromDate: dateRange.from_date || undefined,
        toDate: dateRange.to_date || undefined,
        sortBy: sortBy || "createdAt",
        sortOrder: sortOrder || "desc",
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

useSubscriptionData.isQueryHook = true