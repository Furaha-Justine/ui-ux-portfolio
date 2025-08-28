"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CTAButton } from "@/components/cta-button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Plus, Edit, Trash2 } from "lucide-react"

interface Reflection {
  _id: string
  title: string
  excerpt: string
  readTime: string
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminReflectionsPage() {
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    // Mock data for now - in real implementation, fetch from API
    setTimeout(() => {
      setReflections([
        {
          _id: "1",
          title: "The Evolution of Design Systems",
          excerpt: "Exploring how design systems have transformed the way we approach scalable design solutions...",
          readTime: "5 min read",
          tags: ["Design Systems", "UI/UX", "Scalability"],
          isPublished: true,
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z",
        },
        {
          _id: "2",
          title: "User Research in Remote Settings",
          excerpt: "Adapting user research methodologies for remote work environments and distributed teams...",
          readTime: "7 min read",
          tags: ["User Research", "Remote Work", "Methodology"],
          isPublished: true,
          createdAt: "2024-01-08T14:30:00Z",
          updatedAt: "2024-01-08T14:30:00Z",
        },
        {
          _id: "3",
          title: "Draft: Accessibility in Modern Design",
          excerpt: "Why accessibility should be at the forefront of every design decision...",
          readTime: "6 min read",
          tags: ["Accessibility", "Inclusive Design"],
          isPublished: false,
          createdAt: "2024-01-01T09:00:00Z",
          updatedAt: "2024-01-01T09:00:00Z",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [router])

  const deleteReflection = (reflectionId: string) => {
    if (confirm("Are you sure you want to delete this reflection?")) {
      setReflections((prev) => prev.filter((reflection) => reflection._id !== reflectionId))
    }
  }

  const togglePublishStatus = (reflectionId: string) => {
    setReflections((prev) =>
      prev.map((reflection) =>
        reflection._id === reflectionId ? { ...reflection, isPublished: !reflection.isPublished } : reflection,
      ),
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading reflections...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <CTAButton variant="secondary" size="sm" href="/admin/dashboard" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </CTAButton>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Reflections</h1>
                <p className="text-muted-foreground">Manage your blog posts and reflections</p>
              </div>
            </div>
            <CTAButton variant="primary" size="sm" href="/admin/reflections/new">
              <Plus className="w-4 h-4 mr-2" />
              New Reflection
            </CTAButton>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {reflections.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No reflections yet</h3>
              <p className="text-muted-foreground mb-4">Start writing your first reflection</p>
              <CTAButton variant="primary" size="sm" href="/admin/reflections/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Reflection
              </CTAButton>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reflections.map((reflection) => (
              <Card key={reflection._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{reflection.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{reflection.readTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={reflection.isPublished ? "default" : "secondary"}>
                        {reflection.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(reflection.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{reflection.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {reflection.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <CTAButton variant="primary" size="sm" href={`/admin/reflections/${reflection._id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </CTAButton>
                    <CTAButton variant="secondary" size="sm" onClick={() => togglePublishStatus(reflection._id)}>
                      {reflection.isPublished ? "Unpublish" : "Publish"}
                    </CTAButton>
                    <CTAButton
                      variant="secondary"
                      size="sm"
                      onClick={() => deleteReflection(reflection._id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </CTAButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
