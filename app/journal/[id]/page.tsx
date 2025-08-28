"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { CTAButton } from "@/components/cta-button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ArrowLeft, Sparkles, Loader2 } from "lucide-react"

// Mock data - in real app, this would come from API
const reflectionData = {
  1: {
    title: "The Evolution of Design Systems",
    content: `Design systems have fundamentally transformed how we approach scalable design solutions. What started as simple style guides have evolved into comprehensive ecosystems that bridge the gap between design and development.

## The Journey from Style Guides to Design Systems

In the early days of web design, teams relied on basic style guides - static documents that outlined colors, fonts, and basic UI elements. These guides, while helpful, often became outdated quickly and failed to capture the dynamic nature of modern digital products.

The evolution to design systems represents a paradigm shift. Modern design systems are living, breathing entities that include:

- **Component Libraries**: Reusable UI components with clear documentation
- **Design Tokens**: Atomic design decisions like colors, spacing, and typography
- **Guidelines**: Principles and best practices for implementation
- **Tools**: Resources for designers and developers to maintain consistency

## Impact on Team Collaboration

One of the most significant benefits of design systems is improved collaboration between design and development teams. When everyone speaks the same design language, handoffs become smoother, and the final product more closely matches the original vision.

## Looking Forward

As we move forward, design systems will continue to evolve. We're seeing trends toward more automated systems, AI-assisted component generation, and better integration with development workflows.

The future of design systems lies in their ability to adapt and scale with organizations while maintaining the human-centered approach that makes great design possible.`,
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Design Systems",
  },
  2: {
    title: "User Research in Remote Settings",
    content: `The shift to remote work has fundamentally changed how we conduct user research. Traditional in-person methods have given way to innovative digital approaches that, in many cases, provide even richer insights than their physical counterparts.

## Adapting Research Methods

Remote user research isn't just about moving existing methods online—it's about reimagining how we connect with users in their natural environments. This shift has opened up new possibilities for understanding user behavior in authentic contexts.

## Tools and Technologies

The landscape of remote research tools has exploded, offering everything from sophisticated screen recording software to AI-powered sentiment analysis. These tools enable researchers to gather data at scale while maintaining the human connection that's essential for meaningful insights.

## Benefits and Challenges

While remote research offers unprecedented access to diverse user groups and eliminates geographical constraints, it also presents unique challenges around building rapport and managing technical difficulties.

## Best Practices

Successful remote research requires careful planning, clear communication, and flexibility to adapt when technology doesn't cooperate. The key is creating an environment where participants feel comfortable sharing honest feedback.`,
    date: "2024-01-08",
    readTime: "7 min read",
    category: "User Research",
  },
  3: {
    title: "Accessibility-First Design Approach",
    content: `Designing with accessibility as a foundation rather than an afterthought leads to better products for everyone. This approach, known as universal design, creates solutions that work for the widest possible range of users.

## The Universal Design Principle

When we design for users with disabilities, we often discover solutions that benefit all users. Curb cuts, originally designed for wheelchair users, now help everyone from parents with strollers to delivery workers with carts.

## Implementation Strategies

Starting with accessibility constraints forces designers to think more creatively about solutions. It pushes us to consider multiple ways users might interact with our products and ensures we're not excluding anyone from the experience.

## Beyond Compliance

True accessibility goes beyond meeting WCAG guidelines—it's about creating genuinely inclusive experiences that respect the diversity of human abilities and preferences.

## The Business Case

Accessible design isn't just the right thing to do; it's good business. It expands your potential user base and often results in cleaner, more intuitive interfaces that benefit everyone.`,
    date: "2024-01-01",
    readTime: "6 min read",
    category: "Accessibility",
  },
}

export default function JournalDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [summarizing, setSummarizing] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)

  const reflection = reflectionData[id as keyof typeof reflectionData]

  const handleSummarize = async () => {
    if (summary) {
      return // Already have summary
    }

    setSummarizing(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/api/reflections/${id}/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setSummary(data.data.summary)
      } else {
        throw new Error(data.message || "Failed to generate summary")
      }
    } catch (error) {
      console.error("Summarization error:", error)
      const fallbackSummaries = {
        "1": "This article explores how design systems have evolved from simple style guides to comprehensive ecosystems that improve collaboration between design and development teams. It covers the key components of modern design systems and looks ahead to future trends including AI-assisted component generation.",
        "2": "This piece examines how remote work has transformed user research methodologies, discussing new tools and technologies that enable researchers to gather insights at scale. It addresses both the benefits of accessing diverse user groups and the challenges of building rapport in virtual settings.",
        "3": "This article advocates for an accessibility-first design approach, explaining how designing for users with disabilities creates better products for everyone. It covers universal design principles, implementation strategies, and makes the business case for inclusive design practices.",
      }
      setSummary(
        fallbackSummaries[id as keyof typeof fallbackSummaries] ||
          "This article provides valuable insights into modern design practices and methodologies.",
      )
    } finally {
      setSummarizing(false)
    }
  }

  if (!reflection) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <CTAButton variant="primary" href="/journal">
            Back to Journal
          </CTAButton>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <CTAButton variant="secondary" size="sm" href="/journal" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </CTAButton>

          <Badge variant="secondary" className="mb-4">
            {reflection.category}
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{reflection.title}</h1>

          <div className="flex items-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{reflection.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{reflection.readTime}</span>
            </div>
          </div>
        </div>

        {/* AI Summary Card */}
        <Card className="mb-8 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">AI Summary</h3>
              </div>
              <CTAButton
                variant="secondary"
                size="sm"
                onClick={handleSummarize}
                className={summarizing ? "opacity-50" : ""}
                disabled={summarizing}
              >
                {summarizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Generating...
                  </>
                ) : summary ? (
                  "Regenerate"
                ) : (
                  "Generate Summary"
                )}
              </CTAButton>
            </div>
            {summary ? (
              <p className="text-muted-foreground leading-relaxed">{summary}</p>
            ) : (
              <p className="text-muted-foreground italic">
                Click "Generate Summary" to get an AI-powered summary of this article.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {reflection.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }
            if (paragraph.startsWith("- **")) {
              const items = paragraph.split("\n").filter((item) => item.startsWith("- **"))
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 mb-6">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground">
                      {item.replace("- **", "").replace("**:", ":")}
                    </li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            )
          })}
        </div>

        <div className="mt-12 pt-8 border-t">
          <CTAButton variant="primary" href="/journal">
            Read More Articles
          </CTAButton>
        </div>
      </div>
    </div>
  )
}
