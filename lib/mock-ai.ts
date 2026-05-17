import { GeneratorInput, Tone } from "./types"

const toneOpeners: Record<Tone, string> = {
  professional:
    "In today's competitive digital landscape, businesses that leverage strategic approaches to",
  casual:
    "Let's be real — if you're not thinking seriously about",
  seo:
    "When it comes to ranking higher on search engines and driving organic traffic around",
  persuasive:
    "Imagine doubling your results in half the time. That's exactly what mastering",
}

const toneClosers: Record<Tone, string> = {
  professional:
    "By implementing these evidence-based strategies, your organization will be well-positioned to achieve sustainable growth.",
  casual:
    "Give these tips a shot — you'll be amazed at the difference they can make. Start small and build from there!",
  seo:
    "Optimizing for these key factors will significantly improve your search visibility and drive more qualified traffic to your site.",
  persuasive:
    "Don't wait for your competitors to get ahead. Start implementing these strategies today and claim your spot at the top.",
}

function buildParagraph(topic: string, keyword: string, index: number): string {
  const sentences = [
    `Understanding ${keyword} is essential for any business serious about ${topic}.`,
    `When you approach ${topic} with the right framework, ${keyword} becomes a powerful lever for growth.`,
    `Experts in ${topic} consistently emphasize that ${keyword} should be at the core of every strategy.`,
    `Data shows that organizations that prioritize ${keyword} in their ${topic} efforts outperform competitors by a significant margin.`,
    `The relationship between ${topic} and ${keyword} is not just theoretical — it drives measurable, real-world results.`,
    `A well-executed ${topic} plan always includes a clear focus on ${keyword} from the very beginning.`,
    `Whether you're a startup or an established brand, ${keyword} is the foundation that makes ${topic} work.`,
    `Leading practitioners of ${topic} agree: ignoring ${keyword} is one of the most costly mistakes you can make.`,
  ]
  return sentences[index % sentences.length]
}

function buildSection(
  heading: string,
  topic: string,
  keyword: string,
  paragraphCount: number,
  startIdx: number
): string {
  const paragraphs = Array.from({ length: paragraphCount }, (_, i) =>
    buildParagraph(topic, keyword, startIdx + i)
  ).join("\n\n")
  return `## ${heading}\n\n${paragraphs}`
}

export function generateMockArticle(input: GeneratorInput): string {
  const { topic, keyword, tone, wordCount } = input
  const opener = toneOpeners[tone]
  const closer = toneClosers[tone]

  const targetWords = wordCount
  const wordsPerParagraph = 30
  const totalParagraphs = Math.ceil(targetWords / wordsPerParagraph)
  const sections = 7
  const parasPerSection = Math.max(1, Math.floor(totalParagraphs / sections))

  const intro = `${opener} **${topic}** will set your brand apart. In this guide, we'll explore everything you need to know about **${keyword}** — from the fundamentals to advanced tactics that deliver real results.\n\n`

  const body = [
    buildSection(`What Is ${topic}?`, topic, keyword, parasPerSection, 0),
    buildSection(`Why ${keyword} Matters in ${new Date().getFullYear()}`, topic, keyword, parasPerSection, 1),
    buildSection(`Step-by-Step Guide to ${topic}`, topic, keyword, parasPerSection + 1, 2),
    buildSection(`Common Mistakes to Avoid`, topic, keyword, parasPerSection, 4),
    buildSection(`Expert Tips for ${keyword} Success`, topic, keyword, parasPerSection, 5),
    buildSection(`How to Measure Your ${topic} Results`, topic, keyword, parasPerSection, 6),
    buildSection(`Final Thoughts`, topic, keyword, 1, 7),
  ].join("\n\n")

  const conclusion = `\n\n${closer}`

  return `# ${topic}: The Ultimate ${keyword} Guide\n\n${intro}${body}${conclusion}`
}
