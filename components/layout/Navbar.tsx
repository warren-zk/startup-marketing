"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Menu, X, LayoutDashboard, FileEdit } from "lucide-react"

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Editor", href: "/editor" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/80 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-sm">
            Startup <span className="gradient-text">Marketing</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/editor"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
          >
            <FileEdit className="w-4 h-4" />
            Generate Blog
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-zinc-950/95 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-300 hover:text-white transition-colors block py-1"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/editor"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  <Sparkles className="w-4 h-4" />
                  Generate Blog
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
