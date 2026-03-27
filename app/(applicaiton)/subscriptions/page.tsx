import { Suspense } from "react"
import { Typography } from "@/components/typography"
import { ContentLayout } from "@/components/navigation/content-layout"
import SubscriptionTable from "."
import { SubscriptionStats } from "./components/subscription-stats"

export default function SubscriptionHistoryPage() {
  return (
    <ContentLayout title="Subscriptions">
      <div className="container mx-auto space-y-8 py-8">
        <div className="flex flex-col gap-1">
          <Typography variant="Bold_H2" className="text-foreground">
            Subscription History
          </Typography>
          <Typography variant="Regular_H6" className="text-muted-foreground">
            View and manage all user billing history and plan statuses
          </Typography>
        </div>

        <SubscriptionStats />

        <Suspense
          fallback={
            <div className="animate-pulse text-muted-foreground italic">
              Loading billing records...
            </div>
          }
        >
          <SubscriptionTable />
        </Suspense>
      </div>
    </ContentLayout>
  )
}
