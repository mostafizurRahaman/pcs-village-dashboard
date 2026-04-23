import { create } from "zustand"
import axiosInstance from "@/lib/axios"

interface User {
  _id: string
  name: string
  email: string
  role: string
  profileImage?: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  updateUser: (partial: Partial<User>) => void
  fetchMe: () => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start as true to prevent flickering
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  updateUser: (partial) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : state.user,
    })),

  fetchMe: async () => {
    try {
      const token = localStorage.getItem("accessToken")
      if (!token) {
        set({ user: null, isAuthenticated: false, isLoading: false })
        return
      }
      const response = await axiosInstance.get("/auth/me")
      set({ user: response.data.data, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false })
      localStorage.removeItem("accessToken")
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken")
    set({ user: null, isAuthenticated: false, isLoading: false })
    window.location.href = "/login"
  },
}))
