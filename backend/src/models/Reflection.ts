import mongoose, { Schema } from "mongoose"
import type { IReflection } from "../types"

const ReflectionSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 300,
    },
    readTime: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
    aiSummary: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better search performance
ReflectionSchema.index({ title: "text", content: "text", tags: "text" })

export default mongoose.model<IReflection>("Reflection", ReflectionSchema)
