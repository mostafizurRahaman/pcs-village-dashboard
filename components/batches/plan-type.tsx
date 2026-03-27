import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"

export type PlanType = "basic" | "pro" | "enterprise"

const planTypeConfig: Record<
  PlanType,
  {
    bgClass: string
    text: string
  }
> = {
  basic: {
    bgClass:
      "border-slate-200 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    text: "Basic",
  },
  pro: {
    bgClass: "border-purple-500/50 bg-purple-500/10 text-purple-600",
    text: "Pro",
  },
  enterprise: {
    bgClass: "border-primary/50 bg-primary/10 text-primary",
    text: "Enterprise",
  },
}

export const PlanTypeBadge: FC<{ type: string; className?: string }> = ({
  type,
  className = "",
}) => {
  const key = Object.keys(planTypeConfig).find(
    (k) => k.toLowerCase() === type.toLowerCase()
  ) as PlanType | undefined

  const config = key
    ? planTypeConfig[key]
    : {
        bgClass: "border-muted text-muted-foreground bg-muted/20",
        text: type,
      }

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex h-6 w-28 items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase",
        config.bgClass,
        className
      )}
    >
      <Typography variant="Medium_H7">{config.text}</Typography>
    </Badge>
  )
}
