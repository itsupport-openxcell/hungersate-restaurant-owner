"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Home,
  Bell,
  Menu,
  X,
  ArrowUpRight,
  Calendar,
  User,
} from "lucide-react"
import { useState, useEffect } from "react"
import SideMenu from "./side-menu"
import Notifications from "./notifications"
import PaymentsPage from "./payments-page"
import PickupManagement from "./pickup-management"
import SubUserManagement from "./sub-user-management"
import ProfileManagement from "./profile-management"
import HelpSupport from "./help-support"
import AccountSettings from "./account-settings"
import OrdersPage from "./orders-page"
import MenuManagement from "./menu-management"

export default function DashboardPage() {
  const stats = [
    {
      title: "Order Threshold",
      value: "20/100",
      subtitle: "Tomorrow's Order",
      count: "12",
      action: "View Orders",
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      onClick: () => setOrdersPageState({ isOpen: true, initialTab: "past" }),
    },
    {
      title: "New Order Requests",
      value: "12",
      subtitle: "Awaiting confirmation",
      action: "View requests",
      icon: Clock,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      onClick: () => setOrdersPageState({ isOpen: true, initialTab: "new" }),
    },
    {
      title: "Ongoing Orders",
      value: "8",
      subtitle: "Orders in progress",
      action: "Manage orders",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      onClick: () => setOrdersPageState({ isOpen: true, initialTab: "ongoing" }),
    },
    {
      title: "Completed Today",
      value: "8",
      subtitle: "Orders delivered",
      action: "View history",
      icon: CheckCircle,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      onClick: () => setOrdersPageState({ isOpen: true, initialTab: "past" }),
    },
  ]

  const activities = [
    {
      id: "ORD-001",
      date: "4 June",
      time: "12:30 PM",
      status: "HOT",
      action: "Mark Ready for Pickup",
      customer: "John Doe",
      items: "5 Items",
      amount: "₹386.95",
      avatar: "JD",
      priority: "high",
    },
    {
      id: "ORD-002",
      date: "4 June",
      time: "12:15 PM",
      status: "COLD",
      action: "New Order Received",
      customer: "Sarah Wilson",
      items: "3 Items",
      amount: "₹245.50",
      avatar: "SW",
      priority: "normal",
    },
    {
      id: "ORD-003",
      date: "4 June",
      time: "11:45 AM",
      status: "COLD",
      action: "Order Completed",
      customer: "Jane Smith",
      items: "7 Items",
      amount: "₹567.25",
      avatar: "JS",
      priority: "normal",
    },
    {
      id: "ORD-004",
      date: "4 June",
      time: "11:30 AM",
      status: "COLD",
      action: "Payment Received",
      customer: "Mike Johnson",
      items: "2 Items",
      amount: "₹189.00",
      avatar: "MJ",
      priority: "normal",
    },
  ]

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false)
  const [isPickupManagementOpen, setIsPickupManagementOpen] = useState(false)
  const [isSubUserManagementOpen, setIsSubUserManagementOpen] = useState(false)
  const [isProfileManagementOpen, setIsProfileManagementOpen] = useState(false)
  const [isHelpSupportOpen, setIsHelpSupportOpen] = useState(false)
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false)
  const [isMenuManagementOpen, setIsMenuManagementOpen] = useState(false)
  const [ordersPageState, setOrdersPageState] = useState<{
    isOpen: boolean
    initialTab?: "new" | "ongoing" | "past"
  }>({ isOpen: false })

  // Remove the useEffect and all event handlers, replace with direct state management
  const handleSidebarMenuClick = (menuType: string) => {
    console.log(`Direct menu click: ${menuType}`)

    // Close all panels first
    setIsPaymentsOpen(false)
    setIsPickupManagementOpen(false)
    setIsSubUserManagementOpen(false)
    setIsProfileManagementOpen(false)
    setIsHelpSupportOpen(false)
    setIsAccountSettingsOpen(false)
    setIsMenuManagementOpen(false)
    setOrdersPageState({ isOpen: false })

    // Open the requested panel
    switch (menuType) {
      case "payments":
        setIsPaymentsOpen(true)
        break
      case "pickup":
        setIsPickupManagementOpen(true)
        break
      case "subuser":
        setIsSubUserManagementOpen(true)
        break
      case "profile":
        setIsProfileManagementOpen(true)
        break
      case "help":
        setIsHelpSupportOpen(true)
        break
      case "settings":
        setIsAccountSettingsOpen(true)
        break
      case "menu":
        setIsMenuManagementOpen(true)
        break
      case "orders":
        setOrdersPageState({ isOpen: true, initialTab: "new" })
        break
      case "logout":
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("redirectToLogin"))
        }
        break
    }
  }

  // Remove the entire useEffect block and replace with this simple effect
  useEffect(() => {
    // Store the handler on window for sidebar access
    ; (window as any).handleSidebarMenuClick = handleSidebarMenuClick

    return () => {
      delete (window as any).handleSidebarMenuClick
    }
  }, [])

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-red-400 to-red-500",
      "bg-gradient-to-br from-blue-400 to-blue-500",
      "bg-gradient-to-br from-green-400 to-green-500",
      "bg-gradient-to-br from-yellow-400 to-yellow-500",
      "bg-gradient-to-br from-purple-400 to-purple-500",
      "bg-gradient-to-br from-pink-400 to-pink-500",
      "bg-gradient-to-br from-indigo-400 to-indigo-500",
      "bg-gradient-to-br from-orange-400 to-orange-500",
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "HOT":
        return "bg-red-100 text-red-800 border-red-200"
      case "COLD":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div
        className={`bg-white shadow-sm border-b border-gray-200 p-4 transition-all duration-300 ${isSideMenuOpen ? "ml-80" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
              className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isSideMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Spice Garden</h1>
              <p className="text-sm text-gray-500">Restaurant Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="text-gray-600 hover:text-gray-800 relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6" />
              <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">9:41</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`p-6 space-y-8 transition-all duration-300 ${isSideMenuOpen ? "ml-80" : ""}`}>
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Good Morning! 👋</h2>
              <p className="text-red-100">Here's what's happening with your restaurant today</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">₹1,250.75</div>
              <div className="text-red-100">Today's Revenue</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  {stat.subtitle && <p className="text-sm text-gray-500">{stat.subtitle}</p>}
                  {stat.count && <div className="text-lg font-semibold text-gray-700">{stat.count}</div>}
                </div>
                <Button
                  onClick={stat.onClick}
                  variant="outline"
                  size="sm"
                  className={`w-full mt-4 ${stat.textColor} border-current hover:${stat.bgColor} transition-colors`}
                >
                  {stat.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Today's Revenue</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">₹1,250.75</div>

            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Total Orders</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">555</div>

            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">Average Order</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">₹425.50</div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Section */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
                  <p className="text-sm text-gray-500">Latest updates from your restaurant</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{activity.id}</span>
                      <Badge variant="outline" className={`text-xs border ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{activity.action}</div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {/* <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {activity.customer}
                      </div> */}
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" />
                        {activity.items}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activity.date} {activity.time}
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{activity.amount}</div>
                    {activity.status === "HOT" && (
                      <Button size="sm" className="mt-2 bg-red-500 hover:bg-red-600 text-white">
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div
        className={`fixed bottom-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ${isSideMenuOpen ? "left-80" : "left-0"}`}
      >
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center p-3 text-red-500 bg-red-50 rounded-lg">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="flex flex-col items-center p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors relative"
          >
            <Bell className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">Notifications</span>
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Side Menu */}
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />

      {/* Notifications */}
      <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />

      {/* Payments Page */}
      <PaymentsPage isOpen={isPaymentsOpen} onClose={() => setIsPaymentsOpen(false)} />

      {/* Pickup Management */}
      <PickupManagement isOpen={isPickupManagementOpen} onClose={() => setIsPickupManagementOpen(false)} />

      {/* Sub User Management */}
      <SubUserManagement isOpen={isSubUserManagementOpen} onClose={() => setIsSubUserManagementOpen(false)} />

      {/* Profile Management */}
      <ProfileManagement isOpen={isProfileManagementOpen} onClose={() => setIsProfileManagementOpen(false)} />

      {/* Help & Support */}
      <HelpSupport isOpen={isHelpSupportOpen} onClose={() => setIsHelpSupportOpen(false)} />

      {/* Account Settings */}
      <AccountSettings isOpen={isAccountSettingsOpen} onClose={() => setIsAccountSettingsOpen(false)} />

      {/* Orders Page */}
      <OrdersPage
        isOpen={ordersPageState.isOpen}
        onClose={() => setOrdersPageState({ isOpen: false })}
        initialTab={ordersPageState.initialTab}
      />

      {/* Menu Management */}
      <MenuManagement isOpen={isMenuManagementOpen} onClose={() => setIsMenuManagementOpen(false)} />
    </div>
  )
}
