import express from "express"
import { sendChatMessage, getChatSessions, getChatSession } from "../controllers/chatController"
import { authenticateAdmin } from "../middleware/auth"
import { body } from "express-validator"
import { handleValidationErrors } from "../middleware/validation"

const router = express.Router()

// Validation for chat messages
const validateChatMessage = [
  body("message").trim().isLength({ min: 1, max: 1000 }).withMessage("Message must be between 1 and 1000 characters"),
  body("sessionId").optional().isUUID().withMessage("Session ID must be a valid UUID"),
  handleValidationErrors,
]

// Public routes
router.post("/", validateChatMessage, sendChatMessage)

// Admin routes
router.get("/admin/sessions", authenticateAdmin, getChatSessions)
router.get("/admin/sessions/:sessionId", authenticateAdmin, getChatSession)

export default router
