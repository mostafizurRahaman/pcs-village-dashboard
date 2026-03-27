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
  {
    href: "/faq",
    label: "FAQ",
    icon: HelpCircle,
  },
]

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full max-w-[300px] shrink-0 bg-card border border-border rounded-lg p-4 flex flex-col gap-4 self-start">
      <Typography variant="SemiBold_H4" className="text-primary !text-[18px]">
        Settings
      </Typography>

      <nav className="flex flex-col gap-1">
        {settingsNav.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  "flex items-center gap-3 h-12 px-4 rounded-lg transition-colors duration-200",
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
