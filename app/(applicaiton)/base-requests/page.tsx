import { Suspense } from "react"
import { Typography } from "@/components/typography"
import { ContentLayout } from "@/components/navigation/content-layout"
import BaseRequestTable from "."

export default function BaseRequestPage() {
  return (
    <ContentLayout title="Base Requests">
      <div className="container mx-auto space-y-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="Bold_H2" className="text-foreground">
              Base Request Management
            </Typography>
            <Typography variant="Regular_H6" className="text-muted-foreground">
              Approve or reject community requests for new military duty
              stations
            </Typography>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="text-muted-foreground italic">
              Loading requests...
            </div>
          }
        >
          <BaseRequestTable />
        </Suspense>
      </div>
    </ContentLayout>
  )
}
