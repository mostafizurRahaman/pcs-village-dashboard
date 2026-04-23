import axiosInstance from "@/lib/axios"

export const userApi = {
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
    status?: string
    role?: string
  }) => {
    const response = await axiosInstance.get("/users", { params })
    return response.data // Expected { success, message, data, meta }
  },

  /**
   * Get specific users for Export functionality
   */
  getByIds: async (ids: string[]) => {
    const response = await axiosInstance.get("/users/batch", {
      params: { ids: ids.join(",") },
    })
    return response.data.data
  },

  /**
   * Delete a single user
   */
  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/users/${id}`)
    return response.data
  },

  /**
   * Update user status (Active/Blocked) or Verification
   */
  updateStatus: async (
    id: string,
    payload: { status?: string; verified?: boolean }
  ) => {
    const response = await axiosInstance.patch(`/users/${id}`, payload)
    return response.data
  },
}
