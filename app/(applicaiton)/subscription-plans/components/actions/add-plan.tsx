"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useFieldArray } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Loader2, CreditCard, DollarSign, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { subscriptionPlanApi } from "@/api"
import { useQueryClient } from "@tanstack/react-query"

// 1. Define the Schema
const planSchema = z.object({
  name: z.string().min(3, "Plan name must be at least 3 characters."),
  description: z.string().min(5, "Description is required."),
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number({ invalid_type_error: "Price must be a number" }).min(1, "Price must be at least $1.")
  ),
  currency: z.string().default("USD"),
  interval: z.enum(["MONTH", "YEAR"]),
  features: z.array(z.string().min(1, "Feature cannot be empty")).min(1, "Add at least one feature"),
})

// 2. Define the types for the form state vs the validated output
type PlanFormValues = z.infer<typeof planSchema>

interface AddPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddPlanModal({ open, onOpenChange, onSuccess }: AddPlanModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const queryClient = useQueryClient()

  // Fix 1 & 2: Use explicit generic and handle the 'price' type mismatch for the default value
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "" as unknown as number, // Cast to unknown then number to bypass the empty string initial state
      currency: "USD",
      interval: "MONTH",
      features: [""],
    },
  })

  // Fix 3: Explicitly type the field array name to fix "Type 'features' is not assignable to type 'never'"
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features" as const, 
  })

  React.useEffect(() => {
    if (!open) form.reset()
  }, [open, form])

  // Fix 4: The data coming here is now guaranteed to match PlanFormValues by handleSubmit
  async function onSubmit(data: PlanFormValues) {
    setIsLoading(true)
    try {
      const res = await subscriptionPlanApi.addPlan({
        name: data.name,
        description: data.description,
        currency: data.currency,
        // Ensure price is sent as a string if your API expects string
        price: String(data.price), 
        features: data.features,
        interval: data.interval,
      })

      if (res.success) {
        toast.success(res.message)
        onSuccess?.()
        onOpenChange(false)
        queryClient.invalidateQueries({ queryKey: ["subscription-plans"] })
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      // Fix 5: Handle the unused 'error' variable by logging it or removing it
      console.error("Submission error:", error)
      toast.error("Failed to create subscription plan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-hidden rounded-xl border-border bg-card p-0">
        <div className="h-1.5 w-full bg-primary" />
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <DialogHeader className="mb-6 flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CreditCard className="h-6 w-6" />
            </div>
            <DialogTitle asChild>
              <Typography variant="Bold_H3">New Subscription Plan</Typography>
            </DialogTitle>
          </DialogHeader>

          <form id="add-plan-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Plan Name</FieldLabel>
                    <Input {...field} placeholder="e.g. Pro Plan" />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>
                    <Input {...field} placeholder="Short summary of the plan" />
                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Price (USD)</FieldLabel>
                      <div className="relative">
                        <DollarSign className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          type="text"
                          inputMode="numeric"
                          placeholder="0.00"
                          className="pl-8 pr-12"
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
                              field.onChange(val);
                            }
                          }}
                        />
                        <span className="absolute top-2.5 right-3 text-xs font-bold text-muted-foreground">
                          USD
                        </span>
                      </div>
                      <FieldError errors={[fieldState.error]} />
                    </Field>
                  )}
                />

                <Controller
                  name="interval"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Interval</FieldLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interval" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MONTH">MONTH</SelectItem>
                          <SelectItem value="YEAR">YEAR</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <FieldLabel>Plan Features</FieldLabel>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-primary"
                    onClick={() => append("")}
                  >
                    <Plus className="mr-1 h-4 w-4" /> Add Feature
                  </Button>
                </div>
                
                {fields.map((item, index) => (
                  <div key={item.id} className="flex gap-2">
                    <div className="flex-1">
                      <Controller
                        name={`features.${index}`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <Input {...field} placeholder={`Feature #${index + 1}`} />
                          </Field>
                        )}
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="shrink-0 border-destructive/20 text-destructive hover:bg-destructive/10"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </FieldGroup>
          </form>

          <DialogFooter className="mt-8 flex gap-3">
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
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Plan"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}