"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, FileEdit, Eye, Trash2, Plus, Clock } from "lucide-react"
import { Article } from "@/lib/types"
import { cn } from "@/lib/utils"

interface Props {
  articles: Article[]
  loading: boolean
}

type Filter = "all" | "published" | "draft"

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return "Today"
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  return new Date(dateStr).toLocaleDateString()
}

export default function ArticlesList({ articles, loading }: Props) {
  const [filter, setFilter] = useState<Filter>("all")
  const [search, setSearch] = useState("")

  const filtered = articles.filter((a) => {
    const matchFilter = filter === "all" || a.status === filter
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.excerpt || "").toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div id="articles" className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-white/10">
        <h2 className="text-white font-semibold">Articles</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full sm:w-48 bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50"
            />
          </div>
          <Link
            href="/editor"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl gradient-bg text-white text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            New Post
          </Link>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex border-b border-white/10 px-5">
        {(["all", "published", "draft"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-3 text-sm capitalize transition-colors border-b-2 -mb-px",
              filter === f
                ? "text-violet-400 border-violet-500"
                : "text-zinc-500 border-transparent hover:text-zinc-300"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="divide-y divide-white/5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-5">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 bg-zinc-800 rounded shimmer" />
                <div className="h-3 w-1/3 bg-zinc-800 rounded shimmer" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-zinc-600 text-sm">No articles found.</div>
            <Link
              href="/editor"
              className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-xl gradient-bg text-white text-sm"
            >
              <Plus className="w-4 h-4" />
              Create your first post
            </Link>
          </div>
        ) : (
          filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/3 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      article.status === "published"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-yellow-500/15 text-yellow-400"
                    )}
                  >
                    {article.status}
                  </span>
                  {article.categories && (
                    <span className="text-xs text-zinc-600">{article.categories.icon} {article.categories.name}</span>
                  )}
                </div>
                <div className="text-white text-sm font-medium truncate">{article.title}</div>
                {article.excerpt && (
                  <div className="text-zinc-500 text-xs truncate mt-0.5">{article.excerpt}</div>
                )}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="hidden sm:flex items-center gap-1 text-zinc-600 text-xs">
                  <Eye className="w-3 h-3" />
                  {article.views}
                </div>
                <div className="hidden sm:flex items-center gap-1 text-zinc-600 text-xs">
                  <Clock className="w-3 h-3" />
                  {timeAgo(article.last_updated)}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href="/editor"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                  </Link>
                  <button className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
