import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Startup Marketing — Your First Step to Marketing",
  description:
    "AI-powered SEO blog generator, analytics dashboard, and marketing tools for startups. Create optimized content in seconds.",
  keywords: "startup marketing, SEO, blog generator, AI content, digital marketing",
  openGraph: {
    title: "Startup Marketing",
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
        {children}
      </body>
    </html>
  )
}
