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

export default function AboutUsPage() {
  const [pageTitle, setPageTitle] = useState("About PCS Village")
  const [content, setContent] = useState("")

  return (
    <ContentLayout title="Settings">
      <SettingsLayout>
        <div className="flex flex-col gap-6">
          {/* Page Heading */}
          <div className="flex flex-col gap-1">
            <Typography variant="Bold_H2" className="text-primary !text-[24px]" as="h1">
              About Us Page Management
            </Typography>
            <Typography variant="Regular_P" className="text-muted-foreground">
              Manage the About Us content
            </Typography>
          </div>

          {/* Form Card */}
          <Card className="border-border shadow-sm">
            <CardContent className="p-6 flex flex-col gap-4">
              {/* Page Title Field */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="about-page-title">
                  <Typography
                    variant="Medium_H5"
                    className="text-primary !text-[14px]"
                    as="span"
                  >
                    Page Title
                  </Typography>
                </Label>
                <Input
                  id="about-page-title"
                  type="text"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="h-10 border-border bg-card text-primary text-sm"
                />
              </div>

              {/* Content Textarea */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="about-content">
                  <Typography
                    variant="Medium_H5"
                    className="text-primary !text-[14px]"
                    as="span"
                  >
                    Content
                  </Typography>
                </Label>
                <Textarea
                  id="about-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter About Us page content..."
                  className="h-[200px] border-border bg-card text-primary text-sm resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  id="about-save-changes"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-4 h-10 rounded-md"
                >
                  Save Changes
                </Button>
                <Button
                  id="about-publish"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm px-4 h-10 rounded-md"
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
