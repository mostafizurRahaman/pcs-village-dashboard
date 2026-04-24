"use client"

import { ContentLayout } from "@/components/navigation/content-layout"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useEffect, useState, useRef } from "react"
import { contentApi } from "@/api"
import { toast } from "sonner"
import TiptapEditor, {
  TiptapEditorRef,
} from "@/components/editor/tiptap-editor"
import EditorLoader from "@/components/editor/editor-loader"

const inputCls =
  "border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm"

export default function PrivacyPolicyPage() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [pageTitle] = useState("Privacy Policy")
  const editorRef = useRef<TiptapEditorRef>(null)

  // 1. Fetch current Privacy Policy data
  const loadContent = async () => {
    setFetching(true)
    try {
      const res = await contentApi.getContent()
      if (res.success && res.data.privacyPolicy) {
        editorRef.current?.setContent(res.data.privacyPolicy)
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to load privacy policy"
      )
    } finally {
      setFetching(false)
    }
  }

  // 2. Update Privacy Policy data
  const handleUpdate = async () => {
    const htmlContent = editorRef.current?.getContent() || ""

    setLoading(true)
    try {
      const res = await contentApi.updateContent({ privacyPolicy: htmlContent })
      if (res.success) {
        toast.success("Privacy Policy updated successfully")
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update content")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContent()
  }, [])

  return (
    <ContentLayout title="Settings">
      <SettingsLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Typography
              variant="Bold_H2"
              className="!text-[24px] text-primary dark:text-foreground"
              as="h1"
            >
              Privacy Policy Management
            </Typography>
            <Typography variant="Regular_P" className="text-muted-foreground">
              Edit the legal privacy terms for your users
            </Typography>
          </div>

          <Card className="border-border shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              {/* Page Title */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="privacy-page-title">
                  <Typography
                    variant="Medium_H5"
                    className="!text-[14px] text-foreground"
                    as="span"
                  >
                    Page Title
                  </Typography>
                </Label>
                <Input
                  id="privacy-page-title"
                  type="text"
                  value={pageTitle}
                  disabled
                  className={`h-10 ${inputCls}`}
                />
              </div>

              {/* Editor Section */}
              <div className="flex flex-col gap-2">
                <Label>
                  <Typography
                    variant="Medium_H5"
                    className="!text-[14px] text-foreground"
                    as="span"
                  >
                    Policy Content
                  </Typography>
                </Label>

                {fetching ? (
                  <EditorLoader />
                ) : (
                  <TiptapEditor
                    ref={editorRef}
                    placeholder="Enter the privacy policy details..."
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleUpdate}
                  disabled={loading || fetching}
                  className="h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="secondary"
                  className="h-10 rounded-md px-4 text-sm"
                  disabled={loading || fetching}
                >
                  Publish
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SettingsLayout>
    </ContentLayout>
  )
}
