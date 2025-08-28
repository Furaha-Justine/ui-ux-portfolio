"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  href?: string
  type?: "button" | "submit"
}

export function CTAButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  type = "button",
}: CTAButtonProps) {
  const baseClasses =
    "rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl focus:ring-primary/50",
    secondary:
      "bg-gradient-to-r from-secondary to-secondary/90 text-white hover:from-secondary/90 hover:to-secondary shadow-lg hover:shadow-xl focus:ring-secondary/50 border border-secondary/20",
  }

  const sizeClasses = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  }

  const buttonClasses = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    )
  }

  return (
    <Button type={type} onClick={onClick} className={buttonClasses}>
      {children}
    </Button>
  )
}
