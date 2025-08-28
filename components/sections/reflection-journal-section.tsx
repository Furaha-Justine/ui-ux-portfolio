"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CTAButton } from "@/components/cta-button"
import { SectionContainer } from "@/components/section-container"
import { Calendar, Clock } from "lucide-react"

const reflections = [
  {
    id: 1,
    title: "The Evolution of Design Systems",
    excerpt: "Exploring how design systems have transformed the way we approach scalable design solutions...",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Design Systems",
    content: "Full content would be loaded from the backend API...",
  },
  {
    id: 2,
    title: "User Research in Remote Settings",
    excerpt: "Adapting user research methodologies for remote work environments and distributed teams...",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "User Research",
    content: "Full content would be loaded from the backend API...",
  },
  {
    id: 3,
    title: "Accessibility-First Design Approach",
    excerpt: "Why starting with accessibility constraints leads to better design solutions for everyone...",
    date: "2024-01-01",
    readTime: "6 min read",
    category: "Accessibility",
    content: "Full content would be loaded from the backend API...",
  },
]

export function ReflectionJournalSection() {
  return (
    <SectionContainer id="reflection-journal" className="bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Reflection Journal</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty mb-6">
          Thoughts, insights, and learnings from my design journey. Each reflection captures lessons learned and
          observations about the evolving world of design.
        </p>
        <CTAButton variant="secondary" size="md" href="/journal">
          View All Journals
        </CTAButton>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reflections.map((reflection) => (
          <Card key={reflection.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="space-y-3">
              <Badge variant="secondary" className="w-fit">
                {reflection.category}
              </Badge>
              <CardTitle className="text-lg text-balance leading-tight">{reflection.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{reflection.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{reflection.readTime}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 leading-relaxed">{reflection.excerpt}</p>
              <CTAButton variant="primary" size="sm" href={`/journal/${reflection.id}`} className="w-full">
                Read More
              </CTAButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  )
}
