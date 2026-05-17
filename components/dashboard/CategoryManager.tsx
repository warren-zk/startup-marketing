"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Category } from "@/lib/types"

const colors = [
  "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "bg-green-500/20 text-green-300 border-green-500/30",
  "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
]

interface Props {
  categories: Category[]
  loading: boolean
}

export default function CategoryManager({ categories, loading }: Props) {
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState("")

  return (
    <div id="categories" className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Categories</h2>
        <button
          onClick={() => setAdding(!adding)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-zinc-400 hover:text-white text-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Add form */}
      {adding && (
        <div className="flex gap-2 mb-4">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Category name..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50"
          />
          <button
            onClick={() => { setAdding(false); setNewName("") }}
            className="px-3 py-2 rounded-xl gradient-bg text-white text-xs font-medium"
          >
            Save
          </button>
        </div>
      )}

      {/* Category pills */}
      {loading ? (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-7 w-24 bg-zinc-800 rounded-full shimmer" />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, i) => (
            <span
              key={cat.id}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${
                colors[i % colors.length]
              }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              {cat.name}
            </span>
          ))}
          {categories.length === 0 && (
            <p className="text-zinc-600 text-sm">No categories yet. Add your first one above.</p>
          )}
        </div>
      )}
    </div>
  )
}
