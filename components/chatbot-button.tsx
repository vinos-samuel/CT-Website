"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import ChatWindow from "./chat-window"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Listen for the custom event to toggle the chatbot
    const handleToggleChatbot = () => {
      setIsOpen(true)
    }

    window.addEventListener("toggle-chatbot", handleToggleChatbot)

    return () => {
      window.removeEventListener("toggle-chatbot", handleToggleChatbot)
    }
  }, [])

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const closeChatbot = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 p-0 shadow-lg z-50 hover:scale-105 transition-transform"
        onClick={toggleChatbot}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {isOpen && <ChatWindow onClose={closeChatbot} />}
    </>
  )
}
