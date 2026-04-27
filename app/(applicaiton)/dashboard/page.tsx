"use client"

import { useEffect, useState, useCallback } from "react"
import { ContentLayout } from "@/components/navigation/content-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Typography } from "@/components/typography"
import {
  Users,
  UserCheck,
  FileText,
  MessageSquare,
  MessagesSquare,
  Layers,
  RefreshCw,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"
import { userApi } from "@/api"
import type {
  DashboardCards,
  UserGrowthItem,
  DailyActiveItem,
  WeekType,
} from "@/api/user.api"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Skeleton ───────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <Card className="shadow-sm border-border">
      <CardContent className="p-6 flex flex-col gap-8">
        <div className="w-12 h-12 rounded-lg bg-muted animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="h-7 w-24 rounded bg-muted animate-pulse" />
          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}

function SkeletonChart() {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="px-6 py-6 pb-2">
        <div className="h-5 w-36 rounded bg-muted animate-pulse" />
      </CardHeader>
      <CardContent className="p-6 pt-0 h-[320px] flex items-end gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded bg-muted animate-pulse"
            style={{ height: `${20 + Math.random() * 60}%` }}
          />
        ))}
      </CardContent>
    </Card>
  )
}

// ─── Stat Card Config ────────────────────────────────────────────────────────

interface StatCardDef {
  icon: React.ElementType
  bg: string
  label: string
  key: keyof DashboardCards
}

const STAT_CONFIGS: StatCardDef[] = [
  { icon: Users,          bg: "bg-chart-1",    label: "Total Users",         key: "totalUsers"         },
  { icon: UserCheck,      bg: "bg-success",    label: "Active Users",        key: "activeUsers"        },
  { icon: FileText,       bg: "bg-chart-3",    label: "Total Posts",         key: "totalPosts"         },
  { icon: Layers,         bg: "bg-chart-4",    label: "Total Groups",        key: "totalGroups"        },
  { icon: MessageSquare,  bg: "bg-chart-5",    label: "Messages Sent",       key: "messagesSent"       },
  { icon: MessagesSquare, bg: "bg-destructive",label: "Total Conversations", key: "totalConversations" },
]

// ─── Year helpers ────────────────────────────────────────────────────────────

const CURRENT_YEAR = new Date().getFullYear()
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i)

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [year, setYear] = useState<number>(CURRENT_YEAR)
  const [weekType, setWeekType] = useState<WeekType>("this_week")

  const [cards, setCards] = useState<DashboardCards | null>(null)
  const [userGrowth, setUserGrowth] = useState<UserGrowthItem[]>([])
  const [dailyActive, setDailyActive] = useState<DailyActiveItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await userApi.getStats({ year, weekType })
      if (res.success) {
        setCards(res.data.cards)
        setUserGrowth(res.data.userGrowth)
        setDailyActive(res.data.dailyActiveUsers)
      } else {
        setError(res.message || "Failed to load stats.")
      }
    } catch {
      setError("Unable to fetch dashboard stats. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [year, weekType])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // Chart data keys need to match API shape (count not users)
  const growthChartData = userGrowth.map((d) => ({ month: d.month, count: d.count }))
  const dailyChartData  = dailyActive.map((d)  => ({ day: d.day,   count: d.count }))

  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col gap-8 w-full">

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Typography variant="Bold_H1" className="text-foreground !text-[30px]" as="h1">
              Dashboard Overview
            </Typography>
            <Typography variant="Regular_P" className="text-muted-foreground">
              Welcome back! Here&apos;s what&apos;s happening with your platform.
            </Typography>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Year selector */}
            <Select
              value={String(year)}
              onValueChange={(v) => setYear(Number(v))}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {YEAR_OPTIONS.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Week type toggle */}
            <div className="flex rounded-md border border-border overflow-hidden text-sm">
              {(["this_week", "last_week"] as WeekType[]).map((wt) => (
                <button
                  key={wt}
                  onClick={() => setWeekType(wt)}
                  className={`px-3 py-1.5 transition-colors ${
                    weekType === wt
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {wt === "this_week" ? "This Week" : "Last Week"}
                </button>
              ))}
            </div>

            {/* Refresh */}
            <Button
              variant="outline"
              size="icon"
              onClick={fetchStats}
              disabled={loading}
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* ── Error banner ──────────────────────────────────────────── */}
        {error && (
          <div className="rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* ── Stats Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : STAT_CONFIGS.map(({ icon: Icon, bg, label, key }) => (
                <Card key={label} className="shadow-sm border-border">
                  <CardContent className="p-6 flex flex-col gap-8">
                    <div className={`${bg} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Typography variant="Bold_H3" className="text-foreground !text-[24px]">
                        {cards ? cards[key].toLocaleString() : "—"}
                      </Typography>
                      <Typography variant="Regular_H5" className="text-muted-foreground !text-[14px]">
                        {label}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* ── Charts Row ────────────────────────────────────────────── */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonChart />
            <SkeletonChart />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth – Area Chart */}
            <Card className="shadow-sm border-border">
              <CardHeader className="px-6 py-6 pb-2">
                <Typography variant="SemiBold_H4" className="text-foreground !text-[18px]">
                  User Growth ({year})
                </Typography>
              </CardHeader>
              <CardContent className="p-6 pt-0 h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthChartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="count"
                      name="Users"
                      stroke="var(--color-primary)"
                      fill="var(--color-primary)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Active Users – Bar Chart */}
            <Card className="shadow-sm border-border">
              <CardHeader className="px-6 py-6 pb-2">
                <Typography variant="SemiBold_H4" className="text-foreground !text-[18px]">
                  Daily Active Users ({weekType === "this_week" ? "This Week" : "Last Week"})
                </Typography>
              </CardHeader>
              <CardContent className="p-6 pt-0 h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyChartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <Tooltip cursor={{ fill: "transparent" }} />
                    <Bar
                      dataKey="count"
                      name="Active Users"
                      fill="var(--color-success)"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ContentLayout>
  )
}
