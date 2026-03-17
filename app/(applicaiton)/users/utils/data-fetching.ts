"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { preprocessSearch } from "@/components/data-table/utils"
import { users } from "@/data/users"

export function useUserData(
  page: number,
  pageSize: number,
  search: string,
  dateRange: { from_date: string; to_date: string },
  sortBy: string,
  sortOrder: string
) {
  return useQuery({
    queryKey: [
      "users",
      page,
      pageSize,
      preprocessSearch(search),
      dateRange,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      let filteredData = [...users];
      
      if (search) {
        const lowerSearch = preprocessSearch(search);
        filteredData = filteredData.filter(user => 
          user.name.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch) ||
          user.branch.toLowerCase().includes(lowerSearch)
        );
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
useUserData.isQueryHook = true
