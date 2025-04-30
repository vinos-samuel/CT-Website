import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatbotButton from "@/components/chatbot-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Contingent Workforce Management Hub",
  description:
    "A central hub for non-employee, contingent workforce management providing regulatory information, HR best practices, and consultancy resources.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <ChatbotButton />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
