"use client"
import { Typography } from "@/components/typography"
import { Card } from "@/components/ui/card"

export function ReportStats() {
  const stats = [
    { label: "Total Reports", value: "4", color: "text-foreground" },
    { label: "Pending", value: "4", color: "text-orange-500" },
    { label: "Resolved Today", value: "12", color: "text-emerald-500" },
  ]

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="flex flex-col gap-1 border-border bg-card p-6 shadow-sm"
        >
          <Typography
            variant="Regular_H7"
            className="tracking-wider text-muted-foreground uppercase"
          >
            {stat.label}
          </Typography>
          <Typography variant="Bold_H1" className={stat.color}>
            {stat.value}
          </Typography>
        </Card>
      ))}
    </div>
  )
}
