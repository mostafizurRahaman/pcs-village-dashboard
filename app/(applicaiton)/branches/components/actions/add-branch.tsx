"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Loader2, Plus, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Typography } from "@/components/typography"

const formSchema = z.object({
  branchName: z.string().min(2, "Branch name is required."),
})

export function AddBranchModal({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  onSuccess?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const form = useForm<{ branchName: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: { branchName: "" },
  })

  async function onSubmit(data: { branchName: string }) {
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      toast.success(`Branch "${data.branchName}" added successfully`)
      onSuccess?.()
      onOpenChange(false)
      form.reset()
    } catch {
      toast.error("Failed to add branch")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden rounded-xl p-0">
        <div className="h-1.5 w-full bg-primary" />
        <div className="p-6">
          <DialogHeader className="mb-6 flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <DialogTitle>
              <Typography variant="Bold_H3">Add New Branch</Typography>
            </DialogTitle>
            <DialogDescription>
              Create a new military service branch in the system.
            </DialogDescription>
          </DialogHeader>

          <form id="add-branch-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="branchName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      <Typography variant="Medium_H7">Branch Name</Typography>
                    </FieldLabel>
                    <Input {...field} placeholder="e.g. Space Force" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          <DialogFooter className="mt-8 flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-branch-form"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Create Branch
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
