export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  sort_order: number
}

export interface Article {
  id: string
  category_id: string | null
  title: string
  slug: string
  body: string | null
  excerpt: string | null
  author: string | null
  status: "draft" | "published"
  views: number
  last_updated: string
  categories?: Category
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface ArticleTag {
  article_id: string
  tag_id: string
}

export type Tone = "professional" | "casual" | "seo" | "persuasive"

export interface GeneratorInput {
  topic: string
  keyword: string
  tone: Tone
  wordCount: number
}

export interface SEOMetrics {
  score: number
  keywordDensity: number
  readability: string
  wordCount: number
  metaTitle: string
  metaDescription: string
  suggestedLinks: string[]
}
