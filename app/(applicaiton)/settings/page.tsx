"use client"

import { useRef, useState } from "react"
import { ContentLayout } from "@/components/navigation/content-layout"
import { SettingsLayout } from "@/components/settings/settings-layout"
import { Typography } from "@/components/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ProfileSettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Profile state
  const [fullName, setFullName] = useState("Admin User")
  const [email, setEmail] = useState("admin@pcsvillage.com")
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  // Handle photo selection → instant local preview
  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhotoUrl(url)
  }

  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <ContentLayout title="Settings">
      <SettingsLayout>
        <div className="flex flex-col gap-6">

          {/* ── Page heading ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-1">
            <Typography variant="Bold_H2" className="text-primary !text-[24px]" as="h1">
              Profile Settings
            </Typography>
            <Typography variant="Regular_P" className="text-muted-foreground">
              Manage your admin account information
            </Typography>
          </div>

          {/* ── Card 1: Profile Information ──────────────────────────── */}
          <Card className="border-border shadow-sm">
            <CardHeader className="px-6 pt-6 pb-0">
              <CardTitle>
                <Typography variant="SemiBold_H4" className="text-primary !text-[18px]">
                  Profile Information
                </Typography>
              </CardTitle>
            </CardHeader>

            <CardContent className="px-6 pt-5 pb-6 flex flex-col gap-6">

              {/* Avatar row */}
              <div className="flex items-center gap-4">
                {/* Avatar — shows uploaded image or initials */}
                <div
                  className="h-20 w-20 rounded-full flex items-center justify-center shrink-0 overflow-hidden border-2 border-secondary dark:border-primary" 
                  style={{ backgroundColor: photoUrl ? "transparent" : "#6b8e23" }}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Profile photo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Typography
                      variant="Regular_H2"
                      className="text-white !text-[24px]"
                      as="span"
                    >
                      AD
                    </Typography>
                  )}
                </div>

                {/* Hidden file input + Change Photo button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profile-photo-upload"
                  aria-label="Upload profile photo"
                  onChange={handlePhotoChange}
                />
                <Button
                  variant="outline"
                  className="h-10 px-4 border-border bg-background text-primary text-sm font-medium hover:bg-muted"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  Change Photo
                </Button>
              </div>

              {/* 2 × 2 field grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="profile-full-name">
                    <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                      Full Name
                    </Typography>
                  </Label>
                  <Input
                    id="profile-full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 bg-card text-primary text-sm"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="profile-email">
                    <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                      Email Address
                    </Typography>
                  </Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 border-border bg-card text-primary text-sm"
                  />
                </div>

                {/* Role — read-only / disabled */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="profile-role">
                    <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                      Role
                    </Typography>
                  </Label>
                  <Input
                    id="profile-role"
                    type="text"
                    value="Admin"
                    disabled
                    className="h-10 bg-card text-primary text-sm opacity-50 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Save Changes */}
              <div>
                <Button
                  id="profile-save-changes"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 text-sm font-medium rounded-md"
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ── Card 2: Change Password ───────────────────────────────── */}
          <Card className="border-border shadow-sm">
            <CardHeader className="px-6 pt-6 pb-0">
              <CardTitle>
                <Typography variant="SemiBold_H4" className="text-primary !text-[18px]">
                  Change Password
                </Typography>
              </CardTitle>
            </CardHeader>

            <CardContent className="px-6 pt-5 pb-6 flex flex-col gap-6">

              {/* Three password fields in a row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Current Password */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="current-password">
                    <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                      Current Password
                    </Typography>
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder=""
                    className="h-10  bg-card text-primary text-sm"
                  />
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="new-password">
                    <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                      New Password
                    </Typography>
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder=""
                    className="h-10  bg-card text-primary text-sm"
                  />
                </div>

                {/* Confirm New Password */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirm-password">
                    <Typography variant="Medium_H5" className="text-primary !text-[14px]" as="span">
                      Confirm New Password
                    </Typography>
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=""
                    className="h-10  bg-card text-primary text-sm"
                  />
                </div>
              </div>

              {/* Update Password */}
              <div>
                <Button
                  id="update-password"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 text-sm font-medium rounded-md"
                >
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </SettingsLayout>
    </ContentLayout>
  )
}
