import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  SlidersHorizontal,
  UserRound,
} from "lucide-react"

type Submenu = {
  href: string
  label: string
  active?: boolean
  icon?: LucideIcon
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/users",
          label: "User",
          icon: Users,
          submenus: [],
        },
        {
          // Settings parent — active when on /settings OR /profile
          href: "/settings",
          label: "Settings",
          icon: Settings,
          active:
            pathname.startsWith("/settings") || pathname.startsWith("/profile"),
          submenus: [
            {
              href: "/settings",
              label: "System Settings",
              icon: SlidersHorizontal,
            },
            {
              href: "/profile",
              label: "Profile",
              icon: UserRound,
            },
            {
              href: "/privacy-policy",
              label: "Privacy Policy",
              icon: UserRound,
            },
            {
              href: "/terms-and-conditions",
              label: "Terms and Conditions",
              icon: UserRound,
            },
            {
              href: "/about-us",
              label: "About us",
              icon: UserRound,
            },
          ],
        },
      ],
    },
  ]
}
