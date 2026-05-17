"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Zap, TrendingUp, FileText } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-3xl" />
        {/* Grid mask */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-violet-300 text-sm mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI-Powered Blog Generator — Now Live
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white mb-6"
        >
          Your First Step to
          <br />
          <span className="gradient-text">Marketing Domination</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Generate SEO-optimized blog posts in seconds. Manage your content, analyze performance,
          and outrank competitors — all in one platform built for startups.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/editor"
            className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold text-sm hover:opacity-90 transition-opacity shadow-xl shadow-violet-500/30 group"
          >
            <Sparkles className="w-4 h-4" />
            Start Generating Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass text-white font-medium text-sm hover:bg-white/10 transition-colors"
          >
            View Dashboard
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-8 md:gap-16"
        >
          {[
            { icon: FileText, label: "Blog Posts Generated", value: "50K+" },
            { icon: TrendingUp, label: "Avg SEO Score Increase", value: "38%" },
            { icon: Zap, label: "Time Saved Per Post", value: "4 hrs" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <stat.icon className="w-5 h-5 text-violet-400 mb-1" />
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-zinc-500 text-xs">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Mock browser preview */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16 mx-auto max-w-4xl glass rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/10"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900/60">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 mx-4 bg-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-500">
              startup-marketing.io/editor
            </div>
          </div>
          {/* Mock editor content */}
          <div className="p-6 text-left">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="glass rounded-xl p-3 space-y-2">
                  <div className="text-xs text-zinc-500 mb-1">Blog Topic</div>
                  <div className="h-8 bg-white/5 rounded-lg flex items-center px-3">
                    <span className="text-sm text-zinc-300">How to Rank on Google in 2025</span>
                  </div>
                </div>
                <div className="glass rounded-xl p-3 space-y-2">
                  <div className="text-xs text-zinc-500 mb-1">Target Keyword</div>
                  <div className="h-8 bg-white/5 rounded-lg flex items-center px-3">
                    <span className="text-sm text-violet-400">SEO strategy</span>
                  </div>
                </div>
                <div className="w-full py-2.5 rounded-xl gradient-bg text-white text-sm text-center font-medium">
                  ✨ Generate Blog Post
                </div>
              </div>
              <div className="glass rounded-xl p-3 space-y-2">
                <div className="text-xs text-zinc-500 mb-2">SEO Score</div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-4 border-violet-500 flex items-center justify-center">
                    <span className="text-sm font-bold text-violet-400">87</span>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Keyword Density</span><span className="text-green-400">2.1%</span>
                    </div>
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 gradient-bg rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Readability</span><span className="text-green-400">Easy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
