"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Loader2, Settings2 } from "lucide-react"

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
import { ISubscriptionPlan } from "@/types/subscription-plan"

const editSchema = z.object({
  planName: z.string().min(3, "Plan name required"),
})

export function EditPlanModal({
  open,
  onOpenChange,
  plan,
  onSuccess,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
  plan: ISubscriptionPlan | null
  onSuccess?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(editSchema),
    defaultValues: { planName: "" },
  })

  React.useEffect(() => {
    if (plan && open) form.reset({ planName: plan.planName })
  }, [plan, open, form])

  async function onSubmit(data: { planName: string }) {
    setIsLoading(true)
    try {
      // Stripe Product Update logic
      console.log(data)
      await new Promise((r) => setTimeout(r, 1000))
      toast.success("Plan updated successfully")
      onSuccess?.()
      onOpenChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  if (!plan) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden rounded-xl border-border bg-card p-0">
        <div className="h-1.5 w-full bg-primary" />
        <div className="p-6">
          <DialogHeader className="mb-6 flex flex-col items-center gap-2 text-center">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Settings2 className="size-6" />
            </div>
            <DialogTitle>
              <Typography variant="Bold_H3">Edit Plan</Typography>
            </DialogTitle>
            <DialogDescription>
              Updating will change the display name for future invoices.
            </DialogDescription>
          </DialogHeader>

          <form id="edit-plan-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="planName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      <Typography variant="Medium_H7">Display Name</Typography>
                    </FieldLabel>
                    <Input {...field} />
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
              form="edit-plan-form"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
