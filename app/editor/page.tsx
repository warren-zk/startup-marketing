"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/layout/DashboardSidebar"
import EditorForm from "@/components/editor/EditorForm"
import AIOutputSection from "@/components/editor/AIOutputSection"
import SEOPanel from "@/components/editor/SEOPanel"
import { useMockGenerate } from "@/hooks/useMockGenerate"
import { GeneratorInput } from "@/lib/types"
import { Sparkles, Loader2 } from "lucide-react"

export default function EditorPage() {
  const { state, content, seoMetrics, generate } = useMockGenerate()
  const [lastKeyword, setLastKeyword] = useState("")

  function handleGenerate(input: GeneratorInput) {
    setLastKeyword(input.keyword)
    generate(input)
  }

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-zinc-950/80 border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h1 className="text-white font-semibold text-lg">AI Blog Editor</h1>
          </div>
          <p className="text-zinc-500 text-sm">Generate SEO-optimized blog posts instantly</p>
        </div>

        <div className="p-6 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Form + Output */}
            <div className="lg:col-span-2 space-y-6">
              <EditorForm
                onGenerate={handleGenerate}
                loading={state === "loading"}
              />

              {/* Loading state */}
              {state === "loading" && (
                <div className="glass rounded-2xl p-12 flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full gradient-bg opacity-20 animate-ping absolute inset-0" />
                    <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center relative">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-medium">AI is writing your article...</div>
                    <div className="text-zinc-500 text-sm mt-1">Analyzing keywords and building content</div>
                  </div>
                  <div className="w-full max-w-xs">
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full gradient-bg rounded-full animate-shimmer w-1/2" style={{ backgroundSize: "200% 100%" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Output */}
              {state === "complete" && content && (
                <AIOutputSection
                  content={content}
                  keyword={lastKeyword}
                />
              )}
            </div>

            {/* Right: SEO Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <SEOPanel metrics={seoMetrics} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
