import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"

export const PlanStatusBadge: FC<{ status: string }> = ({ status }) => {
  const isActive = status.toLowerCase() === "active"
  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-flex rounded-full px-3 py-0.5 text-[11px] font-bold uppercase",
        isActive
          ? "border-none bg-emerald-500 text-white"
          : "border-slate-200 bg-slate-100 text-slate-500"
      )}
    >
      <Typography variant="Medium_H7">{status}</Typography>
    </Badge>
  )
}
