import { SettingsSidebar } from "@/components/settings/settings-sidebar"

interface SettingsLayoutProps {
  children: React.ReactNode
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex gap-6 items-start w-full">
      <SettingsSidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  )
}
