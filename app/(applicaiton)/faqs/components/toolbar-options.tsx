"use client"

import { PlusIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/typography"

import { cn } from "@/lib/utils"
import { useState } from "react"

import { toast } from "sonner"
import { AddFaq } from "./actions/add-faq"

interface ToolbarOptionsProps {
  selectedBases: { id: string; name: string }[]
  allSelectedIds?: string[]
  totalSelectedCount: number
  resetSelection: () => void
}

export const ToolbarOptions = ({
  selectedBases,
  allSelectedIds = [],
  totalSelectedCount,
  resetSelection,
}: ToolbarOptionsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [addBaseDialogOpen, setAddBaseDialogOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        size="sm"
        onClick={() => setAddBaseDialogOpen((prev) => !prev)}
      >
        <PlusIcon />
        <Typography variant="Medium_H7">Add New Base</Typography>
      </Button>

      {addBaseDialogOpen && (
        <AddFaq
          onOpenChange={setAddBaseDialogOpen}
          open={addBaseDialogOpen}
          onSuccess={() => {
            toast.success("Base Added successfully")
          }}
        />
      )}
    </div>
  )
}
