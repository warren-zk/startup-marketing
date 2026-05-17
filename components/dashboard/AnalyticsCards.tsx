"use client"

import { motion } from "framer-motion"
import { FileText, Eye, BookOpen, CheckCircle } from "lucide-react"
import { Article } from "@/lib/types"

interface Props {
  articles: Article[]
  loading: boolean
}

export default function AnalyticsCards({ articles, loading }: Props) {
  const total = articles.length
  const published = articles.filter((a) => a.status === "published").length
  const drafts = articles.filter((a) => a.status === "draft").length
  const views = articles.reduce((sum, a) => sum + (a.views || 0), 0)

  const stats = [
    { label: "Total Articles", value: total, icon: FileText, color: "text-violet-400", bg: "from-violet-500/10 to-indigo-500/10" },
    { label: "Total Views", value: views.toLocaleString(), icon: Eye, color: "text-indigo-400", bg: "from-indigo-500/10 to-blue-500/10" },
    { label: "Published", value: published, icon: CheckCircle, color: "text-green-400", bg: "from-green-500/10 to-emerald-500/10" },
    { label: "Drafts", value: drafts, icon: BookOpen, color: "text-yellow-400", bg: "from-yellow-500/10 to-orange-500/10" },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="glass p-5"
        >
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.bg} flex items-center justify-center mb-3`}>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </div>
          {loading ? (
            <div className="space-y-2">
              <div className="h-7 w-16 bg-zinc-800 rounded-md shimmer" />
              <div className="h-4 w-20 bg-zinc-800 rounded-md shimmer" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-zinc-500 text-xs mt-0.5">{stat.label}</div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  )
}
