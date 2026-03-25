import { IBaseRequest } from "../types/base-request"

export const baseRequests: IBaseRequest[] = [
  {
    id: "REQ-101",
    baseName: "Fort Liberty",
    requesterName: "John Doe",
    createdAt: "2025-01-10",
    status: "Pending",
  },
  {
    id: "REQ-102",
    baseName: "Camp Lejeune",
    requesterName: "Jane Smith",
    createdAt: "2025-01-12",
    status: "Pending",
  },
  {
    id: "REQ-103",
    baseName: "Ramstein Air Base",
    requesterName: "Mike Ross",
    createdAt: "2025-01-15",
    status: "Approved",
  },
  {
    id: "REQ-104",
    baseName: "Yokota Air Base",
    requesterName: "Harvey Specter",
    createdAt: "2025-01-18",
    status: "Rejected",
  },
]
