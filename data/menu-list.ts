import {
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  SlidersHorizontal,
  UserRound,
  Share2Icon,
  GitBranch,
  LocationEdit,
  LocationEditIcon,
  SubscriptIcon,
  HistoryIcon,
  FlagIcon,
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
          href: "/branches",
          label: "Branches",
          icon: GitBranch,
          submenus: [],
        },
        {
          href: "/bases",
          label: "Bases",
          icon: LocationEditIcon,
          submenus: [],
        },
        {
          href: "/base-requests",
          label: "Base Requests",
          icon: LocationEdit,
          submenus: [],
        },
        {
          href: "/subscriptions",
          label: "Subscriptions",
          icon: HistoryIcon,
          submenus: [],
        },
        {
          href: "/subscription-plans",
          label: "Subscription Plan",
          icon: SubscriptIcon,
          submenus: [],
        },
        {
          href: "/reports",
          label: "Reports",
          icon: FlagIcon,
          submenus: [],
        },
        {
          href: "/faqs",
          label: "Faq",
          icon: FlagIcon,
          submenus: [],
        },
        {
          href: "/settings",
          label: "Settings",
          icon: Settings,
          submenus: [],
          active:
            pathname.startsWith("/settings") ||
            pathname.startsWith("/about-us") ||
            pathname.startsWith("/privacy-policy") 
            // pathname.startsWith("/faq"),
        },
      ],
    },
  ]
}
