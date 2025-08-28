import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Uwize Furaha - UI/UX Designer Portfolio",
  description:
    "Professional portfolio of Uwize Furaha, a talented UI/UX Designer specializing in user-centered design solutions.",
  generator: "v0.app",
  keywords: "UI/UX Designer, Portfolio, User Experience, User Interface, Design, Uwize Furaha",
  authors: [{ name: "Uwize Furaha" }],
  openGraph: {
    title: "Uwize Furaha - UI/UX Designer Portfolio",
    description: "Professional portfolio showcasing innovative UI/UX design solutions",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
