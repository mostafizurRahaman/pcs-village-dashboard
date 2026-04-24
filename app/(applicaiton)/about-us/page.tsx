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

export default function AboutUsPage() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [pageTitle] = useState("About PCS Village")
  const editorRef = useRef<TiptapEditorRef>(null)

  // 1. Load initial content
  const loadContent = async () => {
    setFetching(true)
    try {
      const res = await contentApi.getContent()
      if (res.success && res.data.aboutUs) {
        // We set the content via the ref because Tiptap's internal state
        // is managed separately from the initial 'value' prop after mount
        editorRef.current?.setContent(res.data.aboutUs)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load content")
    } finally {
      setFetching(false)
    }
  }

  // 2. Handle the Save action
  const onSave = async () => {
    const htmlContent = editorRef.current?.getContent() || ""

    setLoading(true)
    try {
      const res = await contentApi.updateContent({ aboutUs: htmlContent })
      if (res.success) {
        toast.success("About Us content updated successfully")
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
              About Us Page Management
            </Typography>
            <Typography variant="Regular_P" className="text-muted-foreground">
              Manage the About Us content displayed on the website
            </Typography>
          </div>

          <Card className="border-border shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              {/* Page Title Field */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="about-page-title">
                  <Typography
                    variant="Medium_H5"
                    className="!text-[14px] text-foreground"
                    as="span"
                  >
                    Page Title
                  </Typography>
                </Label>
                <Input
                  id="about-page-title"
                  type="text"
                  value={pageTitle}
                  disabled
                  className={`h-10 ${inputCls}`}
                />
              </div>

              {/* Tiptap Editor Section */}
              <div className="flex flex-col gap-2">
                <Label>
                  <Typography
                    variant="Medium_H5"
                    className="!text-[14px] text-foreground"
                    as="span"
                  >
                    Content Editor
                  </Typography>
                </Label>

                {fetching ? (
                  <EditorLoader />
                ) : (
                  <TiptapEditor
                    ref={editorRef}
                    placeholder="Write your about us content here..."
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={onSave}
                  disabled={loading || fetching}
                  className="h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  className="h-10 rounded-md px-4 text-sm"
                  disabled={loading || fetching}
                >
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SettingsLayout>
    </ContentLayout>
  )
}
