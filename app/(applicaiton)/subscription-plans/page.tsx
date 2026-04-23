import { Suspense } from "react"
import { Typography } from "@/components/typography"
import { ContentLayout } from "@/components/navigation/content-layout"
import PlanManagementTable from "."
import { SubscriptionStats } from "./components/subscription-stats"
import { ToolbarOptions } from "./components/toolbar-options"

export default function SubscriptionManagementPage() {
  return (
    <ContentLayout title="Subscriptions">
      <div className="container mx-auto space-y-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <Typography variant="Bold_H2">Subscription Management</Typography>
            <Typography variant="Regular_H6" className="text-muted-foreground">
              Monitor and manage subscription plans
            </Typography>
          </div>
          <ToolbarOptions
          
          />
        </div>

        {/* <SubscriptionStats /> */}

        <Suspense
          fallback={
            <div className="text-muted-foreground italic">Loading plans...</div>
          }
        >
          <PlanManagementTable />
        </Suspense>
      </div>
    </ContentLayout>
  )
}
