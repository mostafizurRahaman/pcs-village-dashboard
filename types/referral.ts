export interface IReferral {
  [key: string]: string | undefined | null
  id: string
  invitedByName: string
  invitedByEmail: string
  invitedContact: string // Email or Phone
  status: "Joined" | "Pending"
  joinDate: string // "-" for pending
}
