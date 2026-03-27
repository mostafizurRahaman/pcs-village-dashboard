export interface ISubscription {
  [key: string]: string | undefined | null
  id: string
  name: string
  email: string
  subscribedAt: string
  endDate: string
  planType: "Basic" | "Pro" | "Enterprise"
  invoiceURL: string
  status: "initialized" | "pending" | "active" | "cancelled" | "expired"
}
