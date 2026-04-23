import axiosInstance from "@/lib/axios"
import { IBase } from "@/types/bases"

export const baseApi = {
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

    const response = await axiosInstance.get("/dutystations/all", {
      params: newParams,
    })
    return response.data // Expected { success, message, data, meta }
  },

  getById: async (id: string[]) => {
    const response = await axiosInstance.get(`/dutystations/${id}`)
    return response.data
  },

  /**
   * Get specific users for Export functionality
   */
  getByIds: async (ids: string[]) => {
    const response = await axiosInstance.get("/dutystations/batch", {
      params: { ids: ids.join(",") },
    })
    return response.data.data
  },

  /**
   * Delete a single user
   */
  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/dutystations/${id}`)
    return response.data
  },

  // /**
  //  * Bulk Delete  a single user
  //  */
  // bulkDelete: async (id: string) => {
  //   const response = await axiosInstance.delete(`/branches/${id}`)
  //   return response.data
  // },

  /**
   * Update user status (Active/Blocked) or Verification
   */
  update: async (id: string, payload: Partial<IBase>) => {
    const response = await axiosInstance.patch(`/dutystations/${id}`, payload)
    return response.data
  },

  /**
   * add user status (Active/Blocked) or Verification
   */
  add: async (payload: IBase) => {
    const response = await axiosInstance.post(`/dutystations`, payload)
    return response.data
  },
}
