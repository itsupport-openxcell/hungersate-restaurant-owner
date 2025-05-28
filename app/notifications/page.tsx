"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { OrderDetailsDialog } from "@/components/OrderDetailsDialog"
import Layout from "@/components/Layout"
import { useNotifications } from "@/contexts/NotificationContext"
import { Bell, BellOff, Settings, Trash2, BookMarkedIcon as MarkAsRead, Volume2 } from "lucide-react"

// Mock order data for notifications
const mockOrderData = {
  ORD001: {
    id: "ORD001",
    customerName: "John Doe",
    customerPhone: "+91 9876543210",
    customerAddress: "123 Main Street, Mumbai, Maharashtra 400001",
    items: [
      { name: "Butter Chicken", quantity: 2, price: 180 },
      { name: "Naan", quantity: 4, price: 40 },
    ],
    totalAmount: 520,
    status: "pending",
    paymentStatus: "paid",
    orderTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000),
  },
  ORD002: {
    id: "ORD002",
    customerName: "Jane Smith",
    customerPhone: "+91 9876543211",
    customerAddress: "456 Park Avenue, Mumbai, Maharashtra 400002",
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 250 },
      { name: "Raita", quantity: 1, price: 60 },
    ],
    totalAmount: 310,
    status: "preparing",
    paymentStatus: "paid",
    orderTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000),
  },
}

export default function NotificationsPage() {
  const { notifications, markAsRead, clearAll } = useNotifications()
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    deliveryReminders: true,
    paymentConfirmations: true,
    menuApprovals: false,
    systemUpdates: true,
    soundEnabled: true,
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return "🍽️"
      case "payment":
        return "💳"
      case "delivery":
        return "🚚"
      case "approval":
        return "✅"
      default:
        return "🔔"
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "order":
        return "border-l-orange-500"
      case "payment":
        return "border-l-green-500"
      case "delivery":
        return "border-l-blue-500"
      case "approval":
        return "border-l-purple-500"
      default:
        return "border-l-gray-500"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const handleSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const markAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.read) {
        markAsRead(notification.id)
      }
    })
  }

  const handleNotificationClick = (notification: any) => {
    // Mark as read
    if (!notification.read) {
      markAsRead(notification.id)
    }

    // If it's an order notification, show order details
    if (notification.type === "order" && notification.orderId) {
      const orderData = mockOrderData[notification.orderId as keyof typeof mockOrderData]
      if (orderData) {
        setSelectedOrder(orderData)
        setIsOrderDialogOpen(true)
      }
    } else {
      // For other notifications, show a simple alert
      alert(`Notification: ${notification.message}`)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-gray-600 mt-1">Manage your notification preferences and view alerts</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {unreadCount} Unread
            </Badge>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <MarkAsRead className="w-4 h-4 mr-2" />
                Mark All Read
              </Button>
            )}
            <Button variant="outline" onClick={clearAll}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="newOrders" className="flex items-center space-x-2">
                    <span>🍽️</span>
                    <span>New Order Alerts</span>
                  </Label>
                  <Switch
                    id="newOrders"
                    checked={notificationSettings.newOrders}
                    onCheckedChange={(checked) => handleSettingChange("newOrders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="deliveryReminders" className="flex items-center space-x-2">
                    <span>🚚</span>
                    <span>Delivery Reminders</span>
                  </Label>
                  <Switch
                    id="deliveryReminders"
                    checked={notificationSettings.deliveryReminders}
                    onCheckedChange={(checked) => handleSettingChange("deliveryReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="paymentConfirmations" className="flex items-center space-x-2">
                    <span>💳</span>
                    <span>Payment Confirmations</span>
                  </Label>
                  <Switch
                    id="paymentConfirmations"
                    checked={notificationSettings.paymentConfirmations}
                    onCheckedChange={(checked) => handleSettingChange("paymentConfirmations", checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="menuApprovals" className="flex items-center space-x-2">
                    <span>✅</span>
                    <span>Menu Approvals</span>
                  </Label>
                  <Switch
                    id="menuApprovals"
                    checked={notificationSettings.menuApprovals}
                    onCheckedChange={(checked) => handleSettingChange("menuApprovals", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="systemUpdates" className="flex items-center space-x-2">
                    <span>🔔</span>
                    <span>System Updates</span>
                  </Label>
                  <Switch
                    id="systemUpdates"
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => handleSettingChange("systemUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="soundEnabled" className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4" />
                    <span>Sound Notifications</span>
                  </Label>
                  <Switch
                    id="soundEnabled"
                    checked={notificationSettings.soundEnabled}
                    onCheckedChange={(checked) => handleSettingChange("soundEnabled", checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BellOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No notifications yet</p>
                <p className="text-gray-400">You'll see new notifications here when they arrive</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`border-l-4 ${getNotificationColor(notification.type)} ${
                  !notification.read ? "bg-blue-50" : ""
                } cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{notification.message}</p>
                        <p className="text-gray-400 text-xs mt-2">{formatTime(notification.timestamp)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle individual notification actions
                        }}
                      >
                        <Bell className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Actions */}
        {notifications.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                  Mark All as Read
                </Button>
                <Button variant="outline" onClick={clearAll}>
                  Clear All Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Details Dialog */}
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={isOrderDialogOpen}
          onClose={() => setIsOrderDialogOpen(false)}
          type="request"
        />
      </div>
    </Layout>
  )
}
