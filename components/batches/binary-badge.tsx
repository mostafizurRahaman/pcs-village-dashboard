import { FC } from "react"
import { BaseBadge } from "./base-type"

export const BinaryBadge: FC<{
  value: boolean | string
  className?: string
}> = ({ value, className = "" }) => {
  // Handle both boolean true/false and string "yes"/"no"
  const isYes = value === true || String(value).toLowerCase() === "yes"

  const label = isYes ? "YES" : "NO"
  const bgClass = isYes
    ? "border-green-500/50 bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400"
    : "border-red-500/50 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"

  return (
    <BaseBadge
      label={label}
      containerClassName={bgClass}
      className={className}
    />
  )
}
