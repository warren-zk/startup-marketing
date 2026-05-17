"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Menu, X, LayoutDashboard, LogIn, UserPlus, LogOut, ChevronDown, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Generate Blog", href: "/editor" },
  { label: "Contact Us", href: "/contact" },
]

function UserMenu() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const initial = user?.email?.[0]?.toUpperCase() ?? "U"

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-sm text-zinc-300 hover:text-white transition-colors"
      >
        <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">
          {initial}
        </div>
        <span className="hidden sm:block max-w-[120px] truncate text-xs">{user?.email}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 glass rounded-xl py-1 z-50 shadow-xl shadow-black/40"
          >
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              href="/editor"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Generate Blog
            </Link>
            <div className="border-t border-white/10 mt-1 pt-1">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, loading } = useAuth()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/80 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-violet-500/40 group-hover:shadow-violet-500/60 transition-shadow">
            <Sparkles className="w-4.5 h-4.5 text-white drop-shadow" />
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-base tracking-tight text-white">
              SEO <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Master</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">AI SEO Platform</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors duration-200">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth area */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="w-24 h-8 rounded-xl bg-white/5 animate-pulse" />
          ) : user ? (
            <UserMenu />
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up Free
              </Link>
            </>
          )}
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
              <li className="border-t border-white/10 pt-4 flex flex-col gap-2">
                {user ? (
                  <>
                    <p className="text-zinc-600 text-xs truncate">{user.email}</p>
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 py-2 text-sm text-zinc-300"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/editor"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl glass text-white text-sm"
                    >
                      <Sparkles className="w-4 h-4" /> Generate Blog
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl glass text-white text-sm"
                    >
                      <LogIn className="w-4 h-4" /> Log In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium"
                    >
                      <UserPlus className="w-4 h-4" /> Sign Up Free
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
