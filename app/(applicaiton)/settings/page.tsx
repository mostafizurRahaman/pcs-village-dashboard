import { ContentLayout } from "@/components/navigation/content-layout"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Typography } from "@/components/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ProfileSettingsPage() {
  return (
    <ContentLayout title="Settings">
      <SettingsLayout>
        <div className="flex flex-col gap-6">
          {/* Page Heading */}
          <div className="flex flex-col gap-1">
            <Typography variant="Bold_H2" className="text-primary !text-[24px]" as="h1">
              Profile Settings
            </Typography>
            <Typography variant="Regular_P" className="text-muted-foreground">
              Manage your admin profile information
            </Typography>
          </div>

          {/* Form Card */}
          <Card className="border-border shadow-sm">
            <CardContent className="p-6 flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-name">
                  <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                    Full Name
                  </Typography>
                </Label>
                <Input
                  id="profile-name"
                  type="text"
                  defaultValue="Admin User"
                  className="h-10 border-border bg-card text-primary text-sm"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-email">
                  <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                    Email Address
                  </Typography>
                </Label>
                <Input
                  id="profile-email"
                  type="email"
                  defaultValue="admin@pcsvillage.com"
                  className="h-10 border-border bg-card text-primary text-sm"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="profile-phone">
                  <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                    Phone Number
                  </Typography>
                </Label>
                <Input
                  id="profile-phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="h-10 border-border bg-card text-primary text-sm"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-4 h-10 rounded-md">
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted text-sm px-4 h-10 rounded-md"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SettingsLayout>
    </ContentLayout>
  )
}
