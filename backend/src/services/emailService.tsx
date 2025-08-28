import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

// Configure email transporter (using SendGrid SMTP)
const transporter = nodemailer.createTransporter({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
})

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  const mailOptions = {
    from: options.from || `"Portfolio Website" <noreply@uwizefuraha.com>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Email sent successfully to ${options.to}`)
  } catch (error) {
    console.error("Email sending failed:", error)
    throw error
  }
}

export const sendDailyItinerary = async (appointments: any[]): Promise<void> => {
  if (appointments.length === 0) return

  const today = new Date().toLocaleDateString()

  const appointmentsList = appointments
    .map(
      (apt) => `
    <div style="margin-bottom: 15px; padding: 10px; border-left: 3px solid #ff6f61;">
      <strong>${apt.name}</strong> (${apt.email})<br>
      <strong>Time:</strong> ${apt.preferredTime}<br>
      <strong>Message:</strong> ${apt.message || "No message provided"}<br>
      <strong>Status:</strong> ${apt.status}
    </div>
  `,
    )
    .join("")

  await sendEmail({
    to: process.env.ADMIN_EMAIL as string,
    subject: `Daily Itinerary - ${today}`,
    html: `
      <h2>Your Appointments for ${today}</h2>
      <p>You have ${appointments.length} appointment(s) scheduled:</p>
      ${appointmentsList}
      <p>Have a great day!</p>
    `,
  })
}
