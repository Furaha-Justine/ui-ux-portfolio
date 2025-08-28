"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CTAButton } from "@/components/cta-button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

interface Appointment {
  _id: string
  name: string
  email: string
  phone?: string
  preferredDate: string
  preferredTime: string
  message: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
}

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin")
      return
    }

    // Mock data for now - in real implementation, fetch from API
    setTimeout(() => {
      setAppointments([
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          preferredDate: "2024-02-15",
          preferredTime: "2:00 PM",
          message: "I'd like to discuss a potential project collaboration.",
          status: "pending",
          createdAt: "2024-02-10T10:00:00Z",
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          preferredDate: "2024-02-20",
          preferredTime: "10:00 AM",
          message: "Interested in your design consultation services.",
          status: "confirmed",
          createdAt: "2024-02-08T14:30:00Z",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [router])

  const updateAppointmentStatus = (appointmentId: string, newStatus: "confirmed" | "cancelled") => {
    setAppointments((prev) => prev.map((apt) => (apt._id === appointmentId ? { ...apt, status: newStatus } : apt)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading appointments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <CTAButton variant="secondary" size="sm" href="/admin/dashboard" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </CTAButton>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Appointments</h1>
              <p className="text-muted-foreground">Manage meeting requests and scheduling</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No appointments yet</h3>
              <p className="text-muted-foreground">Meeting requests will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{appointment.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{appointment.email}</p>
                        {appointment.phone && <p className="text-sm text-muted-foreground">{appointment.phone}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(appointment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{new Date(appointment.preferredDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.preferredTime}</span>
                    </div>
                  </div>

                  {appointment.message && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-1">Message:</p>
                      <p className="text-sm text-muted-foreground">{appointment.message}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <CTAButton variant="primary" size="sm" href={`mailto:${appointment.email}`}>
                      Email Client
                    </CTAButton>
                    {appointment.status === "pending" && (
                      <>
                        <CTAButton
                          variant="secondary"
                          size="sm"
                          onClick={() => updateAppointmentStatus(appointment._id, "confirmed")}
                        >
                          Confirm
                        </CTAButton>
                        <CTAButton
                          variant="secondary"
                          size="sm"
                          onClick={() => updateAppointmentStatus(appointment._id, "cancelled")}
                        >
                          Cancel
                        </CTAButton>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
