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

const PAGE_SIZE = 3

export default function Notifications({ isOpen, onClose }: NotificationsProps) {
  const [activeTab, setActiveTab] = useState<NotificationTab>("All")
  const [currentPageAll, setCurrentPageAll] = useState(1)
  const [currentPageOrder, setCurrentPageOrder] = useState(1)
  const [currentPagePayment, setCurrentPagePayment] = useState(1)
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

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
      message: "Payment of $45.90 received. View transaction details.",
      time: "10m ago",
      amount: "$45.90",
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Confirmed",
      message: "A payment of $45.90 has been successfully confirmed.",
      time: "15m ago",
      amount: "$45.90",
    },
    {
      id: "4",
      type: "payment",
      title: "New Payment",
      message: "You've received another payment for $45.90.",
      time: "20m ago",
      amount: "$45.90",
    },
    {
      id: "5",
      type: "order",
      title: "Order Delivered",
      message: "Order #12346 has been successfully delivered.",
      time: "30m ago",
      amount: "$32.50",
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "All") return true
    return notification.type === activeTab.toLowerCase()
  })

  const currentPage =
    activeTab === "All"
      ? currentPageAll
      : activeTab === "Order"
        ? currentPageOrder
        : currentPagePayment

  const totalPages = Math.ceil(filteredNotifications.length / PAGE_SIZE)

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handleTabClick = (tab: NotificationTab) => {
    setActiveTab(tab)
    if (tab === "All") setCurrentPageAll(1)
    else if (tab === "Order") setCurrentPageOrder(1)
    else if (tab === "Payment") setCurrentPagePayment(1)
  }

  const handlePageChange = (page: number) => {
    if (activeTab === "All") setCurrentPageAll(page)
    else if (activeTab === "Order") setCurrentPageOrder(page)
    else if (activeTab === "Payment") setCurrentPagePayment(page)
  }

  if (!isOpen) return null

  return (
    <div className="fixed left-80 top-0 right-0 bottom-0 bg-gradient-to-br from-gray-50 to-white z-50 shadow-2xl border-l border-gray-200">
      <div className="bg-white shadow-sm p-4 pt-12 flex-shrink-0 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-lg" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex">
          {(["All", "Order", "Payment"] as NotificationTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-all relative ${activeTab === tab
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
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {paginatedNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => setSelectedNotification(notification)}
              className="cursor-pointer bg-white border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
              style={{
                background: `linear-gradient(135deg, ${notification.type === "order"
                  ? "rgba(59, 130, 246, 0.02), rgba(147, 197, 253, 0.05)"
                  : "rgba(34, 197, 94, 0.02), rgba(134, 239, 172, 0.05)"
                  })`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${notification.type === "order" ? "bg-blue-500" : "bg-green-500"
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
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${notification.type === "order"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                        }`}>
                        {notification.type === "order" ? "📦 Order" : "💳 Payment"}
                      </span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">⏰ {notification.time}</span>
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
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{notification.message}</p>
              <div className="flex justify-between">
                <Button className="bg-red-500 text-white hover:bg-red-600 rounded-xl px-6 py-2 text-sm shadow-md">
                  👁️ Tap to view
                </Button>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  New
                </div>
              </div>
            </div>
          ))}

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

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center border ${currentPage === i + 1
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => setSelectedNotification(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖️
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedNotification.title}</h2>
            <p className="text-sm text-gray-600 mb-4">{selectedNotification.message}</p>
            <div className="text-right">
              <Button onClick={() => setSelectedNotification(null)} className="bg-red-500 text-white">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}