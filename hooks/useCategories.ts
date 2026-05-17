"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Category } from "@/lib/types"

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setCategories(data || [])
        setLoading(false)
      })
  }, [])

  return { categories, loading }
}
