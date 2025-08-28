"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CTAButton } from "@/components/cta-button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, MailOpen } from "lucide-react"

interface Message {
  _id: string
  name: string
  email: string
  message: string
  isRead: boolean
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    fetchMessages()
  }, [router])

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/admin/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (data.success) {
        setMessages(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (messageId: string) => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/admin/messages/${messageId}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      if (data.success) {
        setMessages((prev) => prev.map((msg) => (msg._id === messageId ? { ...msg, isRead: true } : msg)))
      }
    } catch (error) {
      console.error("Failed to mark message as read:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading messages...</p>
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
              <h1 className="text-2xl font-bold text-foreground">Contact Messages</h1>
              <p className="text-muted-foreground">Manage contact form submissions</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No messages yet</h3>
              <p className="text-muted-foreground">Contact form submissions will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message._id} className={`${!message.isRead ? "border-primary/50 bg-primary/5" : ""}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {message.isRead ? (
                        <MailOpen className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Mail className="w-5 h-5 text-primary" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{message.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!message.isRead && <Badge variant="default">New</Badge>}
                      <span className="text-sm text-muted-foreground">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4 leading-relaxed">{message.message}</p>
                  <div className="flex gap-2">
                    <CTAButton variant="primary" size="sm" href={`mailto:${message.email}`}>
                      Reply via Email
                    </CTAButton>
                    {!message.isRead && (
                      <CTAButton variant="secondary" size="sm" onClick={() => markAsRead(message._id)}>
                        Mark as Read
                      </CTAButton>
                    )}
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
