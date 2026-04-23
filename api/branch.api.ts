import axiosInstance from "@/lib/axios"

export const branchApi = {
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

    const response = await axiosInstance.get("/branches/all", {
      params: newParams,
    })
    return response.data // Expected { success, message, data, meta }
  },

  getById: async (id: string[]) => {
    const response = await axiosInstance.get(`/branches/${id}`)
    return response.data
  },

  /**
   * Get specific users for Export functionality
   */
  getByIds: async (ids: string[]) => {
    const response = await axiosInstance.get("/branches/batch", {
      params: { ids: ids.join(",") },
    })
    return response.data.data
  },

  /**
   * Delete a single user
   */
  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/branches/${id}`)
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
  update: async (id: string, payload: { name: string }) => {
    const response = await axiosInstance.patch(`/branches/${id}`, payload)
    return response.data
  },

  /**
   * add user status (Active/Blocked) or Verification
   */
  add: async (payload: { name: string }) => {
    const response = await axiosInstance.post(`/branches`, payload)
    return response.data
  },
}
