import { FC, ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"

interface BaseBadgeProps {
  label: string
  className?: string
  containerClassName?: string
  icon?: ReactNode
}

export const BaseBadge: FC<BaseBadgeProps> = ({
  label,
  className,
  containerClassName,
  icon,
}) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        // Added w-24 and text-center for the fixed-width requirement
        "inline-flex w-24 items-center justify-center gap-1.5 rounded-full border py-1 text-center text-xs font-medium capitalize transition-colors",
        containerClassName,
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <Typography variant="Medium_H7" className="truncate leading-none">
        {label.replace(/_/g, " ")}
      </Typography>
    </Badge>
  )
}

const dutyStationConfig: Record<string, string> = {
  OFFICE: "border-blue-500/50 bg-blue-50 text-blue-600",
  FIELD: "border-teal-900 bg-cyan-950 text-cyan-200",
  REMOTE: "border-emerald-500/50 bg-emerald-50 text-emerald-600",
  BASE: "border-rose-400/50 bg-rose-50 text-rose-600",
}

export const DutyStationBadge: FC<{ type: string }> = ({ type }) => {
  const style = dutyStationConfig[type.toUpperCase()] || "border-muted bg-muted"
  return <BaseBadge label={type} containerClassName={style} />
}
