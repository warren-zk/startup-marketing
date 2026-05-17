"use client"

import { motion } from "framer-motion"
import { Sparkles, BarChart3, LayoutDashboard, Zap, Search, FileText } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI Blog Generator",
    description:
      "Generate full-length, SEO-optimized blog posts in seconds. Choose your tone, target keyword, and word count — the AI does the rest.",
    color: "text-violet-400",
    bg: "from-violet-500/10 to-indigo-500/10",
  },
  {
    icon: Search,
    title: "SEO Optimization Panel",
    description:
      "Real-time SEO scoring, keyword density analysis, meta title and description generation, and readability scoring built right in.",
    color: "text-indigo-400",
    bg: "from-indigo-500/10 to-blue-500/10",
  },
  {
    icon: LayoutDashboard,
    title: "Blog Management Dashboard",
    description:
      "Organize all your content with a powerful dashboard. Search, filter by status, manage categories and tags, and track analytics.",
    color: "text-blue-400",
    bg: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: FileText,
    title: "Export Anywhere",
    description:
      "Copy your article to clipboard, export as Markdown, or download as raw HTML — ready to paste into any CMS or website.",
    color: "text-cyan-400",
    bg: "from-cyan-500/10 to-teal-500/10",
  },
  {
    icon: BarChart3,
    title: "Analytics Cards",
    description:
      "Track your total articles, published posts, drafts, and total views with beautiful real-time analytics cards.",
    color: "text-teal-400",
    bg: "from-teal-500/10 to-green-500/10",
  },
  {
    icon: Zap,
    title: "Built for Speed",
    description:
      "No complicated setup. Start generating content immediately with a clean, minimal interface designed for busy founders.",
    color: "text-green-400",
    bg: "from-green-500/10 to-emerald-500/10",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-violet-300 text-sm mb-4">
            <Zap className="w-3.5 h-3.5" />
            Everything you need
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Marketing tools that
            <br />
            <span className="gradient-text">actually work</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            From AI content generation to SEO analysis — all the tools your startup needs in one clean platform.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-hover p-6 group cursor-default"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.bg} flex items-center justify-center mb-4`}
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
