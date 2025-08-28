import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export class AIService {
  private systemPrompt =
    `You are an AI assistant for Uwize Furaha's portfolio website. You are knowledgeable about UI/UX design, her work, and can help visitors with:

1. Information about Uwize's design experience and skills
2. Details about her projects and design process
3. General UI/UX design questions and advice
4. Scheduling meetings or consultations
5. Portfolio navigation and content

Keep responses professional, helpful, and concise. If asked about specific project details not provided, politely redirect to the portfolio sections or suggest contacting Uwize directly.

Key information about Uwize:
- UI/UX Designer with 5+ years of experience
- Specializes in user research, wireframing, prototyping, and design systems
- Works with startups to enterprises across various industries
- Passionate about accessible and user-centered design
- Available for consultations and new projects`

  async generateChatResponse(messages: ChatMessage[]): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: this.systemPrompt }, ...messages],
        max_tokens: 500,
        temperature: 0.7,
      })

      return (
        completion.choices[0]?.message?.content ||
        "I apologize, but I encountered an issue generating a response. Please try again."
      )
    } catch (error) {
      console.error("OpenAI API error:", error)
      throw new Error("Failed to generate AI response")
    }
  }

  async summarizeReflection(content: string, title: string): Promise<string> {
    try {
      const prompt = `Please provide a concise summary of this design reflection titled "${title}". Focus on the key insights, lessons learned, and main points. Keep it under 150 words and make it engaging for readers interested in UI/UX design.

Content:
${content}`

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.5,
      })

      return completion.choices[0]?.message?.content || "Unable to generate summary at this time."
    } catch (error) {
      console.error("OpenAI API error for summarization:", error)
      throw new Error("Failed to generate AI summary")
    }
  }

  async generateDailyItinerarySummary(appointments: any[]): Promise<string> {
    if (appointments.length === 0) {
      return "No appointments scheduled for today. Great day to focus on personal projects!"
    }

    const appointmentDetails = appointments
      .map((apt) => `${apt.preferredTime} - ${apt.name} (${apt.email}) - ${apt.message || "General consultation"}`)
      .join("\n")

    try {
      const prompt = `Create a brief, professional daily itinerary summary for a UI/UX designer based on these appointments:

${appointmentDetails}

Include helpful reminders and keep it motivational and organized.`

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.6,
      })

      return completion.choices[0]?.message?.content || "Your appointments are ready for today!"
    } catch (error) {
      console.error("OpenAI API error for itinerary:", error)
      return "Your appointments are scheduled and ready for today!"
    }
  }
}

export const aiService = new AIService()
