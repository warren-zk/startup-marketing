"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Link2, Edit3 } from "lucide-react"
import { SEOMetrics } from "@/lib/types"

interface Props {
  metrics: SEOMetrics | null
}

function ScoreCircle({ score }: { score: number }) {
  const r = 30
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444"

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg width="80" height="80" className="-rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#27272a" strokeWidth="6" />
        <motion.circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-xl font-bold text-white leading-none">{score}</div>
        <div className="text-zinc-500 text-xs">/ 100</div>
      </div>
    </div>
  )
}

export default function SEOPanel({ metrics }: Props) {
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDesc, setMetaDesc] = useState("")

  useEffect(() => {
    if (metrics) {
      setMetaTitle(metrics.metaTitle)
      setMetaDesc(metrics.metaDescription)
    }
  }, [metrics])

  if (!metrics) {
    return (
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold">SEO Panel</h2>
        <div className="text-zinc-600 text-sm text-center py-8">
          Generate a blog post to see your SEO analysis.
        </div>
      </div>
    )
  }

  const densityColor =
    metrics.keywordDensity >= 1 && metrics.keywordDensity <= 3
      ? "text-green-400"
      : "text-yellow-400"
  const densityWidth = Math.min((metrics.keywordDensity / 5) * 100, 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass rounded-2xl p-6 space-y-5"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold">SEO Analysis</h2>
        <TrendingUp className="w-4 h-4 text-violet-400" />
      </div>

      {/* Score */}
      <div className="flex items-center gap-4">
        <ScoreCircle score={metrics.score} />
        <div className="space-y-1">
          <div className="text-white text-sm font-medium">SEO Score</div>
          <div className={`text-xs ${metrics.score >= 70 ? "text-green-400" : metrics.score >= 40 ? "text-yellow-400" : "text-red-400"}`}>
            {metrics.score >= 70 ? "Good — Well optimized" : metrics.score >= 40 ? "Fair — Needs improvement" : "Poor — Needs work"}
          </div>
          <div className="text-zinc-600 text-xs">{metrics.wordCount} words</div>
        </div>
      </div>

      {/* Keyword density */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-zinc-400">Keyword Density</span>
          <span className={densityColor}>{metrics.keywordDensity}%</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-bg"
            initial={{ width: 0 }}
            animate={{ width: `${densityWidth}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <div className="text-zinc-600 text-xs mt-1">Ideal: 1%–3%</div>
      </div>

      {/* Readability */}
      <div className="flex items-center justify-between py-3 border-t border-white/10">
        <span className="text-zinc-400 text-sm">Readability</span>
        <span className="text-sm text-white font-medium">{metrics.readability}</span>
      </div>

      {/* Meta title */}
      <div>
        <label className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1.5 uppercase tracking-wider">
          <Edit3 className="w-3 h-3" />
          Meta Title
          <span className={`ml-auto font-normal normal-case tracking-normal ${metaTitle.length > 60 ? "text-red-400" : "text-zinc-600"}`}>
            {metaTitle.length}/60
          </span>
        </label>
        <input
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-violet-500/50"
        />
      </div>

      {/* Meta description */}
      <div>
        <label className="flex items-center gap-1.5 text-zinc-400 text-xs mb-1.5 uppercase tracking-wider">
          <Edit3 className="w-3 h-3" />
          Meta Description
          <span className={`ml-auto font-normal normal-case tracking-normal ${metaDesc.length > 160 ? "text-red-400" : "text-zinc-600"}`}>
            {metaDesc.length}/160
          </span>
        </label>
        <textarea
          value={metaDesc}
          onChange={(e) => setMetaDesc(e.target.value)}
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-violet-500/50 resize-none"
        />
      </div>

      {/* Suggested links */}
      <div>
        <div className="flex items-center gap-1.5 text-zinc-400 text-xs mb-2 uppercase tracking-wider">
          <Link2 className="w-3 h-3" />
          Suggested Internal Links
        </div>
        <ul className="space-y-2">
          {metrics.suggestedLinks.map((link, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-zinc-500">
              <span className="text-violet-500 shrink-0 mt-0.5">→</span>
              <span className="hover:text-violet-400 transition-colors cursor-pointer">{link}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
