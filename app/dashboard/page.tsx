"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Layout from "@/components/Layout"
import { ClipboardList, Clock, History, Bell, TrendingUp, Users, Eye } from "lucide-react"

// Mock data
const mockStats = {
  totalOrderRequests: 12,
  ongoingOrders: 5,
  orderHistory: 156,
  totalRevenue: 45670,
  activeSubUsers: 8,
  pendingApprovals: 3,
}

const mockRecentOrders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    items: ["Butter Chicken", "Naan"],
    total: 450,
    status: "pending",
    time: "10 mins ago",
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    items: ["Biryani", "Raita"],
    total: 320,
    status: "accepted",
    time: "25 mins ago",
  },
  {
    id: "ORD003",
    customerName: "Mike Johnson",
    items: ["Dal Makhani", "Rice"],
    total: 280,
    status: "preparing",
    time: "1 hour ago",
  },
]

export default function Dashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState(mockRecentOrders)
  const [notifications] = useState([
    { id: 1, message: "New order request from John Doe", type: "order", time: "2 mins ago", href: "/orders/requests" },
    { id: 2, message: "Payment received for Order #ORD001", type: "payment", time: "15 mins ago", href: "/payments" },
    { id: 3, message: "Menu item approval pending", type: "approval", time: "1 hour ago", href: "/menu" },
  ])

  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: "accepted" } : order)))
    // Show success notification
    alert(`Order ${orderId} has been accepted successfully!`)
  }

  const handleNotificationClick = (notification: any) => {
    router.push(notification.href)
  }

  const handleOrderClick = (orderId: string) => {
    router.push(`/orders/requests?orderId=${orderId}`)
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={() => router.push("/notifications")}>
            <Bell className="w-4 h-4 mr-2" />
            Notifications ({notifications.length})
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow hover:border-orange-300"
            onClick={() => router.push("/orders/requests")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Order Requests (24h)</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{mockStats.totalOrderRequests}</div>
              <p className="text-xs text-muted-foreground">Click to view and accept</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow hover:border-blue-300"
            onClick={() => router.push("/orders/ongoing")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ongoing Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{mockStats.ongoingOrders}</div>
              <p className="text-xs text-muted-foreground">Currently processing</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow hover:border-green-300"
            onClick={() => router.push("/orders/history")}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Order History</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockStats.orderHistory}</div>
              <p className="text-xs text-muted-foreground">Total completed orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">₹{mockStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sub-Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">{mockStats.activeSubUsers}</div>
              <p className="text-xs text-muted-foreground">Staff members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{mockStats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Require admin approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Order Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleOrderClick(order.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{order.customerName}</h3>
                      <Badge
                        variant={
                          order.status === "pending"
                            ? "destructive"
                            : order.status === "accepted"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{order.items.join(", ")}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                  <div className="text-right flex items-center space-x-3">
                    <div>
                      <p className="font-semibold">₹{order.total}</p>
                      {order.status === "pending" && (
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAcceptOrder(order.id)
                          }}
                        >
                          Accept Order
                        </Button>
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleNotificationClick(notification)}
                >
                  <Bell className="w-4 h-4 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
