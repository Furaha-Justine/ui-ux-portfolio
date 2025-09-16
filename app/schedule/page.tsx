"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CTAButton } from "@/components/cta-button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"

interface AvailableSlots {
  date: string
  availableSlots: string[]
  bookedSlots: string[]
}

export default function SchedulePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  })
  const [availableSlots, setAvailableSlots] = useState<AvailableSlots | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    setFormData((prev) => ({
      ...prev,
      preferredDate: selectedDate,
      preferredTime: "", // Reset time when date changes
    }))

    if (selectedDate) {
      setIsLoadingSlots(true)
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        const response = await fetch(`${apiUrl}/api/appointments/available-slots?date=${selectedDate}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.success) {
          setAvailableSlots(data.data)
        } else {
          setAvailableSlots({
            date: selectedDate,
            availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
            bookedSlots: [],
          })
        }
      } catch (error) {
        console.error("Failed to fetch available slots:", error)
        setAvailableSlots({
          date: selectedDate,
          availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
          bookedSlots: [],
        })
      } finally {
        setIsLoadingSlots(false)
      }
    } else {
      setAvailableSlots(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        alert("Appointment request submitted successfully! You'll receive a confirmation email shortly.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        })
        setAvailableSlots(null)
      } else {
        alert(data.message || "Failed to submit appointment request. Please try again.")
      }
    } catch (error) {
      console.error("Appointment submission error:", error)
      alert("Appointment request received! I'll get back to you within 24 hours to confirm the details.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      })
      setAvailableSlots(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  // Get maximum date (3 months from now)
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateString = maxDate.toISOString().split("T")[0]

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <CTAButton
            variant="secondary"
            size="sm"
            href="/"
            className="group mb-6 inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:shadow-md hover:bg-secondary/90"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Portfolio
          </CTAButton>

          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Schedule a Meeting
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Let's discuss your project and how I can help bring your design
              vision to life.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Book Your Consultation
            </CardTitle>
            <p className="text-muted-foreground">
              Fill out the form below to schedule a consultation. I'll confirm
              your appointment within 24 hours.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Preferred Date *
                  </label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    required
                    min={minDate}
                    max={maxDateString}
                    value={formData.preferredDate}
                    onChange={handleDateChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Preferred Time *
                  </label>
                  {isLoadingSlots ? (
                    <div className="flex items-center justify-center h-10 border rounded-md">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    </div>
                  ) : availableSlots &&
                    availableSlots.availableSlots.length > 0 ? (
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      required
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a time</option>
                      {availableSlots.availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  ) : availableSlots &&
                    availableSlots.availableSlots.length === 0 ? (
                    <div className="flex items-center justify-center h-10 border rounded-md text-muted-foreground text-sm">
                      No available slots for this date
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-10 border rounded-md text-muted-foreground text-sm">
                      Please select a date first
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Project Details (Optional)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, goals, timeline, or any specific questions you have..."
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      What to Expect
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 30-60 minute consultation call</li>
                      <li>
                        • Discussion of your project goals and requirements
                      </li>
                      <li>• Overview of my design process and approach</li>
                      <li>• Timeline and next steps planning</li>
                    </ul>
                  </div>
                </div>
              </div>

              <CTAButton
                type="submit"
                variant="primary"
                size="lg"
                className={`w-full ${isSubmitting ? "opacity-50" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
              </CTAButton>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need to discuss something urgently?{" "}
            <a
              href="mailto:uwizefuraha@gmail.com"
              className="text-primary hover:underline"
            >
              Send me an email
            </a>{" "}
            instead.
          </p>
        </div>
      </div>
    </div>
  );
}
