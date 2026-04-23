import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"

export type UserRole = "user" | "admin" | "super_admin"

const userRoleConfig: Record<
  UserRole,
  {
    bgClass: string
    text: string
  }
> = {
  user: {
    bgClass: "border-blue-500/50 bg-blue-500/10 text-blue-600",
    text: "User",
  },
  admin: {
    bgClass: "border-indigo-600 bg-indigo-600 text-white",
    text: "Admin",
  },
  super_admin: {
    bgClass: "border-purple-700 bg-purple-700 text-white shadow-sm",
    text: "Super Admin",
  },
}

export const UserRoleBadge: FC<{ role: string; className?: string }> = ({
  role,
  className = "",
}) => {
  // Find key regardless of snake_case or case sensitivity
  const key = Object.keys(userRoleConfig).find(
    (k) => k.toLowerCase() === role.toLowerCase().replace(" ", "_")
  ) as UserRole | undefined

  const config = key
    ? userRoleConfig[key]
    : {
        bgClass: "border-muted text-muted-foreground bg-muted/20",
        text: role.replace("_", " "),
      }

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex w-24 items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold capitalize",
        config.bgClass,
        className
      )}
    >
      <Typography variant="Medium_H7">{config.text}</Typography>
    </Badge>
  )
}
