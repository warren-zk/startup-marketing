"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MessageSquare, User, Send, CheckCircle2, Phone, MapPin, Clock } from "lucide-react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const topics = [
  "General Enquiry",
  "Sales & Pricing",
  "Technical Support",
  "Partnership",
  "Other",
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: topics[0], message: "" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 py-20 px-6">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-violet-300 text-sm mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              We reply within 24 hours
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in <span className="gradient-text">touch</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Have a question about SEO Master? Want to explore enterprise options? We&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left info panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2 space-y-4"
            >
              <div className="glass rounded-2xl p-6 space-y-5">
                <h2 className="text-white font-semibold">Contact Information</h2>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-white text-sm">hello@seomaster.io</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-white text-sm">+60 3-1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-white text-sm">Kuala Lumpur, Malaysia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs uppercase tracking-wider mb-0.5">Business Hours</p>
                    <p className="text-white text-sm">Mon–Fri, 9am–6pm MYT</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-violet-500/20">
                <h3 className="text-white font-medium mb-2 text-sm">Looking for enterprise pricing?</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  For teams of 10+ or custom API volume, we offer tailored plans with dedicated support and SLA guarantees.
                </p>
                <p className="text-violet-400 text-xs mt-3">Email us at enterprise@seomaster.io</p>
              </div>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-3"
            >
              {sent ? (
                <div className="glass rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Message sent!</h2>
                    <p className="text-zinc-400 text-sm max-w-sm">
                      Thanks for reaching out. We&apos;ll get back to you at <span className="text-white">{form.email}</span> within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: "", email: "", topic: topics[0], message: "" }) }}
                      className="mt-6 text-violet-400 hover:text-violet-300 text-sm transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-zinc-400 text-xs uppercase tracking-wider mb-1.5 block">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="John Smith"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-400 text-xs uppercase tracking-wider mb-1.5 block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-400 text-xs uppercase tracking-wider mb-1.5 block">Topic</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 transition-colors appearance-none"
                    >
                      {topics.map((t) => (
                        <option key={t} value={t} className="bg-zinc-900">{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-400 text-xs uppercase tracking-wider mb-1.5 block">Message</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what you need help with…"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 gradient-bg text-white rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
