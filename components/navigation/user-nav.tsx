"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Typography } from "@/components/typography";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogoutModal } from "@/components/navigation/logout-modal";
import profileImage from '@/assets/images/avater-image.png'

export function UserNav() {
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative"
                  size="lg"
                >
                  <Typography
                    variant="Bold_H6"
                    className="text-foreground focus:border-none hover:outline-none focus:outline-none"
                  >
                    Hello, Arif
                  </Typography>
                  <Avatar className="h-6 w-6  ring-0">
                    <AvatarImage src={profileImage?.src} alt="Avatar" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      AR
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">Profile</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
          {/* User info label */}
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1 py-1">
              <Typography variant="Medium_H5" className="leading-none">
                John Doe
              </Typography>
              <Typography variant="Regular_H7" className="leading-none text-muted-foreground">
                johndoe@example.com
              </Typography>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Sign out — opens the same LogoutModal */}
          <DropdownMenuItem
            id="user-nav-sign-out"
            className="hover:cursor-pointer text-destructive focus:text-destructive"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut className="w-4 h-4 mr-2" />
            <Typography variant="Medium_P">Sign out</Typography>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Shared logout confirmation modal */}
      <LogoutModal open={logoutOpen} onOpenChange={setLogoutOpen} />
    </>
  );
}
