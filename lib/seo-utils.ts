import { SEOMetrics } from "./types"

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function calcKeywordDensity(text: string, keyword: string): number {
  if (!keyword.trim()) return 0
  const words = countWords(text)
  const kw = keyword.toLowerCase()
  const matches = (text.toLowerCase().match(new RegExp(kw, "g")) || []).length
  return words > 0 ? parseFloat(((matches / words) * 100).toFixed(1)) : 0
}

export function calcReadability(text: string): string {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 3)
  const words = countWords(text)
  if (sentences.length === 0 || words === 0) return "N/A"
  const avgWordsPerSentence = words / sentences.length
  if (avgWordsPerSentence < 12) return "Very Easy"
  if (avgWordsPerSentence < 17) return "Easy"
  if (avgWordsPerSentence < 22) return "Moderate"
  if (avgWordsPerSentence < 28) return "Difficult"
  return "Very Difficult"
}

export function calcSEOScore(
  text: string,
  keyword: string,
  title: string,
  description: string
): number {
  let score = 0
  const density = calcKeywordDensity(text, keyword)
  const words = countWords(text)

  if (density >= 1 && density <= 3) score += 25
  else if (density > 0) score += 10

  if (words >= 600) score += 20
  else if (words >= 300) score += 10

  if (keyword && text.toLowerCase().includes(keyword.toLowerCase())) score += 15
  if (title && title.toLowerCase().includes(keyword.toLowerCase())) score += 15
  if (description && description.toLowerCase().includes(keyword.toLowerCase())) score += 10

  const headingMatches = (text.match(/^#{1,3}\s/gm) || []).length
  if (headingMatches >= 3) score += 10
  if (headingMatches >= 5) score += 5

  return Math.min(score, 100)
}

export function generateMetaTitle(topic: string, keyword: string): string {
  const base = `${topic}: Complete ${keyword} Guide`
  return base.length <= 60 ? base : base.slice(0, 57) + "..."
}

export function generateMetaDescription(topic: string, keyword: string): string {
  return `Discover the best strategies for ${topic}. Learn how to leverage ${keyword} to grow your business and outrank the competition. Read our expert guide now.`
}

export function generateSuggestedLinks(topic: string): string[] {
  return [
    `How to Build a ${topic} Strategy from Scratch`,
    `Top 10 Tools for ${topic} in ${new Date().getFullYear()}`,
    `${topic} vs. Paid Advertising: Which Is Right for You?`,
  ]
}

export function buildSEOMetrics(
  content: string,
  keyword: string,
  topic: string
): SEOMetrics {
  const metaTitle = generateMetaTitle(topic, keyword)
  const metaDescription = generateMetaDescription(topic, keyword)
  return {
    score: calcSEOScore(content, keyword, metaTitle, metaDescription),
    keywordDensity: calcKeywordDensity(content, keyword),
    readability: calcReadability(content),
    wordCount: countWords(content),
    metaTitle,
    metaDescription,
    suggestedLinks: generateSuggestedLinks(topic),
  }
}
