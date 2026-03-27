export interface ISubscriptionPlan {
  [key: string]: string | number | undefined | null
  id: string
  planName: string
  price: number
  interval: "Monthly" | "Yearly"
  subscribers: number
  status: "Active" | "Disabled"
}
