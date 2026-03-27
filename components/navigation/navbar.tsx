"use client"

import { UserNav } from "@/components/navigation/user-nav"
import { SheetMenu } from "@/components/navigation/sheet-menu"
import { ModeToggle } from "./mode-toggle"
import { Input } from "@/components/ui/input"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-card shadow-sm">
      <div className="mx-4 flex h-[64px] items-center sm:mx-6">
        {/* Mobile hamburger (hidden on lg) */}
        <div className="flex items-center lg:hidden mr-3">
          <SheetMenu />
        </div>

        {/* Search bar — Figma design shows ~448px wide on left */}
        <div className="relative w-full max-w-[448px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 h-10 bg-card border-border text-sm placeholder:text-muted-foreground rounded-md"
          />
        </div>

        {/* Right-side actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />

          {/* Notification Bell with red badge */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-lg"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-foreground" />
              {/* red dot badge */}
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive ring-1 ring-card" />
            </Button>
          </div>

          <UserNav />
        </div>
      </div>
    </header>
  )
}
