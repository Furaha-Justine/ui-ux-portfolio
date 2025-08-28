import express from "express"
import { sendContactMessage, getMessages, markMessageAsRead } from "../controllers/contactController"
import { authenticateAdmin } from "../middleware/auth"
import { validateContact } from "../middleware/validation"

const router = express.Router()

// Public route
router.post("/", validateContact, sendContactMessage)

// Admin routes
router.get("/admin/messages", authenticateAdmin, getMessages)
router.patch("/admin/messages/:id/read", authenticateAdmin, markMessageAsRead)

export default router
