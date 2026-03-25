export interface IBaseRequest {
  [key: string]: string | undefined | null
  id: string
  baseName: string
  requesterName: string
  createdAt: string
  status: "Pending" | "Approved" | "Rejected"
}
