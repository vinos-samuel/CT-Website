"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Send, Loader2, Download, Minimize2, Maximize2, ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import ReactMarkdown from "react-markdown"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

// Predefined responses for fallback
const FALLBACK_RESPONSES = [
  "I can help you understand contingent workforce management best practices. Check out our [Best Practices](/best-practices) section for detailed guides.",
  "Our website offers resources on compliance, risk management, and workforce planning. Visit [Templates](/templates) for downloadable documents.",
  "You can find country-specific regulations in our [Regulations](/regulations) section.",
  "We offer templates for contracts and compliance documents in our [Templates](/templates) section.",
  "For more specific assistance, you might want to [contact our team](/contact) through the Contact page.",
]

interface ChatWindowProps {
  onClose: () => void
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are an AI Workforce Consultant. Answer questions based on the website content about contingent workforce management.",
      timestamp: new Date(),
    },
    {
      role: "assistant",
      content: `Hello! I'm your **Workforce Assistant**. I can help you with:

• **Best Practices** - Hiring, onboarding, and management strategies

• **Compliance** - Country-specific regulations and requirements

• **Templates** - Downloadable contracts and documents

• **Resources** - Infographics and guides

What would you like to know about contingent workforce management?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isNewWindow, setIsNewWindow] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Scroll to bottom of messages when new messages are added
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  // Get a random fallback response
  const getFallbackResponse = () => {
    const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length)
    return FALLBACK_RESPONSES[randomIndex]
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage = { role: "user" as const, content: input.trim(), timestamp: new Date() }
    const newMessages = [...messages, userMessage]

    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      // Call our API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.filter((msg) => msg.role !== "system"),
          systemPrompt: messages[0].content,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error")
        console.error("API response error:", response.status, errorText)
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Reset retry count on success
      setRetryCount(0)

      // Add AI response
      setMessages((prev) => [...prev, { role: "assistant", content: data.message, timestamp: new Date() }])
    } catch (error) {
      console.error("Error calling AI API:", error)

      // Increment retry count
      setRetryCount((prev) => prev + 1)

      // If we've tried 3 times, use a fallback response
      if (retryCount >= 2) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: getFallbackResponse(),
            timestamp: new Date(),
          },
        ])

        toast({
          title: "Using simplified responses",
          description: "We're having trouble connecting to our AI service. Using pre-defined responses instead.",
          variant: "destructive",
        })
      } else {
        // Add error message
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I'm having trouble connecting to my knowledge base. Let me try a simpler approach.",
            timestamp: new Date(),
          },
        ])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const downloadChat = () => {
    const chatContent = messages
      .filter((msg) => msg.role !== "system")
      .map((msg) => {
        const timestamp = msg.timestamp.toLocaleString()
        const speaker = msg.role === "user" ? "You" : "Workforce Assistant"
        return `[${timestamp}] ${speaker}: ${msg.content}`
      })
      .join("\n\n")

    const blob = new Blob([chatContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `workforce-chat-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Chat Downloaded",
      description: "Your conversation has been saved as a text file.",
    })
  }

  const openInNewWindow = () => {
    const newWindow = window.open("", "_blank", "width=500,height=700,scrollbars=yes,resizable=yes")
    if (newWindow) {
      setIsNewWindow(true)
      // You could implement a separate chat page here
      toast({
        title: "New Window",
        description: "Chat opened in new window (feature coming soon)",
      })
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Custom link renderer for ReactMarkdown
  const LinkRenderer = ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : "_self"}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-blue-600 hover:text-blue-800 underline font-medium inline-flex items-center gap-1"
      onClick={(e) => {
        if (href?.startsWith("/")) {
          e.preventDefault()
          window.open(href, "_blank")
        }
      }}
    >
      {children}
      {href?.startsWith("http") && <ExternalLink className="h-3 w-3" />}
    </a>
  )

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button onClick={() => setIsMinimized(false)} className="rounded-full h-12 w-12 p-0 shadow-lg">
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-20 right-4 w-[400px] md:w-[500px] shadow-xl z-50 max-h-[80vh] flex flex-col">
      <CardHeader className="bg-primary text-primary-foreground flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg">Workforce Assistant</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadChat}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={openInNewWindow}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="text-primary-foreground hover:bg-primary/20"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-primary-foreground hover:bg-primary/20">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 overflow-y-auto flex-grow max-h-[500px]">
        <div className="space-y-4">
          {messages.map((message, index) => {
            // Skip system messages
            if (message.role === "system") return null

            return (
              <div key={index} className={cn("flex flex-col", message.role === "user" ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "flex items-start gap-2 max-w-[85%]",
                    message.role === "user" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback
                      className={message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}
                    >
                      {message.role === "user" ? "U" : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-lg px-4 py-3 shadow-sm",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted border border-border",
                    )}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown
                        className="prose prose-sm max-w-none dark:prose-invert"
                        components={{
                          a: LinkRenderer,
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="mb-2 last:mb-0 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="mb-2 last:mb-0 space-y-1">{children}</ol>,
                          li: ({ children }) => <li className="ml-4">{children}</li>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          h2: ({ children }) => (
                            <h2 className="text-lg font-semibold mb-2 mt-3 first:mt-0">{children}</h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-base font-semibold mb-1 mt-2 first:mt-0">{children}</h3>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-1 px-2">{formatTime(message.timestamp)}</span>
              </div>
            )
          })}
          {isLoading && (
            <div className="flex items-start gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted">AI</AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-4 py-3 bg-muted border border-border flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder="Ask about best practices, templates, or regulations..."
            value={input}
            onChange={handleInputChange}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
