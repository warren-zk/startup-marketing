"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Article } from "@/lib/types"

export function useArticles(statusFilter?: "draft" | "published") {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true)
      let query = supabase
        .from("articles")
        .select("*, categories(name, slug, icon)")
        .order("last_updated", { ascending: false })

      if (statusFilter) {
        query = query.eq("status", statusFilter)
      }

      const { data, error } = await query
      if (error) {
        setError(error.message)
      } else {
        setArticles(data || [])
      }
      setLoading(false)
    }

    fetchArticles()
  }, [statusFilter])

  return { articles, loading, error }
}
