"use client"

import { useState } from "react"
import { Bell, CheckCheck, Info, AlertTriangle, UserPlus, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/* ─── Types ──────────────────────────────────────────────────────── */
type NotifType = "info" | "warning" | "success" | "user"

interface Notification {
  id: string
  type: NotifType
  title: string
  message: string
  time: string
  read: boolean
}

/* ─── Mock data ──────────────────────────────────────────────────── */
const INITIAL: Notification[] = [
  {
    id: "1",
    type: "user",
    title: "New User Registered",
    message: "Sgt. James Miller created an account and is pending approval.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Subscription Expiring",
    message: "Fort Bragg base subscription expires in 3 days. Renew now.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "System Update Scheduled",
    message: "Maintenance window tonight at 02:00 UTC. Expect 15 min downtime.",
    time: "3 hr ago",
    read: false,
  },
  {
    id: "4",
    type: "success",
    title: "Base Request Approved",
    message: "Camp Pendleton relocation request #2047 has been approved.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Report Generated",
    message: "Monthly personnel report for March 2026 is ready to download.",
    time: "2 days ago",
    read: true,
  },
]

/* ─── Icon + colour per type ─────────────────────────────────────── */
function NotifIcon({ type }: { type: NotifType }) {
  const map: Record<NotifType, { Icon: React.ElementType; cls: string }> = {
    user:    { Icon: UserPlus,       cls: "bg-primary/10 text-primary" },
    warning: { Icon: AlertTriangle,  cls: "bg-yellow-500/10 text-yellow-500" },
    info:    { Icon: Info,           cls: "bg-secondary/10 text-secondary" },
    success: { Icon: Package,        cls: "bg-emerald-500/10 text-emerald-500" },
  }
  const { Icon, cls } = map[type]
  return (
    <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", cls)}>
      <Icon className="h-4 w-4" />
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────────────── */
export function NotificationBell() {
  const [items, setItems] = useState<Notification[]>(INITIAL)
  const unreadCount = items.filter((n) => !n.read).length

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function markRead(id: string) {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground ring-1 ring-card">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[360px] p-0 border border-border bg-card shadow-lg rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Typography variant="SemiBold_H5" className="text-foreground">
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="h-5 min-w-5 px-1.5 text-[10px] font-bold rounded-full"
              >
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-xs text-secondary hover:underline font-medium"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>

        {/* Notification list */}
        <div className="max-h-[360px] overflow-y-auto divide-y divide-border">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
              <Bell className="h-8 w-8 opacity-30" />
              <Typography variant="Regular_H6" className="text-muted-foreground">
                No notifications
              </Typography>
            </div>
          ) : (
            items.map((notif) => (
              <button
                key={notif.id}
                onClick={() => markRead(notif.id)}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60",
                  !notif.read && "bg-primary/[0.04]"
                )}
              >
                <NotifIcon type={notif.type} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Typography
                      variant="Medium_H6"
                      className={cn(
                        "text-foreground !text-[13px] leading-tight line-clamp-1",
                        !notif.read && "font-semibold"
                      )}
                    >
                      {notif.title}
                    </Typography>
                    {!notif.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                  <Typography
                    variant="Regular_H7"
                    className="text-muted-foreground !text-[12px] leading-snug line-clamp-2 mt-0.5"
                  >
                    {notif.message}
                  </Typography>
                  <Typography
                    variant="Regular_H7"
                    className="text-muted-foreground/60 !text-[11px] mt-1"
                  >
                    {notif.time}
                  </Typography>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2.5">
          <button className="w-full text-center text-xs text-secondary hover:underline font-medium">
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
