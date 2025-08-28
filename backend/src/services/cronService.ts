import cron from "node-cron"
import Appointment from "../models/Appointment"
import { sendDailyItinerary } from "./emailService"
import { aiService } from "./aiService"

class CronService {
  startDailyItineraryJob() {
    // Run every day at 8:00 AM
    cron.schedule("0 8 * * *", async () => {
      try {
        console.log("Running daily itinerary job...")

        const today = new Date()
        const startOfDay = new Date(today.setHours(0, 0, 0, 0))
        const endOfDay = new Date(today.setHours(23, 59, 59, 999))

        // Get today's confirmed appointments
        const todaysAppointments = await Appointment.find({
          preferredDate: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
          status: "confirmed",
        }).sort({ preferredTime: 1 })

        if (todaysAppointments.length > 0) {
          // Generate AI summary
          const aiSummary = await aiService.generateDailyItinerarySummary(todaysAppointments)

          // Send daily itinerary email
          await sendDailyItinerary(todaysAppointments)

          console.log(`Daily itinerary sent for ${todaysAppointments.length} appointments`)
        } else {
          console.log("No appointments for today")
        }
      } catch (error) {
        console.error("Daily itinerary job failed:", error)
      }
    })

    console.log("Daily itinerary cron job started")
  }

  startAppointmentReminders() {
    // Run every hour to check for appointment reminders
    cron.schedule("0 * * * *", async () => {
      try {
        const now = new Date()
        const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000)

        // Find appointments that are 24 hours away
        const upcomingAppointments = await Appointment.find({
          preferredDate: {
            $gte: new Date(in24Hours.setHours(0, 0, 0, 0)),
            $lte: new Date(in24Hours.setHours(23, 59, 59, 999)),
          },
          status: "confirmed",
        })

        // Send reminder emails (implementation would go here)
        console.log(`Found ${upcomingAppointments.length} appointments for reminder`)
      } catch (error) {
        console.error("Appointment reminder job failed:", error)
      }
    })

    console.log("Appointment reminder cron job started")
  }
}

export const cronService = new CronService()
