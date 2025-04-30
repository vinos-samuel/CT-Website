"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, Send } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are an AI Workforce Consultant. Answer questions based on the website content about contingent workforce management.",
    },
    {
      role: "assistant",
      content: "Hello! I'm your Website Assistant. How can I help you with contingent workforce management today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage = { role: "user" as const, content: input.trim() }
    const newMessages = [...messages, userMessage]

    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      setIsLoading(false)

      const userQuestion = input.toLowerCase()
      let response = ""
      let canAnswer = true

      // Check if the question is about content on the website
      if (userQuestion.includes("regulation") || userQuestion.includes("compliance")) {
        response =
          "Our website provides detailed information about contingent workforce regulations across various countries in Asia Pacific. You can explore country-specific regulations on our Regulations page. Would you like me to share information about a specific country?"
      } else if (userQuestion.includes("australia") || userQuestion.includes("australian")) {
        response =
          "Australia has specific regulations for contingent workers. Key considerations include proper classification, superannuation requirements, and fair work standards. You can find detailed information on our Australia regulations page."
      } else if (userQuestion.includes("china") || userQuestion.includes("chinese")) {
        response =
          "China has strict regulations regarding foreign workers and contractors. Work permits are required, and there are specific rules about employment relationships. Visit our China regulations page for comprehensive information."
      } else if (userQuestion.includes("best practice") || userQuestion.includes("management")) {
        response =
          "Our Best Practices section covers strategies for hiring, onboarding, management, retention, and compliance of contingent workers. You can find detailed articles and guides on our Best Practices page."
      } else if (userQuestion.includes("template") || userQuestion.includes("document")) {
        response =
          "We offer various templates for contingent workforce management, including contracts, policies, and compliance documents. Check our Templates page for downloadable resources."
      } else if (
        userQuestion.includes("contact") ||
        userQuestion.includes("help") ||
        userQuestion.includes("support")
      ) {
        response =
          "You can reach our team through the Contact page. We offer consultations and personalized support for your contingent workforce needs."
      } else {
        // If we can't answer based on website content
        canAnswer = false
        response =
          "I'm sorry, I don't have specific information about that topic on our website. For more personalized assistance, please visit our Contact page to speak with our workforce consultants."
      }

      // Add AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: response,
        },
      ])

      // If we couldn't answer, add a follow-up message with contact link
      if (!canAnswer) {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "assistant",
              content: "Would you like to go to our Contact page now?",
            },
          ])
        }, 1000)
      }
    }, 1000)
  }

  return (
    <>
      <Button className="fixed bottom-4 right-4 rounded-full h-14 w-14 p-0 shadow-lg" onClick={toggleChatbot}>
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-[350px] md:w-[400px] shadow-xl z-50">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-lg">Website Assistant</CardTitle>
          </CardHeader>
          <CardContent className="p-4 h-[350px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => {
                // Skip system messages
                if (message.role === "system") return null

                return (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                      {message.role === "assistant" &&
                        message.content.includes("Would you like to go to our Contact page now?") && (
                          <div className="mt-2">
                            <Link href="/contact">
                              <Button size="sm" variant="secondary" className="w-full">
                                Go to Contact Page
                              </Button>
                            </Link>
                          </div>
                        )}
                    </div>
                  </div>
                )
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-muted flex items-center gap-2">
                    <span className="text-sm">Thinking</span>
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input placeholder="Ask a question..." value={input} onChange={handleInputChange} className="flex-1" />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
