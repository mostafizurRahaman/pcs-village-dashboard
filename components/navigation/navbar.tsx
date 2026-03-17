"use client"

import { UserNav } from "@/components/navigation/user-nav"
import { SheetMenu } from "@/components/navigation/sheet-menu"
import { ModeToggle } from "./mode-toggle"

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border bg-card shadow-sm">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
