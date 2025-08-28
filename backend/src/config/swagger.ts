import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API",
      version: "1.0.0",
      description: "API for Uwize Furaha's Portfolio Website",
      contact: {
        name: "Uwize Furaha",
        email: "uwizefuraha@gmail.com",
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === "production" ? "https://your-backend-url.com" : "http://localhost:5000",
        description: process.env.NODE_ENV === "production" ? "Production server" : "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
}

export const specs = swaggerJsdoc(options)
