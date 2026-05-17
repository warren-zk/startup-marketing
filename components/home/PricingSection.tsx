"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for trying out the platform",
    features: [
      "5 blog posts per month",
      "Basic SEO analysis",
      "Markdown export",
      "1 category",
      "Community support",
    ],
    cta: "Get Started Free",
    href: "/editor",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For startups serious about content marketing",
    features: [
      "Unlimited blog posts",
      "Advanced SEO scoring",
      "HTML + Markdown export",
      "Unlimited categories & tags",
      "Dashboard analytics",
      "Meta generator",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    href: "/editor",
    highlight: true,
  },
  {
    name: "Agency",
    price: "Custom",
    period: "",
    description: "For marketing agencies and enterprises",
    features: [
      "Everything in Pro",
      "Multi-brand workspaces",
      "Team collaboration",
      "API access",
      "Custom AI tone training",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    href: "#",
    highlight: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h2>
          <p className="text-zinc-400 text-lg">
            No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative glass p-6 flex flex-col ${
                plan.highlight
                  ? "border-violet-500/50 shadow-2xl shadow-violet-500/15"
                  : ""
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full gradient-bg text-white text-xs font-medium shadow-lg shadow-violet-500/30">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-zinc-400 text-sm mb-1">{plan.name}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-500 text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-zinc-500 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-violet-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`w-full text-center py-3 rounded-xl text-sm font-medium transition-all ${
                  plan.highlight
                    ? "gradient-bg text-white hover:opacity-90 shadow-lg shadow-violet-500/25"
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
