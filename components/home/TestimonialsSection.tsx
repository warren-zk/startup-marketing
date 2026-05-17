"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, GrowthLab",
    initials: "SC",
    color: "from-violet-500 to-purple-600",
    quote:
      "We went from spending 5 hours per blog post to 10 minutes. The SEO scores are consistently above 80 — our organic traffic doubled in 3 months.",
    stars: 5,
  },
  {
    name: "Marcus Reyes",
    role: "Head of Marketing, Launchpad SaaS",
    initials: "MR",
    color: "from-indigo-500 to-blue-600",
    quote:
      "The AI blog generator understands our brand tone perfectly. We've published 40+ articles and every one ranks on the first page for our target keywords.",
    stars: 5,
  },
  {
    name: "Priya Anand",
    role: "CEO, TechScale",
    initials: "PA",
    color: "from-blue-500 to-cyan-600",
    quote:
      "Finally, a marketing tool that's actually designed for startups. The dashboard is clean, the SEO panel is incredibly useful, and the price is unbeatable.",
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Loved by <span className="gradient-text">founders</span>
          </h2>
          <p className="text-zinc-400 text-lg">
            Thousands of startups trust Startup Marketing to grow their organic reach.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass p-6 flex flex-col gap-4 hover:border-white/20 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-violet-400 text-violet-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div
                  className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t.name}</div>
                  <div className="text-zinc-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
