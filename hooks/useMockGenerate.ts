"use client"

import { useState, useCallback } from "react"
import { generateMockArticle } from "@/lib/mock-ai"
import { buildSEOMetrics } from "@/lib/seo-utils"
import { GeneratorInput, SEOMetrics } from "@/lib/types"

type State = "idle" | "loading" | "complete"

export function useMockGenerate() {
  const [state, setState] = useState<State>("idle")
  const [content, setContent] = useState("")
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics | null>(null)

  const generate = useCallback((input: GeneratorInput) => {
    setState("loading")
    setContent("")
    setSeoMetrics(null)

    setTimeout(() => {
      const article = generateMockArticle(input)
      const metrics = buildSEOMetrics(article, input.keyword, input.topic)
      setContent(article)
      setSeoMetrics(metrics)
      setState("complete")
    }, 2500)
  }, [])

  const reset = useCallback(() => {
    setState("idle")
    setContent("")
    setSeoMetrics(null)
  }, [])

  return { state, content, seoMetrics, generate, reset }
}
