import express from "express"
import {
  getReflections,
  getReflectionById,
  createReflection,
  updateReflection,
  deleteReflection,
  summarizeReflection, // Added import for summarizeReflection
} from "../controllers/reflectionController"
import { authenticateAdmin } from "../middleware/auth"
import { validateReflection } from "../middleware/validation"

const router = express.Router()

// Public routes
router.get("/", getReflections)
router.get("/:id", getReflectionById)
router.post("/:id/summarize", summarizeReflection) // Added AI summarization endpoint

// Admin routes
router.post("/", authenticateAdmin, validateReflection, createReflection)
router.put("/:id", authenticateAdmin, validateReflection, updateReflection)
router.delete("/:id", authenticateAdmin, deleteReflection)

export default router
