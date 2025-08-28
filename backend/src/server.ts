import dotenv from "dotenv"
import app from "./app"
import connectDB from "./config/database"
import { cronService } from "./services/cronService"

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

// Start cron jobs
cronService.startDailyItineraryJob()
cronService.startAppointmentReminders()

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`)
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`)
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: any) => {
  console.error("Unhandled Promise Rejection:", err)
  process.exit(1)
})

// Handle uncaught exceptions
process.on("uncaughtException", (err: any) => {
  console.error("Uncaught Exception:", err)
  process.exit(1)
})
