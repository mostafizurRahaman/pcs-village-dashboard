"use client"
import { Typography } from "@/components/typography"

export const ToolbarOptions = () => {
  return (
    <div className="flex items-center gap-2">
      <Typography
        variant="Medium_H7"
        className="px-2 text-muted-foreground italic"
      >
        Review pending requests below
      </Typography>
    </div>
  )
}
