"use client"

import React, { forwardRef, useImperativeHandle } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Heading from "@tiptap/extension-heading"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import TextAlign from "@tiptap/extension-text-align"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import Underline from "@tiptap/extension-underline"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Redo,
  Undo,
  Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TiptapEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  editable?: boolean
}

export interface TiptapEditorRef {
  getContent: () => string
  setContent: (content: string) => void
  clearContent: () => void
}

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  ({ value, editable = true }, ref) => {
    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2, 3] },
          bulletList: { HTMLAttributes: { class: "list-disc ml-4" } },
          orderedList: { HTMLAttributes: { class: "list-decimal ml-4" } },
          codeBlock: {
            HTMLAttributes: {
              class: "rounded-lg bg-slate-900 p-4 text-slate-50 font-mono",
            },
          },
          blockquote: {
            HTMLAttributes: {
              class: "border-l-4 border-slate-300 pl-4 italic text-slate-600",
            },
          },
        }),
        Heading.configure({ levels: [1, 2, 3] }),
        Highlight.configure({ multicolor: true }),
        Link.configure({ openOnClick: false }),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Underline,
        TextStyle,
        Color,
        HorizontalRule,
      ],
      content: value,
      editable,
    })

    useImperativeHandle(
      ref,
      () => ({
        getContent: () => editor?.getHTML() || "",
        setContent: (content: string) => editor?.commands.setContent(content),
        clearContent: () => editor?.commands.clearContent(),
      }),
      [editor]
    )

    if (!editor) return null

    const setHighlight = () => {
      const color = prompt("Enter hex or color name:", "yellow")
      if (color) editor.chain().focus().toggleHighlight({ color }).run()
    }

    const insertLink = () => {
      const url = prompt("Enter URL:")
      if (url) editor.chain().focus().setLink({ href: url }).run()
    }

    const ToolbarButton = ({ onClick, isActive, icon: Icon, title }: any) => (
      <Button
        onClick={onClick}
        size="sm"
        variant={isActive ? "default" : "outline"}
        className={cn(
          "h-8 w-8 p-0",
          isActive && "bg-primary text-primary-foreground"
        )}
        title={title}
        type="button"
      >
        <Icon className="h-4 w-4" />
      </Button>
    )

    return (
      <div className="w-full rounded-lg border bg-white shadow-sm dark:bg-slate-950">
        <div className="flex flex-wrap items-center gap-1 border-b bg-slate-50/50 p-2 dark:bg-slate-900/50">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            icon={Bold}
            title="Bold"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            icon={Italic}
            title="Italic"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            icon={UnderlineIcon}
            title="Underline"
          />

          <div className="mx-1 h-6 w-px bg-border" />

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            icon={Heading1}
            title="H1"
          />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            icon={Heading2}
            title="H2"
          />

          <div className="mx-1 h-6 w-px bg-border" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            icon={List}
            title="Bullets"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            icon={AlignCenter}
            title="Center"
          />
          <ToolbarButton
            onClick={insertLink}
            isActive={editor.isActive("link")}
            icon={LinkIcon}
            title="Link"
          />
          <ToolbarButton
            onClick={setHighlight}
            isActive={editor.isActive("highlight")}
            icon={Highlighter}
            title="Highlight"
          />

          <div className="flex-grow" />

          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            icon={Undo}
            title="Undo"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            icon={Redo}
            title="Redo"
          />
        </div>

        <EditorContent
          editor={editor}
          className="prose prose-sm dark:prose-invert min-h-[300px] max-w-none p-4 focus:outline-none"
        />
      </div>
    )
  }
)

TiptapEditor.displayName = "TiptapEditor"
export default TiptapEditor
