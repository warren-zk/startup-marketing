"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  FileEdit,
  Tag,
  BarChart3,
  Sparkles,
  Home,
  Settings,
} from "lucide-react"

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Articles", href: "/dashboard#articles", icon: FileText },
  { label: "Editor", href: "/editor", icon: FileEdit },
  { label: "Categories", href: "/dashboard#categories", icon: Tag },
  { label: "Analytics", href: "/dashboard#analytics", icon: BarChart3 },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-60 min-h-screen border-r border-white/10 bg-zinc-950 p-4 shrink-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 px-2">
          <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-white text-sm">
            Startup <span className="gradient-text">Marketing</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("#")[0]) &&
                  item.href.split("#")[0] !== "/"
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                  active
                    ? "bg-violet-600/20 text-violet-300 border border-violet-500/30 shadow-sm shadow-violet-500/10"
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-4 border-t border-white/10">
          <Link
            href="/editor"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl gradient-bg text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
          >
            <Sparkles className="w-4 h-4" />
            New Blog Post
          </Link>
        </div>
      </aside>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 bg-zinc-950/95 backdrop-blur-xl">
        {navItems.slice(0, 5).map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href.split("#")[0]) &&
                item.href.split("#")[0] !== "/"
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 flex-1 py-3 text-xs transition-colors",
                active ? "text-violet-400" : "text-zinc-600 hover:text-zinc-300"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
