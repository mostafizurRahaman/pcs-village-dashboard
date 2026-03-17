import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"

export type IRole = "Premium" | "Free" | "Admin" | "Manager" | "User"

const roleConfig: Record<
  IRole,
  {
    bgClass: string
    text: string
  }
> = {
  Premium: {
    bgClass: "border-teal-500/50 text-teal-400 bg-teal-500/10",
    text: "Premium",
  },
  Free: {
    bgClass: "border-gray-600 text-gray-400 bg-gray-800",
    text: "Free",
  },
  Admin: {
    bgClass: "border-purple-500/50 text-purple-400 bg-purple-500/10",
    text: "Admin",
  },
  Manager: {
    bgClass: "border-blue-500/50 text-blue-400 bg-blue-500/10",
    text: "Manager",
  },
  User: {
    bgClass: "border-gray-600 text-gray-400 bg-gray-800",
    text: "User",
  },
}

export const RoleChips: FC<{ role: string }> = ({ role }) => {
  // Fallback to 'User' config if the role string doesn't match exactly
  const config = roleConfig[role as IRole] || roleConfig["User"]

  return (
    <Badge
      variant="outline"
      className={`inline-flex w-fit min-w-24 items-center justify-center rounded-full border px-4 py-1 font-medium ${config.bgClass}`}
    >
      <Typography variant="Medium_H7">{config.text}</Typography>
    </Badge>
  )
}
