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

import { useQueryClient } from "@tanstack/react-query"
import { Textarea } from "@/components/ui/textarea"
import { IFAQ } from "@/types/faq.types"
import { faqApi } from "@/api"

const formSchema = z.object({
  question: z.string().min(10, "Base name must be at least 2 characters."),
  answer: z.string().min(10, "Country is required."),
})

type FormValues = z.infer<typeof formSchema>

interface EditFaqModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  faq: IFAQ
  onSuccess?: () => void
}

export function EditFaqModal({
  open,
  onOpenChange,
  faq,
  onSuccess,
}: EditFaqModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const queryClient = useQueryClient()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: faq.answer,
      question: faq.question,
    },
  })

  // Synchronize form values when the base object changes
  React.useEffect(() => {
    if (faq && open) {
      form.reset({})
    }
  }, [faq, open, form])

  async function onSubmit(data: FormValues) {
    if (!faq) return
    setIsLoading(true)
    try {
      const res = await faqApi.update(faq?._id as string, data)
      if (res.success) {
        toast.success(res.message)
        onSuccess?.()
        onOpenChange(false)
        queryClient.invalidateQueries({ queryKey: ["bases"] })
      } else {
        toast.success(res.message)
      }
    } catch (error) {
      toast.error("Failed to update base details.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!faq) return null

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
                Edit FAQ
              </Typography>
            </DialogTitle>
            <DialogDescription asChild>
              <Typography
                variant="Regular_H7"
                className="text-muted-foreground"
              >
                Modify the faq's question and answers.
              </Typography>
            </DialogDescription>
          </DialogHeader>

          <form id="edit-base-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Base Name Field */}
              <Controller
                name="question"
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

              {/* Country Field */}
              <Controller
                name="answer"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="faq-answer">
                      <Typography variant="Medium_H7">Answer</Typography>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="faq-answer"
                      rows={5}
                      placeholder="Enter you answer"
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
