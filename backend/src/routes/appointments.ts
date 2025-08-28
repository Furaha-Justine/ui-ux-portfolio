import express from "express"
import {
  scheduleAppointment,
  getAppointments,
  updateAppointmentStatus,
  getAvailableSlots,
} from "../controllers/appointmentController"
import { authenticateAdmin } from "../middleware/auth"
import { validateAppointment } from "../middleware/validation"

const router = express.Router()

// Public routes
router.post("/", validateAppointment, scheduleAppointment)
router.get("/available-slots", getAvailableSlots)

// Admin routes
router.get("/admin/appointments", authenticateAdmin, getAppointments)
router.patch("/admin/appointments/:id/status", authenticateAdmin, updateAppointmentStatus)

export default router
