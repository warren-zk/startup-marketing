"use client"

import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { GeneratorInput, Tone } from "@/lib/types"
import { cn } from "@/lib/utils"

const tones: { value: Tone; label: string; desc: string }[] = [
  { value: "professional", label: "Professional", desc: "Formal, authoritative" },
  { value: "casual", label: "Casual", desc: "Friendly, conversational" },
  { value: "seo", label: "SEO Optimized", desc: "Keyword-rich, structured" },
  { value: "persuasive", label: "Persuasive", desc: "Compelling, action-focused" },
]

const wordCounts = [300, 500, 800, 1200, 2000]

interface Props {
  onGenerate: (input: GeneratorInput) => void
  loading: boolean
}

export default function EditorForm({ onGenerate, loading }: Props) {
  const [topic, setTopic] = useState("")
  const [keyword, setKeyword] = useState("")
  const [tone, setTone] = useState<Tone>("professional")
  const [wordCount, setWordCount] = useState(800)

  const canGenerate = topic.trim().length > 2 && keyword.trim().length > 1 && !loading

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (canGenerate) onGenerate({ topic, keyword, tone, wordCount })
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-5">
      <div>
        <h2 className="text-white font-semibold mb-1">AI Blog Generator</h2>
        <p className="text-zinc-500 text-sm">Fill in the details and generate your post.</p>
      </div>

      {/* Topic */}
      <div>
        <label className="block text-zinc-400 text-xs mb-1.5 uppercase tracking-wider">
          Blog Topic *
        </label>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. How to rank on Google in 2025"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      {/* Keyword */}
      <div>
        <label className="block text-zinc-400 text-xs mb-1.5 uppercase tracking-wider">
          Target Keyword *
        </label>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="e.g. SEO strategy"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      {/* Tone */}
      <div>
        <label className="block text-zinc-400 text-xs mb-2 uppercase tracking-wider">
          Writing Tone
        </label>
        <div className="grid grid-cols-2 gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTone(t.value)}
              className={cn(
                "text-left px-3 py-2.5 rounded-xl border text-sm transition-all",
                tone === t.value
                  ? "border-violet-500/60 bg-violet-500/10 text-violet-300"
                  : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
              )}
            >
              <div className="font-medium text-xs">{t.label}</div>
              <div className="text-zinc-600 text-xs">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Word count */}
      <div>
        <label className="block text-zinc-400 text-xs mb-2 uppercase tracking-wider">
          Word Count — <span className="text-violet-400">{wordCount} words</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {wordCounts.map((wc) => (
            <button
              key={wc}
              type="button"
              onClick={() => setWordCount(wc)}
              className={cn(
                "px-3 py-1.5 rounded-lg border text-xs transition-all",
                wordCount === wc
                  ? "border-violet-500/60 bg-violet-500/10 text-violet-300"
                  : "border-white/10 bg-white/5 text-zinc-500 hover:text-zinc-300"
              )}
            >
              {wc}
            </button>
          ))}
        </div>
      </div>

      {/* Generate */}
      <button
        type="submit"
        disabled={!canGenerate}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
          canGenerate
            ? "gradient-bg text-white hover:opacity-90 shadow-lg shadow-violet-500/25"
            : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
        )}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            AI is writing...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Blog Post
          </>
        )}
      </button>
    </form>
  )
}
