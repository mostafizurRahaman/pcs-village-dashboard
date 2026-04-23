

// api/subscription.api.ts
import axiosInstance from "@/lib/axios"

export const subscriptionApi = {
  getHistories: async (params: {
    page?: number
    limit?: number
    searchTerm?: string
    fromDate?: string
    toDate?: string
    sortBy?: string
    sortOrder?: string
  }) => {
    const response = await axiosInstance.get("/subscription/histories", {
      params,
    })
    return response.data // { success, message, data, meta }
  },
}