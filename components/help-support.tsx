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
      <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg p-4 pt-12 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-white hover:text-red-100 p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Help & Support</h1>
              <p className="text-red-100 text-sm">We're here to help you!</p>
            </div>
          </div>
          <div className="text-sm text-red-100 bg-white/10 px-3 py-1 rounded-full">9:41</div>
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
                  className={`p-4 rounded-2xl shadow-sm ${
                    message.isBot
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
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">⚡</span>
            <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => handleQuickAction(action)}
                className="p-4 text-left bg-gradient-to-r from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 rounded-xl border border-gray-200 hover:border-red-200 transition-all duration-200 group"
              >
                <span className="text-sm text-gray-800 group-hover:text-red-700 font-medium">{action}</span>
              </button>
            ))}
          </div>
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
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
