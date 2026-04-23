export interface ISubscriptionPlan {
  [key: string]: string | number | undefined |boolean| null | string[]
  _id: string
  name: string
  features: string[]
  description?: string
  price: number
  currency: string; 
  interval: "MONTH" | "YEAR";
  isActive: boolean
  createdAt: string; 
  updatedAt: string
}




export interface  IAddSubscriptionPlanPayload  {
  name: string; 
  description?:string; 
  price: string; 
  currency: string; 
  interval: "MONTH" | "YEAR";
  features: string[]
}
 