"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Loader2, Save, Building2 } from "lucide-react"

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
import { IBase } from "@/types/bases"

const formSchema = z.object({
  baseName: z.string().min(2, "Base name must be at least 2 characters."),
  country: z.string().min(1, "Country is required."),
  state: z.string().min(1, "State is required."),
  city: z.string().min(1, "City is required."),
})

type FormValues = z.infer<typeof formSchema>

interface EditBaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  base: IBase | null
  onSuccess?: () => void
}

export function EditBaseModal({
  open,
  onOpenChange,
  base,
  onSuccess,
}: EditBaseModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      baseName: "",
      country: "",
      state: "",
      city: "",
    },
  })

  // Synchronize form values when the base object changes
  React.useEffect(() => {
    if (base && open) {
      form.reset({
        baseName: base.baseName,
        country: base.country,
        state: base.state,
        city: base.city,
      })
    }
  }, [base, open, form])

  async function onSubmit(data: FormValues) {
    if (!base) return

    setIsLoading(true)
    try {
      // Simulated API Call
      // await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Updating Base ID:", base.id, data)

      toast.success(`Branch "${data?.baseName}" updated successfully`)
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to update branch details.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!base) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden rounded-xl border-border bg-card p-0">
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full bg-primary" />

        <div className="p-6">
          <DialogHeader className="mb-6 flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <DialogTitle asChild>
              <Typography variant="Bold_H3" className="text-foreground">
                Edit Base
              </Typography>
            </DialogTitle>
            <DialogDescription asChild>
              <Typography
                variant="Regular_H7"
                className="text-muted-foreground"
              >
                Modify the location and details for{" "}
                <span className="font-medium text-foreground">
                  {base.baseName}
                </span>
                .
              </Typography>
            </DialogDescription>
          </DialogHeader>

          <form id="edit-base-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Base Name */}
              <Controller
                name="baseName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-baseName">
                      <Typography variant="Medium_H7">Base Name</Typography>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="edit-baseName"
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
                {/* Country */}
                <Controller
                  name="country"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="edit-country">
                        <Typography variant="Medium_H7">Country</Typography>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="edit-country"
                        placeholder="USA"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* State */}
                <Controller
                  name="state"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="edit-state">
                        <Typography variant="Medium_H7">State</Typography>
                      </FieldLabel>
                      <Input
                        {...field}
                        id="edit-state"
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

              {/* City */}
              <Controller
                name="city"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="edit-city">
                      <Typography variant="Medium_H7">City</Typography>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="edit-city"
                      placeholder="Fayetteville"
                      aria-invalid={fieldState.invalid}
                    />
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
              className="flex-1 border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-base-form"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
