import axiosInstance from "@/lib/axios"

export interface IUser {
  _id: string
  name: string
  email: string
  role: string
  profileImage?: string
}

export const reportApi = {
  /**
   * Get all Reports with full filter support
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
   

    const response = await axiosInstance.get("/reports", {
      params
    })
    return response.data // Expected { success, message, data, meta }
  },


  // Resolve report : 
  approveReport : async(id: string) => { 

     const newPayload : Record<string,unknown> = {
      status: "APPROVED"
    }
         
    const response = await axiosInstance.patch(`/reports/${id}`,  newPayload)
    return response.data // Expected { success, message, data, meta }

  },

  // Resolve report : 
  rejectReport : async(id: string, adminNote: string) => { 

     const newPayload : Record<string,unknown> = {
      status: "REJECTED", 
      adminNote
    }
         
    const response = await axiosInstance.patch(`/reports/${id}`,  newPayload)
    return response.data // Expected { success, message, data, meta }

  }

}

