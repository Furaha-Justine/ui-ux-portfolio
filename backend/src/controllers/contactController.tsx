import type { Request, Response } from "express"
import Message from "../models/Message"
import { sendEmail } from "../services/emailService"

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Sender's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Sender's email
 *               message:
 *                 type: string
 *                 description: The message content
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Validation error
 */
export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body

    // Save message to database
    const newMessage = new Message({
      name,
      email,
      message,
    })

    await newMessage.save()

    // Send email notification to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL as string,
        subject: `New Contact Message from ${name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
        `,
      })
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError)
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully. I'll get back to you soon!",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/admin/messages:
 *   get:
 *     summary: Get all contact messages (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contact messages
 */
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })

    res.json({
      success: true,
      data: messages,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/admin/messages/{id}/read:
 *   patch:
 *     summary: Mark message as read (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message marked as read
 */
export const markMessageAsRead = async (req: Request, res: Response) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      })
    }

    res.json({
      success: true,
      data: message,
      message: "Message marked as read",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating message",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
