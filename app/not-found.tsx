import Link from "next/link"
import { Shield, MapPin, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      {/* Animated 404 illustration */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Number */}
        <div className="relative select-none">
          <span
            className="text-[160px] font-black leading-none tracking-tighter"
            style={{ color: "var(--color-primary, #1F3A5F)", opacity: 0.08 }}
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-xl">
              <TriangleAlert className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-3 text-center max-w-md">
          <Typography variant="Bold_H2" className="text-primary !text-[30px]">
            Page Not Found
          </Typography>
          <Typography variant="Regular_P" className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Check the URL or head back to the dashboard.
          </Typography>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 rounded-lg font-semibold"
          >
            <Link href="/dashboard">
              <Shield className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-border h-11 px-6 rounded-lg font-medium"
          >
            <Link href="/login">
              <MapPin className="h-4 w-4 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>

        {/* Footer brand */}
        <p className="text-xs text-muted-foreground mt-4">
          PCS Village Admin Portal
        </p>
      </div>
    </div>
  )
}
