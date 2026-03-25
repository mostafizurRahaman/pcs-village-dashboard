"use client"

import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { preprocessSearch } from "@/components/data-table/utils"
import { IBranch } from "@/types/branches";

// Mock Data matching your screenshot
const branches: IBranch[] = [
  {
    id: "BR001",
    branchName: "Army",
    createdAt: "2025-01-10",
    status: "Active",
  },
  {
    id: "BR002",
    branchName: "Navy",
    createdAt: "2025-01-10",
    status: "Active",
  },
  {
    id: "BR003",
    branchName: "Air Force",
    createdAt: "2025-01-10",
    status: "Active",
  },
  {
    id: "BR004",
    branchName: "Marine Corps",
    createdAt: "2025-01-10",
    status: "Active",
  },
  {
    id: "BR005",
    branchName: "Coast Guard",
    createdAt: "2025-01-10",
    status: "Active",
  },
  {
    id: "BR006",
    branchName: "Space Force",
    createdAt: "2025-01-15",
    status: "Active",
  },
]

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
      let filteredData = [...branches]

      if (search) {
        const lowerSearch = preprocessSearch(search).toLowerCase()
        filteredData = filteredData.filter(
          (b) =>
            b.branchName.toLowerCase().includes(lowerSearch) ||
            b.id.toLowerCase().includes(lowerSearch)
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

useBranchData.isQueryHook = true
