import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { toast } from "sonner"

// Create the axios instance
const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "http://16.171.204.102:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Crucial for your backend to receive/send cookies
})

// Helper to handle log out on auth failure
const handleAuthError = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken")
    window.location.href = "/login"
  }
}

// 1. Request Interceptor: Attach the Token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 2. Response Interceptor: Handle Token Refreshing
let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // If error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return axiosInstance(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Call your backend refresh-token endpoint
        // Note: Your backend expects refreshToken either in cookies or body
        const res = await axios.post(
          `${axiosInstance.defaults.baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        )

        const { accessToken } = res.data.data
        localStorage.setItem("accessToken", accessToken)

        // Update current instance and original request
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${accessToken}`
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }

        processQueue(null, accessToken)
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        handleAuthError()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Handle other errors (optional: show toast)
    const message =
      (error.response?.data as any)?.message || "Something went wrong"
    if (error.response?.status !== 401) {
      // toast.error(message);
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
