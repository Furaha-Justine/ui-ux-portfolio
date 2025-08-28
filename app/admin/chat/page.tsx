"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CTAButton } from "@/components/cta-button"
import { ArrowLeft, MessageSquare, Eye } from "lucide-react"

interface ChatSession {
  _id: string
  messageCount: number
  lastMessage: string
  lastResponse: string
  createdAt: string
  updatedAt: string
}

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    fetchChatSessions()
  }, [router])

  const fetchChatSessions = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/admin/sessions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (data.success) {
        setSessions(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch chat sessions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading chat sessions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <CTAButton variant="secondary" size="sm" href="/admin/dashboard" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </CTAButton>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Chat Sessions</h1>
              <p className="text-muted-foreground">Review AI assistant conversations</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sessions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No chat sessions yet</h3>
              <p className="text-muted-foreground">AI chat conversations will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">Chat Session</CardTitle>
                        <p className="text-sm text-muted-foreground">{session.messageCount} messages</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Started: {new Date(session.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last activity: {new Date(session.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-1">Last message:</p>
                    <p className="text-sm text-muted-foreground mb-2">"{session.lastMessage}"</p>
                    <p className="text-sm font-medium text-foreground mb-1">AI response:</p>
                    <p className="text-sm text-muted-foreground">"{session.lastResponse}"</p>
                  </div>

                  <CTAButton variant="primary" size="sm" href={`/admin/chat/${session._id}`}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Conversation
                  </CTAButton>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
