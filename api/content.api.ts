import axiosInstance from "@/lib/axios"

export interface IContent {
  aboutUs?: string
  privacyPolicy?: string
  termsAndCondition?: string
}

export const contentApi = {
  /**
   * Get all content (aboutUs, privacyPolicy, termsAndCondition)
   */
  getContent: async (): Promise<{ success: boolean; message: string; data: IContent }> => {
    const response = await axiosInstance.get("/contents")
    return response.data // { success, message, data }
  },

  /**
   * Update content — pass only the fields you want to update
   */
  updateContent: async (
    payload: Partial<IContent>
  ): Promise<{ success: boolean; message: string; data: IContent }> => {
    const response = await axiosInstance.patch("/contents", payload)
    return response.data
  },
}
