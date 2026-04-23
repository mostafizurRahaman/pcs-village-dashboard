// types/subscription-history.ts
export interface ISubscriptionHistory {
  _id: string
  subscriberId: string
  subscriberName: string
  subscriberEmail: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId: string
  status: "active" | "past_due" | "unpaid" | "cancelled" | "incomplete" | "incomplete_expired" | "trialing"
  eventType: "CREATED" | "RENEWED" | "CANCELLED" | "UPDATED"
  planId: string
  planName: string
  planSlug: string
  planPrice: number
  planInterval: "MONTH" | "YEAR"
  currentPeriodStart: string
  currentPeriodEnd: string
  updatedAt: string
  createdAt: string
  [key: string]: string |  "CREATED" | "RENEWED" | "CANCELLED" | "UPDATED" |  "active" | "past_due" | "unpaid" | "cancelled" | "incomplete" | "incomplete_expired" | "trialing" | number
}