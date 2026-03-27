import { IReport } from "@/types/reports"

export const reports: IReport[] = [
  {
    id: "RP001",
    type: "Post",
    content: "Inappropriate language in community post",
    reportedUser: "John Doe",
    reporter: "Jane Smith",
    createdAt: "2025-03-14",
  },
  {
    id: "RP002",
    type: "User",
    content: "Spam messages in group chat",
    reportedUser: "Mike Johnson",
    reporter: "Sarah Williams",
    createdAt: "2025-03-13",
  },
  {
    id: "RP003",
    type: "Post",
    content: "Off-topic commercial advertisement",
    reportedUser: "Robert Brown",
    reporter: "Emily Davis",
    createdAt: "2025-03-12",
  },
  {
    id: "RP004",
    type: "Spam",
    content: "Multiple duplicate posts",
    reportedUser: "David Wilson",
    reporter: "Michael Chen",
    createdAt: "2025-03-11",
  },
]
