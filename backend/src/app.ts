import express from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import swaggerUi from "swagger-ui-express"
import { specs } from "./config/swagger"

// Import routes
import reflectionRoutes from "./routes/reflections"
import contactRoutes from "./routes/contact"
import authRoutes from "./routes/auth"
import chatRoutes from "./routes/chat"
import appointmentRoutes from "./routes/appointments" // Added appointment routes

const app = express()

// Security middleware
app.use(helmet())

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100"), // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
})

app.use("/api/", limiter)

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// API Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Portfolio API Documentation",
  }),
)

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
  })
})

// API routes
app.use("/api/reflections", reflectionRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/appointments", appointmentRoutes) // Added appointment routes

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  })
})

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global error handler:", error)

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  })
})

export default app
