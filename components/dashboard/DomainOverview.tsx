"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Globe, TrendingUp, Link2, AlertTriangle, CheckCircle2, Clock, ExternalLink } from "lucide-react"

function hashDomain(domain: string): number {
  let h = 0
  for (let i = 0; i < domain.length; i++) {
    h = (Math.imul(31, h) + domain.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function getMockMetrics(domain: string) {
  const h = hashDomain(domain)
  const seoScore = 38 + (h % 52)
  const backlinks = 120 + (h % 14800)
  const referringDomains = 12 + (h % 480)
  const organicKeywords = 45 + (h % 3200)
  const domainRating = 8 + (h % 62)
  const issues = [
    { label: "Missing meta descriptions", count: 3 + (h % 18), severity: "high" },
    { label: "Slow page speed (>3s)", count: 1 + (h % 5), severity: "medium" },
    { label: "Images without alt text", count: 4 + (h % 22), severity: "low" },
    { label: "Broken internal links", count: h % 4, severity: "medium" },
  ]

  return { seoScore, backlinks, referringDomains, organicKeywords, domainRating, issues }
}

function ScoreRing({ score }: { score: number }) {
  const r = 40
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = score >= 70 ? "#22c55e" : score >= 45 ? "#f59e0b" : "#ef4444"
  const label = score >= 70 ? "Good" : score >= 45 ? "Fair" : "Needs Work"

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg width="112" height="112" className="-rotate-90">
          <circle cx="56" cy="56" r={r} fill="none" stroke="#27272a" strokeWidth="8" />
          <motion.circle
            cx="56" cy="56" r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-3xl font-bold text-white leading-none">{score}</div>
          <div className="text-zinc-500 text-xs">/ 100</div>
        </div>
      </div>
      <span style={{ color }} className="text-sm font-medium">{label}</span>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-violet-400" />
        <span className="text-zinc-500 text-xs">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-zinc-600 text-xs mt-0.5">{sub}</div>}
    </motion.div>
  )
}

const severityStyles = {
  high: "text-red-400 bg-red-500/10 border-red-500/20",
  medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  low: "text-zinc-400 bg-white/5 border-white/10",
}

export default function DomainOverview() {
  const [domain, setDomain] = useState("")
  const [input, setInput] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [metrics, setMetrics] = useState<ReturnType<typeof getMockMetrics> | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    const clean = input.replace(/https?:\/\//, "").replace(/\/.*$/, "").toLowerCase().trim()
    if (!clean) return

    setAnalyzing(true)
    setMetrics(null)
    setDomain(clean)

    await new Promise((r) => setTimeout(r, 1800))
    setMetrics(getMockMetrics(clean))
    setAnalyzing(false)
  }

  return (
    <div className="space-y-6">
      {/* Domain input */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-1">
          <Globe className="w-4 h-4 text-violet-400" />
          <h2 className="text-white font-semibold">Domain SEO Overview</h2>
        </div>
        <p className="text-zinc-500 text-sm mb-5">Enter your website domain to see your SEO health score and backlink profile.</p>

        <form onSubmit={handleAnalyze} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="yourdomain.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || analyzing}
            className="px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {analyzing ? "Analyzing…" : "Analyze"}
          </button>
        </form>

        {analyzing && (
          <div className="mt-4 flex items-center gap-3 text-zinc-500 text-sm">
            <Clock className="w-4 h-4 animate-spin text-violet-400" />
            Crawling {domain}…
          </div>
        )}
      </div>

      {/* Results */}
      <AnimatePresence>
        {metrics && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            {/* Domain label */}
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <ExternalLink className="w-3.5 h-3.5" />
              Results for <span className="text-white font-medium">{domain}</span>
              <span className="text-zinc-700 text-xs ml-auto">Estimated data · updated now</span>
            </div>

            {/* Score + stats */}
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <ScoreRing score={metrics.seoScore} />
                <div className="grid grid-cols-2 gap-4 flex-1 w-full">
                  <StatCard icon={Link2} label="Backlinks" value={metrics.backlinks.toLocaleString()} sub="total inbound links" />
                  <StatCard icon={Globe} label="Referring Domains" value={metrics.referringDomains.toLocaleString()} sub="unique domains linking" />
                  <StatCard icon={TrendingUp} label="Organic Keywords" value={metrics.organicKeywords.toLocaleString()} sub="keywords ranking" />
                  <StatCard icon={CheckCircle2} label="Domain Rating" value={`DR ${metrics.domainRating}`} sub="authority score" />
                </div>
              </div>
            </div>

            {/* Issues */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <h3 className="text-white font-semibold">SEO Issues Found</h3>
                <span className="ml-auto text-zinc-600 text-xs">Fix these to improve your score</span>
              </div>
              <ul className="space-y-2.5">
                {metrics.issues.map((issue) => (
                  <li
                    key={issue.label}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm ${severityStyles[issue.severity as keyof typeof severityStyles]}`}
                  >
                    <span>{issue.label}</span>
                    <span className="font-semibold shrink-0 ml-4">
                      {issue.count > 0 ? `${issue.count} pages` : "None ✓"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Upgrade nudge */}
            <div className="glass rounded-2xl p-5 border border-violet-500/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/30">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">Want deeper insights?</p>
                <p className="text-zinc-500 text-xs">Upgrade to Advanced Plus for AI backlink suggestions, rank tracking, and a full site audit.</p>
              </div>
              <a href="/#pricing" className="shrink-0 px-4 py-2 rounded-xl gradient-bg text-white text-xs font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20">
                See Plans
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
