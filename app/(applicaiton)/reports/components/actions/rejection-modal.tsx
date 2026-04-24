"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, AlertCircle } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Typography } from "@/components/typography"
import { reportApi } from "@/api/report.api"

// --- 1. Define the Schema ---
const formSchema = z.object({
  adminNote: z
    .string()
    .min(10, { message: "Reason must be at least 10 characters." })
    .max(500, { message: "Reason must not exceed 500 characters." }),
})

type FormValues = z.infer<typeof formSchema>

export function RejectionModal({ open, onOpenChange, report, onSuccess }: any) {
  const [loading, setLoading] = React.useState(false)
  const queryClient = useQueryClient()

  // --- 2. Initialize the Form ---
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminNote: "",
    },
  })

  // --- 3. Handle Submission ---
  async function onSubmit(values: FormValues) {
    setLoading(true)
    try {
      const res = await reportApi.rejectReport(report._id, values.adminNote)

      if (res.success) {
        toast.success(res.message || "Report rejected")
        onSuccess?.()
        onOpenChange(false)
        form.reset()
        queryClient.invalidateQueries({ queryKey: ["reports"] })
      } else {
        toast.error(res.message)
      }
    } catch (err: any) {
      console.log(err)
      toast.error(err.response?.data?.message || "Failed to reject report")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-6">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-red-100 p-4 text-red-600">
            <AlertCircle size={25} />
          </div>
        </div>

        <DialogHeader className="text-center">
          <DialogTitle asChild>
            <Typography variant="Medium_H3">Reject Report?</Typography>
          </DialogTitle>
          <DialogDescription>
            State the reason for rejecting this report.
          </DialogDescription>
        </DialogHeader>

        {/* --- 4. Render the Form --- */}
        <form id="rejection-form" onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-6">
          <FieldGroup>
            <Controller
              name="adminNote"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Admin Note</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    placeholder="Explain why this report is being rejected..."
                    className="min-h-[120px] resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              className="flex-1"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reject"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}