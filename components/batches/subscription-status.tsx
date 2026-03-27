import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"

export type SubscriptionStatus =
  | "initialized"
  | "pending"
  | "active"
  | "cancelled"
  | "expired"

const subscriptionStatusConfig: Record<
  SubscriptionStatus,
  {
    bgClass: string
    text: string
  }
> = {
  initialized: {
    bgClass: "border-blue-500/50 bg-blue-500/10 text-blue-500",
    text: "Initialized",
  },
  pending: {
    bgClass: "border-yellow-500/50 bg-yellow-500/10 text-yellow-600",
    text: "Pending",
  },
  active: {
    bgClass: "border-success bg-success text-foreground",
    text: "Active",
  },
  cancelled: {
    bgClass: "border-slate-500/50 bg-slate-500/10 text-slate-500",
    text: "Cancelled",
  },
  expired: {
    bgClass: "border-destructive bg-destructive text-foreground",
    text: "Expired",
  },
}

export const SubscriptionStatusBadge: FC<{
  status: string
  className?: string
}> = ({ status, className = "" }) => {
  const key = Object.keys(subscriptionStatusConfig).find(
    (k) => k.toLowerCase() === status.toLowerCase()
  ) as SubscriptionStatus | undefined

  const config = key
    ? subscriptionStatusConfig[key]
    : {
        bgClass: "border-muted text-muted-foreground bg-muted/20",
        text: status,
      }

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex w-24 items-center justify-center rounded-full border px-3 py-1 h-6 text-xs capitalize",
        config.bgClass,
        className
      )}
    >
      <Typography variant="Medium_H7">{config.text}</Typography>
    </Badge>
  )
}
