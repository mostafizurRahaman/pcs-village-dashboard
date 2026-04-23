import axiosInstance from "@/lib/axios"

export interface IUser {
  _id: string
  name: string
  email: string
  role: string
  profileImage?: string
}

export const authApi = {
  /**
   * Get currently authenticated admin profile
   * GET /auth/me
   */
  getMe: async (): Promise<{ success: boolean; message: string; data: IUser }> => {
    const response = await axiosInstance.get("/auth/me")
    return response.data
  },

  /**
   * Change password
   * POST /auth/changed-password
   */
  changePassword: async (payload: {
    oldPassword: string
    newPassword: string
  }): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.post("/auth/changed-password", payload)
    return response.data
  },

  /**
   * Update profile (name and/or profileImage)
   * PATCH /auth/update-profile  — sent as multipart/form-data
   */
  updateProfile: async (payload: {
    name?: string
    profileImage?: File | null
  }): Promise<{ success: boolean; message: string; data: { name: string; profileImage?: string } }> => {
    const formData = new FormData()
    if (payload.name !== undefined) {
      formData.append("name", payload.name)
    }
    if (payload.profileImage) {
      formData.append("profileImage", payload.profileImage)
    }

    const response = await axiosInstance.patch("/auth/update-profile-admin", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return response.data
  },
  /**
   * Forgot password — sends OTP to email
   * POST /auth/forgot-password
   */
  forgotPassword: async (
    email: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.post("/auth/forgot-password", { email })
    return response.data
  },

  /**
   * Verify OTP — returns a resetToken on success
   * POST /auth/verify-otp
   */
  verifyOtp: async (payload: {
    email: string
    otp: string
  }): Promise<{ success: boolean; message: string; data: { resetToken: string } }> => {
    const response = await axiosInstance.post("/auth/verify-otp", payload)
    return response.data
  },

  /**
   * Resend OTP
   * POST /auth/resend-otp
   */
  resendOtp: async (
    email: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.post("/auth/resend-otp", { email })
    return response.data
  },

  /**
   * Reset password using resetToken from query string
   * POST /auth/reset-password?resetToken=<token>
   */
  resetPassword: async (payload: {
    resetToken: string
    newPassword: string
  }): Promise<{ success: boolean; message: string; data: null }> => {
    const response = await axiosInstance.post(
      `/auth/reset-password?resetToken=${payload.resetToken}`,
      { newPassword: payload.newPassword }
    )
    return response.data
  },
}

