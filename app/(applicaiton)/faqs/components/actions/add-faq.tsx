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
import { baseApi, faqApi } from "@/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useQueryClient } from "@tanstack/react-query"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  question: z.string().min(10, "Base name must be at least 2 characters."),
  answer: z.string().min(10, "Country is required."),
})

type FormValues = z.infer<typeof formSchema>

interface AddFaqModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddFaq({ open, onOpenChange, onSuccess }: AddFaqModalProps) {
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
      const res = await faqApi.add({
        question: data.question,
        answer: data.answer,
      })

      if (res.success) {
        onSuccess?.()
        onOpenChange(false)
        form.reset()
        queryClient.invalidateQueries({ queryKey: ["faqs"] })
      } else {
        toast.success(res.message)
      }
    } catch {
      toast.error("Failed to add Faq")
    } finally {
      setIsLoading(false)
    }
  }

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
              <Typography variant="Bold_H3">Add New Faq</Typography>
            </DialogTitle>
            {/* <DialogDescription asChild>
              <Typography
                variant="Regular_H7"
                className="text-muted-foreground"
              >
                Enter the details to register a new military base branch.
              </Typography>
            </DialogDescription> */}
          </DialogHeader>

          <form id="add-base-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Base Name Field */}
              <Controller
                name="question"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="add-baseName">
                      <Typography variant="Medium_H7">Question</Typography>
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
                      rows={10}
                      placeholder="Enter you answer"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* City Field */}
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
                  Create Faq
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
