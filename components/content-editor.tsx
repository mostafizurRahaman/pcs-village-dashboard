"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Save, X, Eye, Loader2 } from "lucide-react"
import { toast } from "sonner"

// Define a proper type for keys
export type ContentTypeKey = "aboutUs" | "privacyPolicy" | "termsAndCondition"

interface ContentEditorProps {
  title: string
  content: string
  contentKey: ContentTypeKey
  onUpdate: (key: ContentTypeKey, value: string) => Promise<void> // Ensure it returns a promise
  isLoading?: boolean
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  title,
  content,
  contentKey,
  onUpdate,
  isLoading = false,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  // Sync state if props change (e.g., after a successful fetch)
  useEffect(() => {
    setEditedContent(content)
  }, [content])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedContent(content)
  }

  const handleSave = async () => {
    const trimmedContent = editedContent.trim()

    if (!trimmedContent) {
      toast.error("Content cannot be empty")
      return
    }

    try {
      await onUpdate(contentKey, trimmedContent)
      setIsEditing(false)
      toast.success(`${title} updated successfully!`)
    } catch (error: any) {
      // Improved error handling check
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        `Failed to update ${title}`
      toast.error(errorMessage)
    }
  }

  // Helper to generate preview URL
  const previewUrl = `/settings/${contentKey.replace(/([A-Z])/g, "-$1").toLowerCase()}`

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(previewUrl, "_blank")}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor={`${contentKey}-editor`}>
            {isEditing ? "Edit Content" : "Current Content"}
          </Label>

          {isEditing ? (
            <Textarea
              id={`${contentKey}-editor`}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[300px] resize-none font-sans"
              placeholder={`Enter ${title.toLowerCase()} content...`}
              disabled={isLoading}
            />
          ) : (
            <div className="min-h-[300px] rounded-md border bg-muted/30 p-4">
              <div className="text-sm whitespace-pre-wrap text-foreground">
                {content || (
                  <span className="text-muted-foreground italic">
                    No content available
                  </span>
                )}
              </div>
            </div>
          )}

          <p className="flex justify-end text-xs text-muted-foreground">
            {isEditing ? editedContent.length : content.length} characters
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContentEditor
