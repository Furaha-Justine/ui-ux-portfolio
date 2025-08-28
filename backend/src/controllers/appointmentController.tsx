import type { Request, Response } from "express"
import Appointment from "../models/Appointment"
import { sendEmail } from "../services/emailService"
import { googleCalendarService } from "../services/googleCalendarService"

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - preferredDate
 *         - preferredTime
 *       properties:
 *         name:
 *           type: string
 *           description: Client's name
 *         email:
 *           type: string
 *           format: email
 *           description: Client's email
 *         phone:
 *           type: string
 *           description: Client's phone number (optional)
 *         preferredDate:
 *           type: string
 *           format: date
 *           description: Preferred appointment date
 *         preferredTime:
 *           type: string
 *           description: Preferred appointment time
 *         message:
 *           type: string
 *           description: Additional message or requirements
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Schedule a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment scheduled successfully
 *       400:
 *         description: Validation error
 */
export const scheduleAppointment = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, preferredDate, preferredTime, message } = req.body

    // Validate date is in the future
    const appointmentDate = new Date(preferredDate)
    if (appointmentDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Appointment date must be in the future",
      })
    }

    // Create appointment
    const appointment = new Appointment({
      name,
      email,
      phone,
      preferredDate: appointmentDate,
      preferredTime,
      message,
      status: "pending",
    })

    await appointment.save()

    // Send confirmation email to client
    try {
      await sendEmail({
        to: email,
        subject: "Appointment Request Received - Uwize Furaha",
        html: `
          <h2>Thank you for your appointment request!</h2>
          <p>Hi ${name},</p>
          <p>I've received your appointment request with the following details:</p>
          <ul>
            <li><strong>Date:</strong> ${appointmentDate.toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${preferredTime}</li>
            ${message ? `<li><strong>Message:</strong> ${message}</li>` : ""}
          </ul>
          <p>I'll review your request and get back to you within 24 hours to confirm the appointment.</p>
          <p>Best regards,<br>Uwize Furaha</p>
        `,
      })
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
    }

    // Send notification email to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL as string,
        subject: `New Appointment Request from ${name}`,
        html: `
          <h2>New Appointment Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          <p><strong>Preferred Date:</strong> ${appointmentDate.toLocaleDateString()}</p>
          <p><strong>Preferred Time:</strong> ${preferredTime}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
          <p><strong>Requested:</strong> ${new Date().toLocaleString()}</p>
          <p><a href="${process.env.FRONTEND_URL}/admin/appointments">View in Admin Dashboard</a></p>
        `,
      })
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError)
    }

    res.status(201).json({
      success: true,
      message: "Appointment request submitted successfully. You'll receive a confirmation email shortly.",
      data: {
        id: appointment._id,
        status: appointment.status,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error scheduling appointment",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/admin/appointments:
 *   get:
 *     summary: Get all appointments (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 */
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 })

    res.json({
      success: true,
      data: appointments,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

/**
 * @swagger
 * /api/admin/appointments/{id}/status:
 *   patch:
 *     summary: Update appointment status (Admin only)
 *     tags: [Admin]
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
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled]
 *     responses:
 *       200:
 *         description: Appointment status updated
 */
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const appointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true })

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      })
    }

    // Send status update email to client
    try {
      const statusMessage =
        status === "confirmed"
          ? "Your appointment has been confirmed!"
          : status === "cancelled"
            ? "Your appointment has been cancelled."
            : "Your appointment status has been updated."

      await sendEmail({
        to: appointment.email,
        subject: `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)} - Uwize Furaha`,
        html: `
          <h2>${statusMessage}</h2>
          <p>Hi ${appointment.name},</p>
          <p>Your appointment scheduled for ${appointment.preferredDate.toLocaleDateString()} at ${appointment.preferredTime} has been <strong>${status}</strong>.</p>
          ${
            status === "confirmed"
              ? `<p>I look forward to meeting with you! If you need to reschedule or have any questions, please don't hesitate to reach out.</p>`
              : status === "cancelled"
                ? `<p>If you'd like to reschedule, please feel free to submit a new appointment request.</p>`
                : ""
          }
          <p>Best regards,<br>Uwize Furaha</p>
        `,
      })

      // If confirmed, try to add to Google Calendar
      if (status === "confirmed") {
        try {
          const calendarEventId = await googleCalendarService.createEvent({
            summary: `Meeting with ${appointment.name}`,
            description: appointment.message || "Design consultation meeting",
            start: {
              dateTime: new Date(
                `${appointment.preferredDate.toISOString().split("T")[0]}T${convertTimeToISO(appointment.preferredTime)}`,
              ),
              timeZone: "America/New_York", // Adjust timezone as needed
            },
            end: {
              dateTime: new Date(
                new Date(
                  `${appointment.preferredDate.toISOString().split("T")[0]}T${convertTimeToISO(appointment.preferredTime)}`,
                ).getTime() +
                  60 * 60 * 1000,
              ), // 1 hour duration
              timeZone: "America/New_York",
            },
            attendees: [{ email: appointment.email }],
          })

          if (calendarEventId) {
            appointment.googleCalendarEventId = calendarEventId
            await appointment.save()
          }
        } catch (calendarError) {
          console.error("Failed to create Google Calendar event:", calendarError)
        }
      }
    } catch (emailError) {
      console.error("Failed to send status update email:", emailError)
    }

    res.json({
      success: true,
      data: appointment,
      message: "Appointment status updated successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating appointment status",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

// Helper function to convert time string to ISO format
function convertTimeToISO(timeString: string): string {
  // Convert "2:00 PM" to "14:00:00"
  const [time, period] = timeString.split(" ")
  const [hours, minutes] = time.split(":")
  let hour24 = Number.parseInt(hours)

  if (period === "PM" && hour24 !== 12) {
    hour24 += 12
  } else if (period === "AM" && hour24 === 12) {
    hour24 = 0
  }

  return `${hour24.toString().padStart(2, "0")}:${minutes}:00`
}

/**
 * @swagger
 * /api/appointments/available-slots:
 *   get:
 *     summary: Get available appointment slots
 *     tags: [Appointments]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to check availability for
 *     responses:
 *       200:
 *         description: Available time slots
 */
export const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { date } = req.query

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date parameter is required",
      })
    }

    const requestedDate = new Date(date as string)
    const startOfDay = new Date(requestedDate.setHours(0, 0, 0, 0))
    const endOfDay = new Date(requestedDate.setHours(23, 59, 59, 999))

    // Get existing appointments for the date
    const existingAppointments = await Appointment.find({
      preferredDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: { $in: ["pending", "confirmed"] },
    })

    // Define available time slots (9 AM to 5 PM, hourly)
    const allSlots = [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
    ]

    // Filter out booked slots
    const bookedSlots = existingAppointments.map((apt) => apt.preferredTime)
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot))

    res.json({
      success: true,
      data: {
        date: date,
        availableSlots,
        bookedSlots,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching available slots",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
