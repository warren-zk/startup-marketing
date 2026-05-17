import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "SEO Master — Your First Step to Marketing",
  description:
    "AI-powered SEO blog generator, analytics dashboard, and marketing tools for startups. Create optimized content in seconds.",
  keywords: "startup marketing, SEO, blog generator, AI content, digital marketing",
  openGraph: {
    title: "SEO Master",
    description: "Your First Step to Marketing",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-zinc-950 text-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
