import axiosInstance from "@/lib/axios"
import { IAddSubscriptionPlanPayload, ISubscriptionPlan } from "@/types/subscription-plan"



export const subscriptionPlanApi = {
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
   

    const response = await axiosInstance.get("/sub-plan", {
      params
    })
    return response.data // Expected { success, message, data, meta }
  },

  addPlan: async(payload: IAddSubscriptionPlanPayload) => { 

const response = await axiosInstance.post("/sub-plan", payload)
    return response.data // Expected { success, message, data, meta }

  } 

}
