import mongoose, { Schema } from "mongoose"
import type { IChatMessage } from "../types"

const ChatMessageSchema: Schema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    response: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// TTL index to automatically delete old chat messages after 30 days
ChatMessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 })

export default mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema)
