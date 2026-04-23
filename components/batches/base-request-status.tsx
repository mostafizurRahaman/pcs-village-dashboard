

import { FC } from "react"
import { BaseBadge } from "./base-type"

export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED"

const requestStatusConfig: Record<RequestStatus, string> = {
  PENDING: "border-yellow-500/50 bg-yellow-50 text-yellow-600 dark:bg-yellow-950/30 dark:text-yellow-400",
  APPROVED: "border-emerald-500/50 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
  REJECTED: "border-red-500/50 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400",
}

export const RequestStatusBadge: FC<{
  status: string
  className?: string
}> = ({ status, className }) => {
  // Normalize input to uppercase to match the config keys
  const normalizedStatus = status.toUpperCase() as RequestStatus
  
  const style = requestStatusConfig[normalizedStatus] || "border-muted bg-muted text-muted-foreground"

  return (
    <BaseBadge
      label={normalizedStatus}
      containerClassName={style}
      className={className}
    />
  )
}