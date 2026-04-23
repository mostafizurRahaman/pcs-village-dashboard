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
import { baseApi } from "@/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
  name: z.string().min(2, "Base name must be at least 2 characters."),
  country: z.string().min(1, "Country is required."),
  state: z.string().min(1, "State is required."),
  city: z.string().min(1, "City is required."),
  type: z.enum(["OFFICE", "FIELD", "REMOTE", "BASE"], {
    error: `The values should "OFFICE" | "FIELD" | "REMOTE" | "BASE"`,
  }),
})

type FormValues = z.infer<typeof formSchema>

interface AddBaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddBaseModal({
  open,
  onOpenChange,
  onSuccess,
}: AddBaseModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  // Reset form when modal closes or opens
  React.useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open, form])

  async function onSubmit(data: FormValues) {
    setIsLoading(true)

    try {
      const res = await baseApi.add({
        name: data.name,
        country: data.country,
        city: data.city,
        state: data.state,
        type: data.type,
      })

      if (res.success) {
        toast.success(`Base "${data.name}" added successfully`)
        onSuccess?.()
        onOpenChange(false)
        form.reset()
        queryClient.invalidateQueries({ queryKey: ["bases"] })
      } else {
        toast.success(res.message)
      }
    } catch {
      toast.error("Failed to add bases")
    } finally {
      setIsLoading(false)
    }
  }

  const DUTY_STATION_OPTIONS = [
    { label: "Office", value: "OFFICE" },
    { label: "Field", value: "FIELD" },
    { label: "Remote", value: "REMOTE" },
    { label: "Base", value: "BASE" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden rounded-xl border-border bg-card p-0">
        {/* Accent Bar */}
        <div className="h-1.5 w-full bg-primary" />

        <div className="p-6">
          <DialogHeader className="mb-6 flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <DialogTitle asChild>
              <Typography variant="Bold_H3">Add New Base</Typography>
            </DialogTitle>
            <DialogDescription asChild>
              <Typography
                variant="Regular_H7"
                className="text-muted-foreground"
              >
                Enter the details to register a new military base branch.
              </Typography>
            </DialogDescription>
          </DialogHeader>

          <form id="add-base-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Base Name Field */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="add-baseName">
                      <Typography variant="Medium_H7">Base Name</Typography>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="add-baseName"
                      placeholder="e.g. Fort Liberty"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Country Field */}
                <Controller
                  name="country"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="add-country">
                        <Typography variant="Medium_H7">Country</Typography>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="add-country"
                        placeholder="USA"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* State Field */}
                <Controller
                  name="state"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="add-state">
                        <Typography variant="Medium_H7">State</Typography>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="add-state"
                        placeholder="NC"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* City Field */}
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="add-city">
                      <Typography variant="Medium_H7">City</Typography>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="add-city"
                      placeholder="Fayetteville"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="duty-station">
                      <Typography variant="Medium_H7">Duty Station</Typography>
                    </FieldLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="duty-station" className="w-full">
                        <SelectValue placeholder="Select a station" />
                      </SelectTrigger>
                      <SelectContent>
                        {DUTY_STATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
              form="add-base-form"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Base
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
