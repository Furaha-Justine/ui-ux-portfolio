"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CTAButton } from "@/components/cta-button"
import { SectionContainer } from "@/components/section-container"
import { Mail, Calendar, CheckCircle, Send } from "lucide-react"

// Declare ReCAPTCHA types
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load reCAPTCHA script only if site key is available
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      const script = document.createElement("script")
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
      script.async = true
      script.defer = true
      script.onload = () => {
        setRecaptchaLoaded(true)
      }
      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let recaptchaToken = ""

      // Get reCAPTCHA token if available
      if (recaptchaLoaded && window.grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        try {
          recaptchaToken = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
            action: "contact_form",
          })
        } catch (recaptchaError) {
          console.error("reCAPTCHA error:", recaptchaError)
        }
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        alert("Thank you for your message! I'll get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
      } else {
        alert(data.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      alert("Failed to send message. Please try again or contact me directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <SectionContainer
      ref={sectionRef}
      id="contact"
      className="bg-gradient-to-br from-background to-secondary/5"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 animate-fade-in-up">
            Let's Work Together
          </h2>
          <p
            className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Have a project in mind or want to discuss design opportunities? I'd
            love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="contact-card hover:shadow-elegant-hover transition-all-smooth opacity-100 transform translate-y-0 border-0 shadow-elegant">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Mail className="w-6 h-6 text-primary" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="transition-all-smooth focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="transition-all-smooth focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or how I can help you..."
                    className="transition-all-smooth focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                  <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <p>
                      This form is protected by reCAPTCHA and the Google Privacy
                      Policy and Terms of Service apply.
                    </p>
                  </div>
                )}
                <CTAButton
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-primary/90 hover:scale-105"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </CTAButton>
              </form>
            </CardContent>
          </Card>

          <Card className="contact-card hover:shadow-elegant-hover transition-all-smooth opacity-100 transform translate-y-0 border-0 shadow-elegant">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Calendar className="w-6 h-6 text-secondary" />
                Schedule a Meeting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-8 text-lg">
                Prefer to talk directly? Schedule a consultation call to discuss
                your project in detail.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    30-60 minute consultation
                  </span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">
                    Project discussion & planning
                  </span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Timeline & next steps</span>
                </div>
              </div>

              <CTAButton
                href="/schedule"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90 hover:scale-105 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Appointment
              </CTAButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionContainer>
  );
}
