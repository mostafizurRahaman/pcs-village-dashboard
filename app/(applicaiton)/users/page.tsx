import { Metadata } from "next"
import { Suspense } from "react"
import UsersTable from "."
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"

import { ContentLayout } from "@/components/navigation/content-layout"

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage users, roles status and access",
}

export default function UsersPage() {
  const filters = ["All", "Active", "Deleted", "Pending", "Support"]

  return (
    <ContentLayout title="Users">
      <div className="container mx-auto space-y-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="Bold_H2" className="text-foreground">
              User Management
            </Typography>
            <Typography variant="Regular_H6" className="text-muted-foreground">
              Manage users, roles status and access
            </Typography>
          </div>
        </div>

        {/* Tabs & Reset */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={filter === "All" ? "default" : "secondary"}
                className="cursor-pointer px-6 py-2 hover:bg-primary! hover:text-background"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        <Suspense fallback={<div className="text-white">Loading users...</div>}>
          <UsersTable />
        </Suspense>
      </div>
    </ContentLayout>
  )
}
