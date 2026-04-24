"use client"

import React from "react"

const EditorLoader = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      {/* Toolbar Skeleton */}
      <div className="flex flex-wrap gap-2 border-b border-border bg-muted/30 p-3">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-8 animate-pulse rounded bg-muted-foreground/20"
          />
        ))}
      </div>

      {/* Editor Content Skeleton */}
      <div className="space-y-4 p-6">
        <div className="h-8 w-1/4 animate-pulse rounded bg-muted-foreground/20" />
        <div className="space-y-3 pt-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted-foreground/10" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted-foreground/10" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted-foreground/10" />
        </div>
        <div className="space-y-3 pt-6">
          <div className="h-4 w-full animate-pulse rounded bg-muted-foreground/10" />
          <div className="h-4 w-3/5 animate-pulse rounded bg-muted-foreground/10" />
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex justify-end gap-4 border-t border-border bg-muted/30 p-3">
        <div className="h-4 w-24 animate-pulse rounded bg-muted-foreground/20" />
        <div className="h-4 w-32 animate-pulse rounded bg-muted-foreground/20" />
      </div>
    </div>
  )
}

export default EditorLoader
