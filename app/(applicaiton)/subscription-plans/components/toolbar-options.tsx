"use client"
import { Typography } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddPlanModal } from "./actions/add-plan"
import { useState } from "react"

export const ToolbarOptions = ({
  resetSelection,
}: {
  resetSelection?: () => void
}) => {
  const [addOpen, setAddOpen] = useState(false)
  return (
    <>
      <Button
        onClick={() => setAddOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus className="size-4" />
        <Typography variant="Medium_H7">Add Subscription Plan</Typography>
      </Button>
      <AddPlanModal
        open={addOpen}
        onOpenChange={setAddOpen}
        onSuccess={resetSelection}
      />
    </>
  )
}
