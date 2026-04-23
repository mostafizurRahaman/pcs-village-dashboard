"use client"

import { useState } from "react"
import { LogOut, User as UserIcon, Settings } from "lucide-react"
import { Typography } from "@/components/typography"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoutModal } from "@/components/navigation/logout-modal"

// 1. Import the auth hook
import { useAuth } from "@/hooks/use-auth"

export function UserNav() {
  const [logoutOpen, setLogoutOpen] = useState(false)

  // 2. Extract user and logout from store
  const { user, logout } = useAuth()

  // Helper to get initials if no image exists
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD"

  return (
    <>
      <DropdownMenu>
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative flex items-center gap-2"
                  size="lg"
                >
                  <Typography
                    variant="Bold_H6"
                    className="hidden text-foreground hover:outline-none focus:border-none focus:outline-none sm:inline-block"
                  >
                    {/* 3. Display real dynamic name */}
                    Hello, {user?.name.split(" ")[0] || "Admin"}
                  </Typography>
                  <Avatar className="h-7 w-7 ring-0">
                    {/* 4. Display real profile image */}
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-[10px] font-bold text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">Profile</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent
          className="w-56 border-border bg-card"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1 py-1">
              <Typography variant="Medium_H5" className="truncate leading-none">
                {/* 5. Dynamic Name */}
                {user?.name || "Loading..."}
              </Typography>
              <Typography
                variant="Regular_H7"
                className="truncate leading-none text-muted-foreground"
              >
                {/* 6. Dynamic Email */}
                {user?.email || ""}
              </Typography>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/settings" className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <Typography variant="Medium_P">Account Settings</Typography>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            id="user-nav-sign-out"
            className="text-destructive hover:cursor-pointer focus:bg-destructive/10 focus:text-destructive"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <Typography variant="Medium_P">Sign out</Typography>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 7. Pass the store's logout function to the modal confirm action */}
      <LogoutModal
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={() => logout()}
      />
    </>
  )
}
