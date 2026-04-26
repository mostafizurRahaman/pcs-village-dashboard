import { Metadata } from "next"
import { Suspense } from "react"

import { Typography } from "@/components/typography"

import { ContentLayout } from "@/components/navigation/content-layout"
import BasesTable from "."

export const metadata: Metadata = {
  title: "User Management",
  description: "Manage users, roles status and access",
}

export default function UsersPage() {
  return (
    <ContentLayout title="Users">
      <div className="container mx-auto space-y-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="Bold_H2" className="text-foreground">
              Manage FAQ
            </Typography>
            <Typography variant="Regular_H6" className="text-muted-foreground">
              Manage the database of Frequently ask questoions
            </Typography>
          </div>
        </div>

        <Suspense fallback={<div className="text-white">Loading bases...</div>}>
          <BasesTable />
        </Suspense>
      </div>
    </ContentLayout>
  )
}
