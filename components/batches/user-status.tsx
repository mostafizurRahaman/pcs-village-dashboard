import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"

export type UserStatus = "active" | "blocked" | "pending"

const userStatusConfig: Record<
  UserStatus,
  {
    bgClass: string
    text: string
  }
> = {
  active: {
    bgClass: "border-success  bg-success",
    text: "Active",
  },
  blocked: {
    bgClass: "border-destructive bg-destructive",
    text: "Blocked",
  },
  pending: {
    bgClass: "border-yellow-500 bg-yellow-500",
    text: "Pending",
  },
}

export const UserStatus: FC<{ status: string; className?: string }> = ({
  status,
  className = "",
}) => {
  // Handle case sensitivity by finding the correct key
  const key = Object.keys(userStatusConfig).find(
    (k) => k.toLowerCase() === status.toLowerCase()
  ) as UserStatus | undefined

  const config = key
    ? userStatusConfig[key]
    : {
        bgClass: "border-muted text-muted-foreground bg-muted/20",
        text: status,
      }

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex w-fit items-center justify-center text-foreground rounded-full border px-4 py-2 text-sm capitalize",
        config.bgClass,
        className
      )}
    >
      <Typography variant="Medium_H7">{config.text}</Typography>
    </Badge>
  )
}
