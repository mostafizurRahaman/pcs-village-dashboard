import { Suspense } from "react"
import { Typography } from "@/components/typography"
import { ContentLayout } from "@/components/navigation/content-layout"
import ReportsTable from "."
import { ReportStats } from "./components/report-stats"

export default function ReportsPage() {
  return (
    <ContentLayout title="Reports">
      <div className="container mx-auto space-y-8 py-8">
        <div>
          <Typography variant="Bold_H2">Reports & Moderation</Typography>
          <Typography variant="Regular_H6" className="text-muted-foreground">
            Review and manage community reports
          </Typography>
        </div>
        <ReportStats />
        <Suspense
          fallback={
            <div className="text-muted-foreground italic">
              Loading reports...
            </div>
          }
        >
          <ReportsTable />
        </Suspense>
      </div>
    </ContentLayout>
  )
}
