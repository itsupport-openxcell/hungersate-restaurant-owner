"use client"

import { useState } from "react"

import { ArrowLeft, Bell, Package, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"

interface NotificationsProps {

  isOpen: boolean

  onClose: () => void

}

type NotificationTab = "All" | "Order" | "Payment"

interface Notification {

  id: string

  type: "order" | "payment"

  title: string

  message: string

  time: string

  amount?: string

}

export default function Notifications({ isOpen, onClose }: NotificationsProps) {

  const [activeTab, setActiveTab] = useState<NotificationTab>("All")

  const notifications: Notification[] = [

    {

      id: "1",

      type: "order",

      title: "New order #12345",

      message: "You have received a new order for $45.90. Tap to view details and accept.",

      time: "5m ago",

      amount: "$45.90",

    },

    {

      id: "2",

      type: "payment",

      title: "Payment Received",

      message: "You have received a new order for $45.90. Tap to view details and accept.",

      time: "5m ago",

      amount: "$45.90",

    },

    {

      id: "3",

      type: "payment",

      title: "Payment Received",

      message: "You have received a new order for $45.90. Tap to view details and accept.",

      time: "5m ago",

      amount: "$45.90",

    },

    {

      id: "4",

      type: "payment",

      title: "Payment Received",

      message: "You have received a new order for $45.90. Tap to view details and accept.",

      time: "5m ago",

      amount: "$45.90",

    },

  ]

  const filteredNotifications = notifications.filter((notification) => {

    if (activeTab === "All") return true

    if (activeTab === "Order") return notification.type === "order"

    if (activeTab === "Payment") return notification.type === "payment"

    return true

  })

  if (!isOpen) return null

  return (
    <div className="fixed left-80 top-0 right-0 bottom-0 bg-gradient-to-br from-gray-50 to-white z-50 shadow-2xl border-l border-gray-200">

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg p-4 pt-12">
        <div className="flex items-center justify-between">
          <button

            onClick={onClose}

            className="text-white hover:text-red-100 p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">🔔 Notifications</h1>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Enhanced Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex">

          {(["All", "Order", "Payment"] as NotificationTab[]).map((tab) => (
            <button

              key={tab}

              onClick={() => setActiveTab(tab)}

              className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 relative ${activeTab === tab

                ? "text-red-600 bg-gradient-to-b from-red-50 to-white"

                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"

                }`}
            >
              <div className="flex items-center justify-center gap-2">

                {tab === "All" && "📋"}

                {tab === "Order" && <Package className="w-4 h-4" />}

                {tab === "Payment" && <CreditCard className="w-4 h-4" />}

                {tab}
              </div>

              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-t-full" />

              )}
            </button>

          ))}
        </div>
      </div>

      {/* Enhanced Notifications List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">

          {filteredNotifications.map((notification, index) => (
            <div

              key={notification.id}

              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"

              style={{

                background: `linear-gradient(135deg, ${notification.type === "order"

                  ? "rgba(59, 130, 246, 0.02) 0%, rgba(147, 197, 253, 0.05) 100%"

                  : "rgba(34, 197, 94, 0.02) 0%, rgba(134, 239, 172, 0.05) 100%"

                  })`,

              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div

                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${notification.type === "order"

                      ? "bg-gradient-to-br from-blue-500 to-blue-600"

                      : "bg-gradient-to-br from-green-500 to-green-600"

                      }`}
                  >

                    {notification.type === "order" ? (
                      <Package className="w-6 h-6 text-white" />

                    ) : (
                      <CreditCard className="w-6 h-6 text-white" />

                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{notification.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span

                        className={`text-xs font-medium px-3 py-1 rounded-full ${notification.type === "order" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"

                          }`}
                      >

                        {notification.type === "order" ? "📦 Order" : "💳 Payment"}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">

                        ⏰ {notification.time}
                      </span>
                    </div>
                  </div>
                </div>

                {notification.amount && (
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">{notification.amount}</span>
                    <div className="text-xs text-gray-500 mt-1">Amount</div>
                  </div>

                )}
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed pl-15">{notification.message}</p>

              <div className="flex items-center justify-between pl-15">
                <Button

                  variant="outline"

                  size="sm"

                  className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition-all duration-200 px-6 py-2 rounded-xl font-semibold"
                >

                  👁️ Tap to view
                </Button>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

                  New
                </div>
              </div>
            </div>

          ))}
        </div>

        {/* Enhanced Empty State */}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <Bell className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No notifications yet</h3>
            <p className="text-gray-500">You're all caught up! 🎉</p>
          </div>

        )}
      </div>
    </div>

  )

}
