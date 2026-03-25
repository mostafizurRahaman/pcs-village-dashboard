export type User = {
  id: string
  name: string
  email: string
  branch: string
  dutyStation: string
  pcsTimeline: string
  lastLogin: string; 
  role: string;
  createdAt: string, 
  image: string;   
  verified: boolean
  status: "Active" | "Blocked" | "Pending"
  initial?: string
}
