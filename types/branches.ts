export interface IBranch {
  [key: string]: string | null | undefined
  id: string
  branchName: string
  createdAt: string
  status: "Active" | "Inactive"
}
