import Link from "next/link"
import { Sparkles } from "lucide-react"

const footerLinks = {
  Product: [
    { label: "AI Blog Generator", href: "/editor" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "SEO Tools", href: "/editor#seo" },
    { label: "Pricing", href: "/#pricing" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact Us", href: "/contact" },
  ],
  Services: [
    { label: "Google Ads", href: "#" },
    { label: "SEO Services", href: "#" },
    { label: "Website Design", href: "#" },
    { label: "Social Media", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-violet-500/40 shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base tracking-tight text-white">
                  SEO <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">Master</span>
                </span>
                <span className="text-[9px] text-zinc-500 font-medium tracking-widest uppercase">AI Blog Platform</span>
              </div>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Your first step to marketing. AI-powered tools for modern startups.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-sm font-medium mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} SEO Master. All rights reserved.
          </p>
          <p className="text-zinc-600 text-sm">
            Your First Step to Marketing
          </p>
        </div>
      </div>
    </footer>
  )
}
