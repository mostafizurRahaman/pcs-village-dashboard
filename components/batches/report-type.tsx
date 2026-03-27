import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"

export const ReportTypeBadge: FC<{ type: string }> = ({ type }) => {
  return (
    <Badge
      variant="outline"
      className="rounded-full border-slate-200 bg-slate-50 px-3 py-0.5 text-slate-500"
    >
      <Typography variant="Medium_H7" className="text-[11px] uppercase">
        {type}
      </Typography>
    </Badge>
  )
}
