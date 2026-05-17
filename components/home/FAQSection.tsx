"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Do I need an OpenAI API key to use the blog generator?",
    a: "No. The AI blog generator is fully built-in — you don't need any external API keys to get started. Just type your topic and generate.",
  },
  {
    q: "Can I export my blog posts to WordPress or other CMS?",
    a: "Yes. You can export any generated article as Markdown or raw HTML, which can be pasted directly into WordPress, Webflow, Ghost, or any other CMS.",
  },
  {
    q: "How accurate is the SEO scoring?",
    a: "Our SEO scoring analyzes keyword density, word count, heading structure, meta tags, and readability — covering the most critical on-page SEO factors that search engines care about.",
  },
  {
    q: "Is my content saved to a database?",
    a: "Yes. All your drafted and published articles are saved to your Supabase database, so you can access them anytime from any device.",
  },
  {
    q: "Can I customize the AI's writing tone?",
    a: "Absolutely. You can choose from Professional, Casual, SEO-Optimized, and Persuasive tones for every article you generate.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes! The Starter plan is completely free and includes 5 blog posts per month, basic SEO analysis, and Markdown export — no credit card required.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-white font-medium text-sm">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-zinc-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
