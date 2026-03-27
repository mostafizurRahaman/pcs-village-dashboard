import { ISubscriptionPlan } from "@/types/subscription-plan"

export const subscriptionPlans: ISubscriptionPlan[] = [
  {
    id: "PLN-01",
    planName: "Basic Plan",
    price: 9.99,
    interval: "Monthly",
    subscribers: 200,
    status: "Active",
  },
  {
    id: "PLN-02",
    planName: "Premium Plan",
    price: 19.99,
    interval: "Monthly",
    subscribers: 140,
    status: "Active",
  },
  {
    id: "PLN-03",
    planName: "Family Plan",
    price: 29.99,
    interval: "Monthly",
    subscribers: 0,
    status: "Disabled",
  },
]
