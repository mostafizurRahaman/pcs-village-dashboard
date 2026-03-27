"use client"
import { Users, DollarSign, TrendingUp } from "lucide-react"
import { Typography } from "@/components/typography"
import { Card } from "@/components/ui/card"

export function SubscriptionStats() {
  const stats = [
    {
      label: "Active Subscribers",
      value: "340",
      icon: Users,
      color: "bg-blue-500",
      text: "text-blue-500",
    },
    {
      label: "Monthly Revenue",
      value: "$10,200",
      icon: DollarSign,
      color: "bg-emerald-500",
      text: "text-emerald-500",
    },
    {
      label: "Retention Rate",
      value: "78%",
      icon: TrendingUp,
      color: "bg-purple-500",
      text: "text-purple-500",
    },
  ]

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((item) => (
        <Card
          key={item.label}
          className="flex items-start gap-4 border-border bg-card p-6 shadow-sm"
        >
          <div className={`${item.color} rounded-lg p-3 text-white`}>
            <item.icon className="size-6" />
          </div>
          <div className="flex flex-col">
            <Typography variant="Bold_H2" className="text-foreground">
              {item.value}
            </Typography>
            <Typography variant="Regular_H7" className="text-muted-foreground">
              {item.label}
            </Typography>
          </div>
        </Card>
      ))}
    </div>
  )
}
