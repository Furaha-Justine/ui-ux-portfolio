import type { Request, Response } from "express"
import ChatMessage from "../models/ChatMessage"
import { aiService } from "../services/aiService"
import { v4 as uuidv4 } from "uuid"

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatRequest:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: User's chat message
 *         sessionId:
 *           type: string
 *           description: Optional session ID for conversation continuity
 *     ChatResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             response:
 *               type: string
 *             sessionId:
 *               type: string
 */

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Send a message to the AI assistant
 *     tags: [AI Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *     responses:
 *       200:
 *         description: AI response generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
export const sendChatMessage = async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      })
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long. Please keep it under 1000 characters.",
      })
    }

    const currentSessionId = sessionId || uuidv4()

    // Get recent conversation history for context
    const recentMessages = await ChatMessage.find({ sessionId: currentSessionId }).sort({ createdAt: -1 }).limit(10)

    // Prepare conversation context
    const conversationHistory = recentMessages.reverse().flatMap((msg) => [
      { role: "user" as const, content: msg.message },
      { role: "assistant" as const, content: msg.response },
    ])

    // Add current message
    const messages = [...conversationHistory, { role: "user" as const, content: message }]

    // Generate AI response
    const aiResponse = await aiService.generateChatResponse(messages)

    // Save the conversation
    const chatMessage = new ChatMessage({
      sessionId: currentSessionId,
      message: message.trim(),
      response: aiResponse,
    })

    await chatMessage.save()

    res.json({
      success: true,
      data: {
        response: aiResponse,
        sessionId: currentSessionId,
      },
    })
  } catch (error) {
    console.error("Chat error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to process your message. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/admin/chat/sessions:
 *   get:
 *     summary: Get chat session summaries (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of chat sessions
 */
export const getChatSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await ChatMessage.aggregate([
      {
        $group: {
          _id: "$sessionId",
          messageCount: { $sum: 1 },
          lastMessage: { $last: "$message" },
          lastResponse: { $last: "$response" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $last: "$createdAt" },
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
      {
        $limit: 50,
      },
    ])

    res.json({
      success: true,
      data: sessions,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching chat sessions",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/admin/chat/sessions/{sessionId}:
 *   get:
 *     summary: Get full chat session (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Full chat session
 */
export const getChatSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params

    const messages = await ChatMessage.find({ sessionId }).sort({ createdAt: 1 })

    if (messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Chat session not found",
      })
    }

    res.json({
      success: true,
      data: {
        sessionId,
        messages,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching chat session",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
