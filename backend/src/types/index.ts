import type { Document } from "mongoose"

export interface IReflection extends Document {
  title: string
  content: string
  excerpt: string
  readTime: string
  tags: string[]
  isPublished: boolean
  aiSummary?: string
  createdAt: Date
  updatedAt: Date
}

export interface IMessage extends Document {
  name: string
  email: string
  message: string
  isRead: boolean
  createdAt: Date
}

export interface IAppointment extends Document {
  name: string
  email: string
  phone?: string
  preferredDate: Date
  preferredTime: string
  message: string
  status: "pending" | "confirmed" | "cancelled"
  googleCalendarEventId?: string
  createdAt: Date
}

export interface IChatMessage extends Document {
  sessionId: string
  message: string
  response: string
  createdAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
