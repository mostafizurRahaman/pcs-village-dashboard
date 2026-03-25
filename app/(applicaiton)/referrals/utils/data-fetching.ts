"use client"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { preprocessSearch } from "@/components/data-table/utils"
import { referrals } from "@/data/referral"

export function useReferralData(
  page: number,
  pageSize: number,
  search: string,
  dateRange: { from_date: string; to_date: string },
  sortBy: string,
  sortOrder: string
) {
  return useQuery({
    queryKey: [
      "referrals",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      let filteredData = [...referrals]

      if (search) {
        const lowerSearch = preprocessSearch(search).toLowerCase()
        filteredData = filteredData.filter(
          (r) =>
            r.invitedByName.toLowerCase().includes(lowerSearch) ||
            r.invitedByEmail.toLowerCase().includes(lowerSearch) ||
            r.invitedContact.toLowerCase().includes(lowerSearch) ||
            r.id.toLowerCase().includes(lowerSearch)
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

useReferralData.isQueryHook = true
