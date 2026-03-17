import AdminPanelLayout from "@/components/navigation/admin-panel-layout"
import { ReactNode } from "react"

const ApplicationRootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </div>
  )
}

export default ApplicationRootLayout
