import { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/typography"

export type VerificationStatus = "verified" | "unverified"

const verificationStatusConfig: Record<
  string,
  {
    bgClass: string
    text: string
  }
> = {
  verified: {
    bgClass: "border-success  bg-success",
    text: "Verified",
  },
  unverified: {
    bgClass: "border-red-500/50  bg-red-500/10",
    text: "unverified",
  },
}

export const VerificatinStatus: FC<{ status: string; className: string }> = ({
  status,
  className,
}) => {
  // Handle case sensitivity by finding the correct key
  const key = Object.keys(verificationStatusConfig).find(
    (k) => k.toLowerCase() === status.toLowerCase()
  )

  const config = key
    ? verificationStatusConfig[key]
    : {
        bgClass: "border-gray-600 text-gray-400 bg-gray-800",
        text: status,
      }

  return (
    <Badge
      variant="outline"
      className={`inline-flex w-fit items-center justify-center rounded-full border px-4 py-2! text-sm text-foreground capitalize ${config.bgClass} ${className}`}
    >
      <Typography variant="Medium_H7">{config.text}</Typography>
    </Badge>
  )
}
