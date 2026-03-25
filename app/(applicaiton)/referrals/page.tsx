import { Suspense } from "react"
import { Typography } from "@/components/typography"
import { ContentLayout } from "@/components/navigation/content-layout"
import ReferralTable from "."
import { ReferralStats } from "./components/referral-stats"

export default function ReferralPage() {
  return (
    <ContentLayout title="Referrals">
      <div className="container mx-auto space-y-8 py-8">
        <div className="flex flex-col gap-1">
          <Typography variant="Bold_H2" className="text-foreground">
            Referral Management
          </Typography>
          <Typography variant="Regular_H6" className="text-muted-foreground">
            Monitor user invitations and referral conversion status
          </Typography>
        </div>

        <ReferralStats />

        <Suspense
          fallback={
            <div className="animate-pulse text-muted-foreground italic">
              Loading referral data...
            </div>
          }
        >
          <ReferralTable />
        </Suspense>
      </div>
    </ContentLayout>
  )
}
