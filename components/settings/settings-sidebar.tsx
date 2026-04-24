"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Typography } from "@/components/typography"
import { UserRound, Info, Shield, HelpCircle } from "lucide-react"

const settingsNav = [
  {
    href: "/settings",
    label: "Profile Settings",
    icon: UserRound,
  },
  {
    href: "/about-us",
    label: "About Us",
    icon: Info,
  },
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
    icon: Shield,
  },
]

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex w-full max-w-[300px] shrink-0 flex-col gap-4 self-start rounded-lg border border-border bg-card p-4">
      <Typography
        variant="SemiBold_H4"
        className="!text-[18px] text-primary dark:text-foreground"
      >
        Settings
      </Typography>

      <nav className="flex flex-col gap-1">
        {settingsNav.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  "flex h-12 items-center gap-3 rounded-lg px-4 transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <Typography
                  variant="Regular_H5"
                  className="!text-[16px]"
                  as="span"
                >
                  {label}
                </Typography>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
