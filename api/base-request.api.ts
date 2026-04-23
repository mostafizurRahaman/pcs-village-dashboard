import axiosInstance from "@/lib/axios"
import { IBaseRequest } from "@/types/base-request"
import { IBase } from "@/types/bases"

export const baseRequestApi = {
  /**
   * Get all users with full filter support
   * Maps to Backend: QueryBuilder (search, filter, sort, paginate)
   */
  getAll: async (params: {
    page?: number
    limit?: number
    searchTerm?: string
    fromDate?: string
    toDate?: string
    sortBy?: string
    sortOrder?: string
  }) => {
    const { sortOrder, sortBy, ...filter } = params
    const newParams: Record<string, unknown> = { ...filter }
    if (sortBy || sortOrder) {
      if (sortBy) {
        newParams.sort = sortOrder === "asc" ? `${sortBy}` : `-${sortBy}`
      }
    } else {
      newParams.sort = `-createdAt`
    }

    const response = await axiosInstance.get("/base-request/all", {
      params: newParams,
    })
    return response.data // Expected { success, message, data, meta }
  },

  /**
   * Resolve base request
   */
  resolve: async (
    id: string,
    payload: { status: "APPROVED" | "REJECTED"; adminNote?: string }
  ) => {
    const response = await axiosInstance.patch(
      `/base-request/${id}/resolve`,
      payload
    )
    return response.data
  },
}
