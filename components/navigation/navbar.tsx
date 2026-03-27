"use client"

import { UserNav } from "@/components/navigation/user-nav"
import { SheetMenu } from "@/components/navigation/sheet-menu"
import { ModeToggle } from "./mode-toggle"
import { NotificationBell } from "./notification-bell"

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
        {/* <div className="relative w-full max-w-[448px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 h-10 bg-card border-border text-sm placeholder:text-muted-foreground rounded-md"
          />
        </div> */}

        {/* Right-side actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />

          <NotificationBell />

          <UserNav />
        </div>
      </div>
    </header>
  )
}
