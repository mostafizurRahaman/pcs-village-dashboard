import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"

export type IUserStatus =
  | "Active"
  | "Pending"
  | "Deleted"
  | "Support"
  | "Delete"

const userStatusConfig: Record<
  string,
  {
    bgClass: string
    text: string
  }
> = {
  Active: {
    bgClass: "border-teal-500/50 text-teal-400 bg-teal-500/10",
    text: "Active",
  },
  Pending: {
    bgClass: "border-orange-500/50 text-orange-400 bg-orange-500/10",
    text: "Pending",
  },
  Deleted: {
    bgClass: "border-red-500/50 text-red-400 bg-red-500/10",
    text: "Deleted",
  },
  // Mapping "Delete" from your previous types to the same style as Deleted
  Delete: {
    bgClass: "border-red-500/50 text-red-400 bg-red-500/10",
    text: "Deleted",
  },
  Support: {
    bgClass: "border-blue-500/50 text-blue-400 bg-blue-500/10",
    text: "Support",
  },
}

export const UserStatusChips: FC<{ status: string }> = ({ status }) => {
  // Handle case sensitivity by finding the correct key
  const key = Object.keys(userStatusConfig).find(
    (k) => k.toLowerCase() === status.toLowerCase()
  )

  const config = key
    ? userStatusConfig[key]
    : {
        bgClass: "border-gray-600 text-gray-400 bg-gray-800",
        text: status,
      }

  return (
    <Badge
      variant="outline"
      className={`inline-flex w-fit items-center justify-center rounded-full border px-4 py-1 font-medium ${config.bgClass}`}
    >
      <Typography variant="Medium_H7">{config.text}</Typography>
    </Badge>
  )
}
