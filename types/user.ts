export type User = {
  id: string
  name: string
  email: string
  branch: string
  dutyStation: string
  pcsTimeline: string
  verified: boolean
  status: "Active" | "Suspended"
  initial?: string
}
