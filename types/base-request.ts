import { DutyStationType } from "./bases"

export interface IBaseRequest {
  [key: string]: string | undefined | null
  _id: string
  name: string
  email: string
  country: string
  city: string
  state: string
  type: DutyStationType
  createdAt: string
  status: "PENDING" | "APPROVED" | "REJECTED"
}
