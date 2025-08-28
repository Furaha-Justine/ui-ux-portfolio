"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CTAButton } from "@/components/cta-button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search } from "lucide-react"

const allReflections = [
  {
    id: 1,
    title: "The Evolution of Design Systems",
    excerpt:
      "Exploring how design systems have transformed the way we approach scalable design solutions and team collaboration...",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Design Systems",
  },
  {
    id: 2,
    title: "User Research in Remote Settings",
    excerpt:
      "Adapting user research methodologies for remote work environments and distributed teams in the post-pandemic world...",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "User Research",
  },
  {
    id: 3,
    title: "Accessibility-First Design Approach",
    excerpt:
      "Why starting with accessibility constraints leads to better design solutions for everyone, not just users with disabilities...",
    date: "2024-01-01",
    readTime: "6 min read",
    category: "Accessibility",
  },
  {
    id: 4,
    title: "The Psychology of Color in UI Design",
    excerpt: "Understanding how color choices impact user behavior and emotional responses in digital interfaces...",
    date: "2023-12-20",
    readTime: "4 min read",
    category: "UI Design",
  },
  {
    id: 5,
    title: "Microinteractions That Matter",
    excerpt: "Small details that make a big difference in user experience and how to implement them effectively...",
    date: "2023-12-15",
    readTime: "6 min read",
    category: "UX Design",
  },
  {
    id: 6,
    title: "Design Thinking in Agile Environments",
    excerpt: "Integrating design thinking methodologies with agile development processes for better outcomes...",
    date: "2023-12-10",
    readTime: "8 min read",
    category: "Process",
  },
]

const categories = ["All", "Design Systems", "User Research", "Accessibility", "UI Design", "UX Design", "Process"]

export default function JournalPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredReflections = allReflections.filter((reflection) => {
    const matchesSearch =
      reflection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reflection.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || reflection.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Design Journal</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A collection of thoughts, insights, and learnings from my design journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary/80 transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReflections.map((reflection) => (
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
                  Read Article
                </CTAButton>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReflections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
