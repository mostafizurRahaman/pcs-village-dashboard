"use client"

import {
  UserIcon,
  Mail,
  ShieldCheck,
  Activity,
  Calendar,
  MapPin,
} from "lucide-react"

import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from "@/types/user"

interface ViewUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
}

const detailRows = [
  { icon: ShieldCheck, label: "Branch",       key: "branch"       },
  { icon: Activity,    label: "Current Status", key: "status"     },
  { icon: Mail,        label: "Email Address", key: "email"       },
  { icon: UserIcon,    label: "User ID",       key: "id"          },
  { icon: Calendar,    label: "PCS Timeline",  key: "pcsTimeline" },
  { icon: MapPin,      label: "Duty Station",  key: "dutyStation" },
] as const

export const ViewUserModal = ({
  open,
  onOpenChange,
  user,
}: ViewUserModalProps) => {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card p-0 rounded-xl overflow-hidden max-w-md">
        {/* Coloured top accent bar */}
        <div className="h-1.5 w-full bg-primary" />

        <CardContent className="p-6">
          {/* Avatar + name header */}
          <DialogHeader className="mb-6 flex flex-col items-center justify-center gap-3">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-border shadow-md">
                <AvatarFallback className="bg-primary/10 text-2xl font-semibold text-primary">
                  {user.initial}
                </AvatarFallback>
              </Avatar>
              {/* Online indicator */}
              <span
                className={`absolute right-1 bottom-1 h-4 w-4 rounded-full border-2 border-card ${
                  user.status === "Active" ? "bg-success" : "bg-destructive"
                }`}
              />
            </div>

            <div className="text-center">
              <DialogTitle asChild>
                <Typography variant="Bold_H3" className="text-foreground">
                  {user.name}
                </Typography>
              </DialogTitle>
              <Typography variant="Regular_H6" className="text-muted-foreground mt-0.5">
                {user.email}
              </Typography>
            </div>
          </DialogHeader>

          {/* Detail grid */}
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {detailRows.map(({ icon: Icon, label, key }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Icon className="size-3.5 shrink-0" />
                    <Typography variant="Medium_H7">{label}</Typography>
                  </div>

                  {key === "status" ? (
                    <span
                      className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-success text-success-foreground"
                          : "bg-destructive text-destructive-foreground"
                      }`}
                    >
                      {user.status}
                    </span>
                  ) : (
                    <Typography variant="Regular_H7" className="text-foreground truncate">
                      {user[key as keyof User] as string}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5">
            <Button
              variant="outline"
              className="w-full border-border"
              onClick={() => onOpenChange(false)}
            >
              Close Profile
            </Button>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
}
