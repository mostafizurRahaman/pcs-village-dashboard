import axiosInstance from "@/lib/axios"
import { IFAQ } from "@/types/faq.types"

export const faqApi = {
  /**
   * Get all FAQs with full filter support
   * Supports search, filter, sort, and pagination via QueryBuilder
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

    if (sortBy) {
      newParams.sort = sortOrder === "asc" ? `${sortBy}` : `-${sortBy}`
    } else {
      newParams.sort = "-createdAt"
    }

    const response = await axiosInstance.get("/faq", {
      params: newParams,
    })
    return response.data
  },

  /**
   * Get a single FAQ by ID
   */
  getById: async (id: string) => {
    const response = await axiosInstance.get(`/faq/${id}`)
    return response.data
  },

  /**
   * Create a new FAQ
   */
  add: async (payload: Pick<IFAQ, "answer" | "question">) => {
    const response = await axiosInstance.post(`/faq`, payload)
    return response.data
  },

  /**
   * Update an existing FAQ
   */
  update: async (
    id: string,
    payload: Partial<Pick<IFAQ, "answer" | "question">>
  ) => {
    const response = await axiosInstance.patch(`/faq/${id}`, payload)
    return response.data
  },

  /**
   * Delete an FAQ
   */
  delete: async (id: string) => {
    const response = await axiosInstance.delete(`/faq/${id}`)
    return response.data
  },
}
