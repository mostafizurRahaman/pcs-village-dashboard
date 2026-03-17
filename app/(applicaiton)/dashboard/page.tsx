"use client"

import { ContentLayout } from "@/components/navigation/content-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Typography } from "@/components/typography"
import { Users, UserCheck, FileText, MessageSquare, UserPlus } from "lucide-react"

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

const userGrowthData = [
  { month: "Jan", users: 4000 },
  { month: "Feb", users: 5000 },
  { month: "Mar", users: 6500 },
  { month: "Apr", users: 8000 },
  { month: "May", users: 9500 },
  { month: "Jun", users: 11000 },
  { month: "Jul", users: 13000 },
]

const dailyActiveData = [
  { day: "Mon", users: 3100 },
  { day: "Tue", users: 3800 },
  { day: "Wed", users: 4200 },
  { day: "Thu", users: 3900 },
  { day: "Fri", users: 4500 },
  { day: "Sat", users: 5200 },
  { day: "Sun", users: 4800 },
]

const recentActivities = [
  { id: 1, user: "John Doe", action: "created a new post", initial: "J", time: "5 min ago" },
  { id: 2, user: "Jane Smith", action: "joined the platform", initial: "J", time: "15 min ago" },
  { id: 3, user: "Mike Johnson", action: "created a PCS group", initial: "M", time: "1 hour ago" },
  { id: 4, user: "Sarah Williams", action: "submitted a base request", initial: "S", time: "2 hours ago" },
  { id: 5, user: "Admin", action: "approved 3 base requests", initial: "A", time: "3 hours ago" },
]

export default function HomePage() {
  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col gap-8 w-full">
        {/* Header section */}
        <div className="flex flex-col gap-1">
          <Typography variant="Bold_H1" className="text-[#1f3a5f] !text-[30px]" as="h1">
            Dashboard Overview
          </Typography>
          <Typography variant="Regular_P" className="text-[#717182]">
            Welcome back! Here's what's happening with your platform.
          </Typography>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-sm border-[rgba(0,0,0,0.1)]">
            <CardContent className="p-6 flex flex-col gap-8">
              <div className="bg-[#2b7fff] w-12 h-12 rounded-lg flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="Bold_H3" className="text-[#1f3a5f] !text-[24px]">12,543</Typography>
                <Typography variant="Regular_H5" className="text-[#717182] !text-[14px]">Total Users</Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-[rgba(0,0,0,0.1)]">
            <CardContent className="p-6 flex flex-col gap-8">
              <div className="bg-[#00c950] w-12 h-12 rounded-lg flex items-center justify-center text-white">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="Bold_H3" className="text-[#1f3a5f] !text-[24px]">8,342</Typography>
                <Typography variant="Regular_H5" className="text-[#717182] !text-[14px]">Active Users</Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-[rgba(0,0,0,0.1)]">
            <CardContent className="p-6 flex flex-col gap-8">
              <div className="bg-[#ad46ff] w-12 h-12 rounded-lg flex items-center justify-center text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="Bold_H3" className="text-[#1f3a5f] !text-[24px]">3,456</Typography>
                <Typography variant="Regular_H5" className="text-[#717182] !text-[14px]">Total Posts</Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-[rgba(0,0,0,0.1)]">
            <CardContent className="p-6 flex flex-col gap-8">
              <div className="bg-[#ff6900] w-12 h-12 rounded-lg flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="Bold_H3" className="text-[#1f3a5f] !text-[24px]">234</Typography>
                <Typography variant="Regular_H5" className="text-[#717182] !text-[14px]">Total Groups</Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-[rgba(0,0,0,0.1)]">
            <CardContent className="p-6 flex flex-col gap-8">
              <div className="bg-[#f6339a] w-12 h-12 rounded-lg flex items-center justify-center text-white">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="Bold_H3" className="text-[#1f3a5f] !text-[24px]">45,678</Typography>
                <Typography variant="Regular_H5" className="text-[#717182] !text-[14px]">Messages Sent</Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-[rgba(0,0,0,0.1)]">
            <CardContent className="p-6 flex flex-col gap-8">
              <div className="bg-[#fb2c36] w-12 h-12 rounded-lg flex items-center justify-center text-white">
                <UserPlus className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <Typography variant="Bold_H3" className="text-[#1f3a5f] !text-[24px]">1,234</Typography>
                <Typography variant="Regular_H5" className="text-[#717182] !text-[14px]">Total Referrals</Typography>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm border-[rgba(0,0,0,0.1)]">
            <CardHeader className="px-6 py-6 pb-2">
              <Typography variant="SemiBold_H4" className="text-[#1f3a5f] !text-[18px]">
                User Growth
              </Typography>
            </CardHeader>
            <CardContent className="p-6 pt-0 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#666", fontSize: 12 }}
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#666", fontSize: 12 }} 
                    ticks={[0, 3500, 7000, 10500, 14000]}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#1f3a5f" 
                    fill="#1f3a5f" 
                    fillOpacity={0.6} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-[rgba(0,0,0,0.1)]">
            <CardHeader className="px-6 py-6 pb-2">
              <Typography variant="SemiBold_H4" className="text-[#1f3a5f] !text-[18px]">
                Daily Active Users
              </Typography>
            </CardHeader>
            <CardContent className="p-6 pt-0 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyActiveData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#666", fontSize: 12 }}
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#666", fontSize: 12 }} 
                    ticks={[0, 1500, 3000, 4500, 6000]}
                  />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar dataKey="users" fill="#6b8e23" radius={[0, 0, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-sm border-[rgba(0,0,0,0.1)]">
          <CardHeader className="px-6 py-6 pb-2 border-b border-transparent">
            <Typography variant="SemiBold_H4" className="text-[#1f3a5f] !text-[18px]">
              Recent Activity
            </Typography>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex flex-col">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className={`flex items-center gap-4 px-6 py-4 ${
                    index !== recentActivities.length - 1 ? 'border-b border-[rgba(0,0,0,0.1)]' : ''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#6b8e23] shrink-0 flex items-center justify-center">
                    <Typography variant="Regular_P" className="text-white">
                      {activity.initial}
                    </Typography>
                  </div>
                  <div className="flex flex-col flex-1 pl-1">
                    <div className="flex items-center gap-1">
                      <Typography variant="SemiBold_H5" className="text-[#1f3a5f] !text-[14px]">
                        {activity.user}
                      </Typography>
                      <Typography variant="Regular_H5" className="text-[#1f3a5f] !text-[14px]">
                        {activity.action}
                      </Typography>
                    </div>
                    <Typography variant="Regular_H7" className="text-[#717182] !text-[12px] mt-0.5">
                      {activity.time}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  )
}
