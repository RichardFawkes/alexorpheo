import React from "react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"

type Props = {
  content?: string | null
  className?: string
}

export default function ContentFormatter({ content, className }: Props) {
  const raw = (content || "").trim()

  if (raw.length === 0) {
    return <div className={cn("content-readable", className)} />
  }

  const schema = {
    ...defaultSchema,
    tagNames: [
      ...(defaultSchema.tagNames || []),
      "u",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td"
    ],
    attributes: {
      ...(defaultSchema.attributes || {}),
      a: ["href", "title", "rel", "target"],
      img: ["src", "alt", "title", "width", "height"],
      code: ["className"],
    },
  }

  return (
    <div className={cn("content-readable", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
      >
        {raw}
      </ReactMarkdown>
    </div>
  )
}
