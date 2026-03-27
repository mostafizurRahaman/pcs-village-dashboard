"use client"

import { ContentLayout } from "@/components/navigation/content-layout"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const inputCls =
  "border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm"

export default function PrivacyPolicyPage() {
  const [pageTitle, setPageTitle] = useState("Privacy Policy")
  const [content, setContent] = useState("")

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
              Privacy Policy Page Management
            </Typography>
            <Typography variant="Regular_P" className="text-muted-foreground">
              Manage the Privacy Policy content
            </Typography>
          </div>

          <Card className="border-border shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
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
                  onChange={(e) => setPageTitle(e.target.value)}
                  className={`h-10 ${inputCls}`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="privacy-content">
                  <Typography
                    variant="Medium_H5"
                    className="!text-[14px] text-foreground"
                    as="span"
                  >
                    Content
                  </Typography>
                </Label>
                <Textarea
                  id="privacy-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter Privacy Policy content..."
                  className={`h-[200px] resize-none ${inputCls}`}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="h-10 rounded-md bg-primary px-4 text-sm text-primary-foreground hover:bg-primary/90">
                  Save Changes
                </Button>
                <Button className="h-10 rounded-md bg-secondary px-4 text-sm text-secondary-foreground hover:bg-secondary/90">
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
