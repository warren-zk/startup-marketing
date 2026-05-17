"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, X, Sparkles, Zap, Shield } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "Free",
    period: "",
    description: "Try SEO Master with one post. One account per email — no abuse.",
    badge: null,
    color: "",
    features: [
      { text: "1 blog post per month", included: true },
      { text: "SEO score only (no breakdown)", included: true },
      { text: "Copy text only (no export)", included: true },
      { text: "1 category", included: true },
      { text: "Community support", included: true },
      { text: "Keyword density analysis", included: false },
      { text: "Meta title & description", included: false },
      { text: "Internal link suggestions", included: false },
      { text: "AI backlink suggestions", included: false },
    ],
    cta: "Start for Free",
    href: "/editor",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$39",
    period: "/month",
    description: "For founders and marketers who publish consistently.",
    badge: "Most Popular",
    color: "violet",
    features: [
      { text: "5 blog posts per month", included: true },
      { text: "Full SEO score & breakdown", included: true },
      { text: "Markdown + HTML export", included: true },
      { text: "5 categories & unlimited tags", included: true },
      { text: "Priority email support", included: true },
      { text: "Keyword density analysis", included: true },
      { text: "Meta title & description", included: true },
      { text: "Internal link suggestions", included: true },
      { text: "AI backlink suggestions", included: false },
    ],
    cta: "Start Pro Trial",
    href: "/editor",
    highlight: true,
  },
  {
    name: "Advanced",
    price: "$99",
    period: "/month",
    description: "For growing teams who need more content and deeper SEO tools.",
    badge: null,
    color: "indigo",
    features: [
      { text: "10 blog posts per month", included: true },
      { text: "Everything in Pro", included: true },
      { text: "Readability scoring", included: true },
      { text: "Competitor keyword analysis", included: true },
      { text: "Unlimited categories & tags", included: true },
      { text: "Dashboard analytics", included: true },
      { text: "Meta title & description", included: true },
      { text: "Internal link suggestions", included: true },
      { text: "AI backlink suggestions", included: false },
    ],
    cta: "Get Advanced",
    href: "/editor",
    highlight: false,
  },
  {
    name: "Advanced Plus",
    price: "$199",
    period: "/month",
    description: "The full SEO arsenal. Unlimited content, AI backlinks, no limits.",
    badge: "Best Value",
    color: "gold",
    features: [
      { text: "Unlimited blog posts", included: true },
      { text: "Everything in Advanced", included: true },
      { text: "AI backlink suggestions", included: true },
      { text: "Site audit tool", included: true },
      { text: "Rank tracking dashboard", included: true },
      { text: "API access", included: true },
      { text: "Custom AI tone training", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "SLA guarantee", included: true },
    ],
    cta: "Go Advanced Plus",
    href: "/editor",
    highlight: false,
  },
]

const badgeStyles: Record<string, string> = {
  "Most Popular": "gradient-bg text-white shadow-lg shadow-violet-500/30",
  "Best Value": "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30",
}

const borderStyles: Record<string, string> = {
  violet: "border-violet-500/50 shadow-2xl shadow-violet-500/15",
  gold: "border-amber-500/40 shadow-xl shadow-amber-500/10",
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-violet-300 text-sm mb-4">
            <Shield className="w-3.5 h-3.5" />
            One account per email · No abuse
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="text-zinc-400 text-lg">
            Start free. Upgrade when you need more power.
          </p>
        </motion.div>

        {/* Abuse warning */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center text-zinc-600 text-xs mb-12"
        >
          Free plan is limited to 1 post/month per verified email. Multiple accounts are not permitted.
        </motion.p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative glass p-6 flex flex-col ${
                plan.color && borderStyles[plan.color] ? borderStyles[plan.color] : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${badgeStyles[plan.badge]}`}>
                    {plan.badge === "Most Popular" ? <Sparkles className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-5 pt-1">
                <div className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-2">{plan.name}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-500 text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className={`flex items-start gap-2 text-xs ${f.included ? "text-zinc-300" : "text-zinc-600"}`}>
                    {f.included
                      ? <Check className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                      : <X className="w-3.5 h-3.5 text-zinc-700 shrink-0 mt-0.5" />
                    }
                    {f.text}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full text-center py-2.5 rounded-xl text-sm font-medium transition-all ${
                  plan.highlight
                    ? "gradient-bg text-white hover:opacity-90 shadow-lg shadow-violet-500/25"
                    : plan.color === "gold"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 shadow-lg shadow-amber-500/20"
                    : "glass text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
