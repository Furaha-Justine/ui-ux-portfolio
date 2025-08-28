import type { Request, Response } from "express"
import Reflection from "../models/Reflection"
import type { ApiResponse } from "../types"
import { aiService } from "../services/aiService"

/**
 * @swagger
 * components:
 *   schemas:
 *     Reflection:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - excerpt
 *         - readTime
 *       properties:
 *         title:
 *           type: string
 *           description: The reflection title
 *         content:
 *           type: string
 *           description: The full reflection content
 *         excerpt:
 *           type: string
 *           description: Short excerpt of the reflection
 *         readTime:
 *           type: string
 *           description: Estimated read time
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the reflection
 *         isPublished:
 *           type: boolean
 *           description: Whether the reflection is published
 *         aiSummary:
 *           type: string
 *           description: AI generated summary of the reflection
 */

/**
 * @swagger
 * /api/reflections:
 *   get:
 *     summary: Get all published reflections
 *     tags: [Reflections]
 *     responses:
 *       200:
 *         description: List of published reflections
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reflection'
 */
export const getReflections = async (req: Request, res: Response) => {
  try {
    const reflections = await Reflection.find({ isPublished: true }).select("-content").sort({ createdAt: -1 })

    const response: ApiResponse = {
      success: true,
      data: reflections,
    }

    res.json(response)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reflections",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/reflections/{id}:
 *   get:
 *     summary: Get a specific reflection by ID
 *     tags: [Reflections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reflection ID
 *     responses:
 *       200:
 *         description: The reflection data
 *       404:
 *         description: Reflection not found
 */
export const getReflectionById = async (req: Request, res: Response) => {
  try {
    const reflection = await Reflection.findOne({
      _id: req.params.id,
      isPublished: true,
    })

    if (!reflection) {
      return res.status(404).json({
        success: false,
        message: "Reflection not found",
      })
    }

    res.json({
      success: true,
      data: reflection,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reflection",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/reflections:
 *   post:
 *     summary: Create a new reflection (Admin only)
 *     tags: [Reflections]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reflection'
 *     responses:
 *       201:
 *         description: Reflection created successfully
 *       401:
 *         description: Unauthorized
 */
export const createReflection = async (req: Request, res: Response) => {
  try {
    const reflection = new Reflection(req.body)
    await reflection.save()

    res.status(201).json({
      success: true,
      data: reflection,
      message: "Reflection created successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating reflection",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/reflections/{id}:
 *   put:
 *     summary: Update a reflection (Admin only)
 *     tags: [Reflections]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reflection'
 *     responses:
 *       200:
 *         description: Reflection updated successfully
 *       404:
 *         description: Reflection not found
 */
export const updateReflection = async (req: Request, res: Response) => {
  try {
    const reflection = await Reflection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!reflection) {
      return res.status(404).json({
        success: false,
        message: "Reflection not found",
      })
    }

    res.json({
      success: true,
      data: reflection,
      message: "Reflection updated successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating reflection",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/reflections/{id}:
 *   delete:
 *     summary: Delete a reflection (Admin only)
 *     tags: [Reflections]
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
 *         description: Reflection deleted successfully
 *       404:
 *         description: Reflection not found
 */
export const deleteReflection = async (req: Request, res: Response) => {
  try {
    const reflection = await Reflection.findByIdAndDelete(req.params.id)

    if (!reflection) {
      return res.status(404).json({
        success: false,
        message: "Reflection not found",
      })
    }

    res.json({
      success: true,
      message: "Reflection deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting reflection",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/reflections/{id}/summarize:
 *   post:
 *     summary: Generate AI summary for a reflection
 *     tags: [Reflections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The reflection ID
 *     responses:
 *       200:
 *         description: AI summary generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     summary:
 *                       type: string
 *       404:
 *         description: Reflection not found
 *       500:
 *         description: Failed to generate summary
 */
export const summarizeReflection = async (req: Request, res: Response) => {
  try {
    const reflection = await Reflection.findOne({
      _id: req.params.id,
      isPublished: true,
    })

    if (!reflection) {
      return res.status(404).json({
        success: false,
        message: "Reflection not found",
      })
    }

    // Check if summary already exists
    if (reflection.aiSummary) {
      return res.json({
        success: true,
        data: {
          summary: reflection.aiSummary,
        },
      })
    }

    // Generate new summary
    const summary = await aiService.summarizeReflection(reflection.content, reflection.title)

    // Save the summary
    reflection.aiSummary = summary
    await reflection.save()

    res.json({
      success: true,
      data: {
        summary,
      },
    })
  } catch (error) {
    console.error("Summarization error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to generate summary",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
