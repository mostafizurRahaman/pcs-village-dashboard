import { IReferral } from "@/types/referral"

export const referrals: IReferral[] = [
  {
    id: "R001",
    invitedByName: "John Doe",
    invitedByEmail: "john@example.com",
    invitedContact: "friend1@example.com",
    status: "Joined",
    joinDate: "2025-03-10",
  },
  {
    id: "R002",
    invitedByName: "Jane Smith",
    invitedByEmail: "jane@example.com",
    invitedContact: "+1-555-0123",
    status: "Pending",
    joinDate: "-",
  },
  {
    id: "R003",
    invitedByName: "Mike Johnson",
    invitedByEmail: "mike@example.com",
    invitedContact: "colleague@example.com",
    status: "Joined",
    joinDate: "2025-03-12",
  },
  {
    id: "R004",
    invitedByName: "Sarah Williams",
    invitedByEmail: "sarah@example.com",
    invitedContact: "family@example.com",
    status: "Pending",
    joinDate: "-",
  },
  {
    id: "R005",
    invitedByName: "Robert Brown",
    invitedByEmail: "robert@example.com",
    invitedContact: "+1-555-0456",
    status: "Joined",
    joinDate: "2025-03-13",
  },
]
