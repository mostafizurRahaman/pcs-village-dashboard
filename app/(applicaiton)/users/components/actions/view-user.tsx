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

export const ViewUserModal = ({
  open,
  onOpenChange,
  user,
}: ViewUserModalProps) => {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-chart bg-gradient-primary rounded-xl border-2 p-0.5!"
        showCloseButton={false}
      >
        <CardContent className="rounded-xl bg-secondary p-5">
          <DialogHeader className="mb-6 flex flex-col items-center justify-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                <AvatarFallback className="bg-primary/20 text-2xl text-primary">
                  {user.initial}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute right-1 bottom-1 h-5 w-5 rounded-full border-2 border-secondary ${user.status === 'Active' ? 'bg-teal-500' : 'bg-red-500'}`} />
            </div>
            <DialogTitle>
              <Typography variant="Bold_H2" className="text-white">
                {user.name}
              </Typography>
            </DialogTitle>
            <Typography variant="Regular_H6" className="text-muted-foreground">
              {user.email}
            </Typography>
          </DialogHeader>

          <div className="space-y-6 rounded-xl bg-background p-6 shadow-inner">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Detail Row: Branch */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="size-4" />
                  <Typography variant="Medium_H7">Branch</Typography>
                </div>
                <Typography variant="Regular_H7" className="text-white">
                  {user.branch}
                </Typography>
              </div>

              {/* Detail Row: Status */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="size-4" />
                  <Typography variant="Medium_H7">Current Status</Typography>
                </div>
                <div className={`rounded-full px-2.5 py-0.5 w-fit ${user.status === 'Active' ? 'bg-[#00a63e]' : 'bg-[#d4183d]'}`}>
                  <Typography variant="Regular_H7" className="text-white">
                    {user.status}
                  </Typography>
                </div>
              </div>

              {/* Detail Row: Email */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-4" />
                  <Typography variant="Medium_H7">Email Address</Typography>
                </div>
                <Typography variant="Regular_H7" className="text-white">
                  {user.email}
                </Typography>
              </div>

              {/* Detail Row: User ID */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserIcon className="size-4" />
                  <Typography variant="Medium_H7">User ID</Typography>
                </div>
                <Typography variant="Regular_H7" className="text-white">
                  {user.id}
                </Typography>
              </div>

              {/* Detail Row: PCS Timeline */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" />
                  <Typography variant="Medium_H7">PCS Timeline</Typography>
                </div>
                <Typography variant="Regular_H7" className="text-white">
                  {user.pcsTimeline}
                </Typography>
              </div>

              {/* Detail Row: Duty Station */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  <Typography variant="Medium_H7">Duty Station</Typography>
                </div>
                <Typography variant="Regular_H7" className="text-white">
                  {user.dutyStation}
                </Typography>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                className="w-full border-gray-700 bg-transparent py-6 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => onOpenChange(false)}
              >
                Close Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
}
