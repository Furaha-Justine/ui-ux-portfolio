import { google } from "googleapis"
import type { calendar_v3 } from "googleapis"

class GoogleCalendarService {
  private calendar: calendar_v3.Calendar | null = null

  constructor() {
    this.initializeCalendar()
  }

  private initializeCalendar() {
    try {
      const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CALENDAR_CLIENT_ID,
        process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
      )

      auth.setCredentials({
        refresh_token: process.env.GOOGLE_CALENDAR_REFRESH_TOKEN,
      })

      this.calendar = google.calendar({ version: "v3", auth })
    } catch (error) {
      console.error("Failed to initialize Google Calendar:", error)
    }
  }

  async createEvent(eventDetails: {
    summary: string
    description?: string
    start: {
      dateTime: Date
      timeZone: string
    }
    end: {
      dateTime: Date
      timeZone: string
    }
    attendees?: { email: string }[]
  }): Promise<string | null> {
    if (!this.calendar) {
      console.error("Google Calendar not initialized")
      return null
    }

    try {
      const event: calendar_v3.Schema$Event = {
        summary: eventDetails.summary,
        description: eventDetails.description,
        start: {
          dateTime: eventDetails.start.dateTime.toISOString(),
          timeZone: eventDetails.start.timeZone,
        },
        end: {
          dateTime: eventDetails.end.dateTime.toISOString(),
          timeZone: eventDetails.end.timeZone,
        },
        attendees: eventDetails.attendees,
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 }, // 1 day before
            { method: "popup", minutes: 30 }, // 30 minutes before
          ],
        },
      }

      const response = await this.calendar.events.insert({
        calendarId: "primary",
        requestBody: event,
        sendUpdates: "all",
      })

      return response.data.id || null
    } catch (error) {
      console.error("Failed to create Google Calendar event:", error)
      return null
    }
  }

  async updateEvent(
    eventId: string,
    eventDetails: {
      summary?: string
      description?: string
      start?: {
        dateTime: Date
        timeZone: string
      }
      end?: {
        dateTime: Date
        timeZone: string
      }
    },
  ): Promise<boolean> {
    if (!this.calendar) {
      console.error("Google Calendar not initialized")
      return false
    }

    try {
      const event: calendar_v3.Schema$Event = {}

      if (eventDetails.summary) event.summary = eventDetails.summary
      if (eventDetails.description) event.description = eventDetails.description
      if (eventDetails.start) {
        event.start = {
          dateTime: eventDetails.start.dateTime.toISOString(),
          timeZone: eventDetails.start.timeZone,
        }
      }
      if (eventDetails.end) {
        event.end = {
          dateTime: eventDetails.end.dateTime.toISOString(),
          timeZone: eventDetails.end.timeZone,
        }
      }

      await this.calendar.events.update({
        calendarId: "primary",
        eventId,
        requestBody: event,
        sendUpdates: "all",
      })

      return true
    } catch (error) {
      console.error("Failed to update Google Calendar event:", error)
      return false
    }
  }

  async deleteEvent(eventId: string): Promise<boolean> {
    if (!this.calendar) {
      console.error("Google Calendar not initialized")
      return false
    }

    try {
      await this.calendar.events.delete({
        calendarId: "primary",
        eventId,
        sendUpdates: "all",
      })

      return true
    } catch (error) {
      console.error("Failed to delete Google Calendar event:", error)
      return false
    }
  }
}

export const googleCalendarService = new GoogleCalendarService()
