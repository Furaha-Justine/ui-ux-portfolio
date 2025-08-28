import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface AuthRequest extends Request {
  user?: any
}

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token." })
  }
}

// Simple admin login for demo purposes
export const adminLogin = (req: Request, res: Response) => {
  const { password } = req.body

  // In production, use proper password hashing and user management
  if (password === "admin123") {
    const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET as string, { expiresIn: "24h" })

    res.json({ success: true, token })
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" })
  }
}
