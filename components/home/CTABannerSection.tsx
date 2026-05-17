"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

export default function CTABannerSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
          style={{
            background:
              "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)",
            backgroundSize: "200% 200%",
          }}
        >
          {/* Overlay glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              No credit card required
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to grow your
              <br />
              startup with SEO?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of founders using Startup Marketing to generate
              optimized content and dominate search rankings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/editor"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-violet-700 font-semibold hover:bg-white/95 transition-colors shadow-xl group"
              >
                <Sparkles className="w-4 h-4" />
                Start for Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-colors"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
