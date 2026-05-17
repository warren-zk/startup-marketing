"use client"

export const dynamic = "force-dynamic"

import DashboardSidebar from "@/components/layout/DashboardSidebar"
import AnalyticsCards from "@/components/dashboard/AnalyticsCards"
import ArticlesList from "@/components/dashboard/ArticlesList"
import CategoryManager from "@/components/dashboard/CategoryManager"
import DomainOverview from "@/components/dashboard/DomainOverview"
import { useArticles } from "@/hooks/useArticles"
import { useCategories } from "@/hooks/useCategories"

export default function DashboardPage() {
  const { articles, loading: articlesLoading } = useArticles()
  const { categories, loading: categoriesLoading } = useCategories()

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <DashboardSidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-zinc-950/80 border-b border-white/10 px-6 py-4">
          <h1 className="text-white font-semibold text-lg">Dashboard</h1>
          <p className="text-zinc-500 text-sm">Manage your content and analytics</p>
        </div>

        <div className="p-6 space-y-6 max-w-6xl">
          {/* Domain SEO Overview */}
          <section id="domain">
            <h2 className="text-zinc-500 font-medium mb-4 text-sm uppercase tracking-wider">
              Domain Analysis
            </h2>
            <DomainOverview />
          </section>

          {/* Analytics */}
          <section id="analytics">
            <h2 className="text-white font-medium mb-4 text-sm uppercase tracking-wider text-zinc-500">
              Overview
            </h2>
            <AnalyticsCards articles={articles} loading={articlesLoading} />
          </section>

          {/* Articles */}
          <section>
            <ArticlesList articles={articles} loading={articlesLoading} />
          </section>

          {/* Categories */}
          <section>
            <CategoryManager categories={categories} loading={categoriesLoading} />
          </section>
        </div>
      </main>
    </div>
  )
}
