"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { Copy, Download, Code2, Check } from "lucide-react"
import { useState } from "react"

interface Props {
  content: string
  keyword: string
}

function highlightKeyword(text: string, keyword: string): React.ReactNode {
  if (!keyword.trim()) return text
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="keyword">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

export default function AIOutputSection({ content, keyword }: Props) {
  const [copied, setCopied] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)

  function handleCopy() {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function exportMarkdown() {
    const blob = new Blob([content], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "blog-post.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  function exportHTML() {
    const html = outputRef.current?.innerHTML || ""
    const full = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Blog Post</title></head><body>${html}</body></html>`
    const blob = new Blob([full], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "blog-post.html"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl overflow-hidden"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-zinc-900/40">
        <span className="text-zinc-400 text-sm font-medium">Generated Article</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-zinc-400 hover:text-white text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={exportMarkdown}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-zinc-400 hover:text-white text-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            MD
          </button>
          <button
            onClick={exportHTML}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-zinc-400 hover:text-white text-xs transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
            HTML
          </button>
        </div>
      </div>

      {/* Article content */}
      <div ref={outputRef} className="p-6 prose prose-invert prose-sm max-w-none overflow-y-auto max-h-[600px]">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold gradient-text mb-4 leading-tight">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg font-semibold text-white mt-8 mb-3 pb-2 border-b border-violet-500/30">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-semibold text-zinc-200 mt-5 mb-2">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-zinc-400 leading-relaxed mb-4 text-sm">
                {typeof children === "string"
                  ? highlightKeyword(children, keyword)
                  : children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="text-violet-300 font-semibold">{children}</strong>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-1 text-zinc-400 text-sm mb-4">{children}</ul>
            ),
            li: ({ children }) => <li className="text-zinc-400">{children}</li>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  )
}
