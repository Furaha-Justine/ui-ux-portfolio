import { body, validationResult } from "express-validator"
import type { Request, Response, NextFunction } from "express"

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errors.array(),
    })
  }
  next()
}

export const validateContact = [
  body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("message").trim().isLength({ min: 10, max: 2000 }).withMessage("Message must be between 10 and 2000 characters"),
  handleValidationErrors,
]

export const validateAppointment = [
  body("name").trim().isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"),
  body("preferredDate").isISO8601().withMessage("Please provide a valid date"),
  body("preferredTime").trim().notEmpty().withMessage("Please provide a preferred time"),
  body("message").optional().trim().isLength({ max: 1000 }).withMessage("Message must not exceed 1000 characters"),
  handleValidationErrors,
]

export const validateReflection = [
  body("title").trim().isLength({ min: 5, max: 200 }).withMessage("Title must be between 5 and 200 characters"),
  body("content").trim().isLength({ min: 100 }).withMessage("Content must be at least 100 characters"),
  body("excerpt").trim().isLength({ min: 20, max: 300 }).withMessage("Excerpt must be between 20 and 300 characters"),
  body("readTime").trim().notEmpty().withMessage("Read time is required"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
  handleValidationErrors,
]
