export type User = {
  _id: string
  name: string
  email: string
  status: "active" | "blocked" | "pending"
  role: string
  profileImage: string
  isTwoFactorEnabled: boolean
  createdAt: string
  branchName: string
  branchId: string
  affiliation: string
  interestTags: string[]
  kidsAgeRanges: string[]
  estimatedPcsDate: string
  futureStationName: string
  futureStationId: string
  currentStationName: string
  currentStationId: string
}
