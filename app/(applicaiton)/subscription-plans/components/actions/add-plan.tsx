"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Loader2, CreditCard, DollarSign } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Typography } from "@/components/typography"

// 1. Define the schema with z.number() instead of z.coerce
const planSchema = z.object({
  planName: z.string().min(3, "Plan name must be at least 3 characters."),
  price: z.number().min(1, "Price must be at least $1."),
  interval: z.enum(["month", "year"]),
})

type PlanFormValues = z.infer<typeof planSchema>

interface AddPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddPlanModal({
  open,
  onOpenChange,
  onSuccess,
}: AddPlanModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      planName: "",
      price: 0,
      interval: "month",
    },
  })

  React.useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open, form])

  async function onSubmit(data: PlanFormValues) {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Stripe Plan Data:", data)
      toast.success(`Plan "${data.planName}" created successfully`)
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error(error)
      toast.error("Failed to create subscription plan.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden rounded-xl border-border bg-card p-0">
        <div className="h-1.5 w-full bg-primary" />
        <div className="p-6">
          <DialogHeader className="mb-6 flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
            <DialogTitle asChild>
              <Typography variant="Bold_H3">New Subscription Plan</Typography>
            </DialogTitle>
            <DialogDescription asChild>
              <Typography
                variant="Regular_H7"
                className="text-muted-foreground"
              >
                This will create a new Product and Price in your Stripe account.
              </Typography>
            </DialogDescription>
          </DialogHeader>

          <form id="add-plan-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="planName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="planName">
                      <Typography variant="Medium_H7">Plan Name</Typography>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="planName"
                      placeholder="e.g. Pro Monthly"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="price">
                        <Typography variant="Medium_H7">Price (USD)</Typography>
                      </FieldLabel>
                      <div className="relative">
                        <DollarSign className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          id="price"
                          type="number"
                          className="pl-8"
                          // Convert string value from input to number for the form state
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber || 0)
                          }
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="interval"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>
                        <Typography variant="Medium_H7">
                          Billing Cycle
                        </Typography>
                      </FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="month">Monthly</SelectItem>
                          <SelectItem value="year">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </form>

          <DialogFooter className="mt-8 flex gap-3 sm:gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="add-plan-form"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Create Plan"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
