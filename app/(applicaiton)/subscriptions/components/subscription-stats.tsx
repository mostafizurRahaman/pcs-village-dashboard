"use client"
import { Typography } from "@/components/typography"
import { Card } from "@/components/ui/card"

export function SubscriptionStats() {
  const stats = [
    { label: "Total Subscriptions", value: "1,240", color: "text-foreground" },
    { label: "Active Revenue", value: "$12,400", color: "text-emerald-500" },
    { label: "Expired Plans", value: "84", color: "text-red-500" },
  ]

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="flex flex-col gap-1 border-border bg-card p-6 shadow-sm"
        >
          <Typography
            variant="Regular_H7"
            className="tracking-wide text-muted-foreground uppercase"
          >
            {stat.label}
          </Typography>
          <Typography variant="Bold_H2" className={stat.color}>
            {stat.value}
          </Typography>
        </Card>
      ))}
    </div>
  )
}
