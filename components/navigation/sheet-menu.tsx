import Link from "next/link"
import { MenuIcon, PanelsTopLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Menu } from "@/components/navigation/menu"
import { Typography } from "@/components/typography"
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8 mr-2" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col px-3 sm:w-[214px] bg-sidebar border-r border-sidebar-border p-0" side="left">
        <SheetHeader className="px-3 pt-4 pb-2 border-b border-sidebar-border">
          <Button
            className="flex items-center justify-start p-0 h-auto"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <PanelsTopLeft className="mr-1 h-6 w-6 text-primary" />
              <SheetTitle className="flex items-center">
                <Typography variant="SemiBold_H4" className="text-foreground">Elevator</Typography>
              </SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <div className="flex-1 px-2 py-3 overflow-y-auto">
          <Menu isOpen />
        </div>
      </SheetContent>
    </Sheet>
  )
}
