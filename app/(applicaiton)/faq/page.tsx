import { ContentLayout } from "@/components/navigation/content-layout"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function FaqPage() {
  return (
    <ContentLayout title="Settings">
      <SettingsLayout>
        <div className="flex flex-col gap-6">
          {/* Page Heading */}
          <div className="flex flex-col gap-1">
            <Typography variant="Bold_H2" className="text-primary !text-[24px]" as="h1">
              FAQ Page Management
            </Typography>
            <Typography variant="Regular_P" className="text-muted-foreground">
              Manage the FAQ content
            </Typography>
          </div>

          {/* Form Card */}
          <Card className="border-border shadow-sm">
            <CardContent className="p-6 flex flex-col gap-4">
              {/* Question Field */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="faq-question">
                  <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                    Question
                  </Typography>
                </Label>
                <Input
                  id="faq-question"
                  type="text"
                  placeholder="Enter FAQ question..."
                  className="h-10 border-border bg-card text-primary text-sm"
                />
              </div>

              {/* Answer Textarea */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="faq-answer">
                  <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                    Answer
                  </Typography>
                </Label>
                <Textarea
                  id="faq-answer"
                  placeholder="Enter FAQ answer..."
                  className="h-[200px] border-border bg-card text-primary text-sm resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-4 h-10 rounded-md">
                  Save Changes
                </Button>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-sm px-4 h-10 rounded-md">
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
