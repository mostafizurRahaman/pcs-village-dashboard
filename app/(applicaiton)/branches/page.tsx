import { Metadata } from "next"
import { Suspense } from "react"
import { Typography } from "@/components/typography"
import { ContentLayout } from "@/components/navigation/content-layout"
import BranchesTable from "."

export const metadata: Metadata = {
  title: "Branch Management",
  description: "Manage military service branches",
}

export default function BranchesPage() {
  return (
    <ContentLayout title="Branches">
      <div className="container mx-auto space-y-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="Bold_H2" className="text-foreground">
              Branch Management
            </Typography>
            <Typography variant="Regular_H6" className="text-muted-foreground">
              Manage all military branch names in the system
            </Typography>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="text-muted-foreground">Loading branches...</div>
          }
        >
          <BranchesTable />
        </Suspense>
      </div>
    </ContentLayout>
  )
}
