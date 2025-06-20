"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HelpSupportProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: string
}

export default function HelpSupport({ isOpen, onClose }: HelpSupportProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm HungerBot, your virtual assistant. How can I help you today?",
      isBot: true,
      timestamp: "06:00 PM",
    },
    {
      id: "2",
      text: "Hello Lorem ipsum dummy text here lorem dummy text ipsum dummy text",
      isBot: false,
      timestamp: "06:15 PM",
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    "🍕 Where is my order?",
    "❌ How to cancel an order?",
    "💳 Payment failed but money deducted",
    "🍔 Food quality issues",
    "📦 Wrong order delivered",
    "📍 Update delivery address",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("order") && lowerMessage.includes("where")) {
      return "I can help you track your order! Please provide your order ID, and I'll check the status for you."
    }
    if (lowerMessage.includes("cancel")) {
      return "You can cancel your order if it hasn't been prepared yet. Go to 'My Orders' and select the order you want to cancel."
    }
    if (lowerMessage.includes("payment") && lowerMessage.includes("failed")) {
      return "I understand your concern about the payment issue. Please provide your transaction ID, and I'll help you resolve this immediately."
    }
    if (lowerMessage.includes("quality")) {
      return "We're sorry to hear about the food quality issue. Please share more details so we can improve and offer you a solution."
    }
    if (lowerMessage.includes("wrong order")) {
      return "I apologize for the wrong order delivery. Please share your order details, and we'll arrange for the correct order immediately."
    }
    if (lowerMessage.includes("address")) {
      return "You can update your delivery address in the 'Profile' section. Would you like me to guide you through the process?"
    }

    return "Thank you for reaching out! I'm here to help. Could you please provide more details about your issue so I can assist you better?"
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  if (!isOpen) return null

  return (
    <div className="fixed left-80 top-0 right-0 bottom-0 bg-gradient-to-br from-gray-50 to-white z-50 shadow-xl border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 pt-12 flex-shrink-0 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close help and support"
            aria-label="Close help and support"
          >
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Help & Support</h1>
              <p className="text-xl font-bold text-gray-800">We're here to help you!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] ${message.isBot ? "order-2" : ""}`}>
                {message.isBot && (
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">🤖</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-700">HungerBot</span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600">Online</span>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={`p-4 rounded-2xl shadow-sm ${message.isBot
                    ? "bg-white text-gray-800 rounded-tl-md border border-gray-100"
                    : "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-tr-md shadow-lg"
                    }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <p className={`text-xs text-gray-500 mt-2 ${message.isBot ? "text-left" : "text-right"}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">🤖</span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-700">HungerBot</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-orange-600">Typing...</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-md border border-gray-100 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2" htmlFor="quick-action-select">
            🏷️ Quick Actions
          </label>
          <select
            id="quick-action-select"
            title="Quick Actions"
            className="w-full h-12 px-4 border-2 border-blue-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium shadow-sm"
            aria-label="Quick Actions"
          // ...add onChange handler if needed...
          >
            {/* Example options */}
            <option value="">Select a quick action</option>
            {quickActions.map((action, idx) => (
              <option key={idx} value={action}>{action}</option>
            ))}
          </select>
        </div>

        {/* Bottom padding */}
        <div className="pb-24" />
      </div>

      {/* Message Input - Fixed */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-red-100 hover:to-red-200 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm">
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 relative">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="💬 Type your message here..."
              className="h-12 pr-14 bg-gray-50 border-gray-200 rounded-full text-gray-800 placeholder:text-gray-500 focus:bg-white focus:border-red-300 transition-all duration-200"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(inputMessage)
                }
              }}
            />
            <button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              title="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
