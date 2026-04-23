"use client"

import {
  Mail,
  ShieldCheck,
  Activity,
  Calendar,
  MapPin,
  Tags,
  Baby,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/types/user"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

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
      <DialogContent className="max-w-lg overflow-hidden rounded-xl border-border bg-card p-0">
        <div className="h-1.5 w-full bg-primary" />
        <CardContent className="p-6">
          <DialogHeader className="mb-6 flex flex-col items-center justify-center gap-3">
            <Avatar className="h-20 w-20 border-4 border-border shadow-md">
              <AvatarImage src={user.profileImage} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <DialogTitle asChild>
                <Typography variant="Bold_H3">{user.name}</Typography>
              </DialogTitle>
              <Typography
                variant="Regular_H6"
                className="text-muted-foreground"
              >
                {user.email}
              </Typography>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-background p-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <Typography
                variant="Medium_H7"
                className="flex items-center gap-1 text-muted-foreground"
              >
                <ShieldCheck size={14} /> Branch
              </Typography>
              <Typography variant="Regular_H7">{user.branchName}</Typography>
            </div>
            <div className="flex flex-col gap-1">
              <Typography
                variant="Medium_H7"
                className="flex items-center gap-1 text-muted-foreground"
              >
                <Activity size={14} /> Status
              </Typography>
              <Badge className="w-fit capitalize">{user.status}</Badge>
            </div>
            <div className="flex flex-col gap-1">
              <Typography
                variant="Medium_H7"
                className="flex items-center gap-1 text-muted-foreground"
              >
                <MapPin size={14} /> Current Station
              </Typography>
              <Typography variant="Regular_H7">
                {user.currentStationName}
              </Typography>
            </div>
            <div className="flex flex-col gap-1">
              <Typography
                variant="Medium_H7"
                className="flex items-center gap-1 text-muted-foreground"
              >
                <MapPin size={14} /> Future Station
              </Typography>
              <Typography variant="Regular_H7">
                {user?.futureStationName || "N/A"}
              </Typography>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <Typography
                variant="Medium_H7"
                className="mb-2 flex items-center gap-2"
              >
                <Tags size={14} /> Interest Tags
              </Typography>
              <div className="flex flex-wrap gap-2">
                {user?.interestTags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <Typography
                variant="Medium_H7"
                className="mb-2 flex items-center gap-2"
              >
                <Baby size={14} /> Kids Age Ranges
              </Typography>
              <div className="flex flex-wrap gap-2">
                {user?.kidsAgeRanges?.map((age) => (
                  <Badge key={age} variant="outline">
                    {age}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="mt-8 w-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </CardContent>
      </DialogContent>
    </Dialog>
  )
}
