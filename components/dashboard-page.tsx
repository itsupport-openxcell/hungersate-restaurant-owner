"use client"

import { useState, useEffect } from "react"
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  TrendingUp,
  Bell,
  Calendar,
  User,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

const STATS = [
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
    tab: "past",
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
    tab: "new",
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
    tab: "ongoing",
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
    tab: "past",
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
  {
    id: "ORD-005",
    date: "4 June",
    time: "11:00 AM",
    status: "HOT",
    action: "Packed and Ready",
    customer: "Emily Davis",
    items: "4 Items",
    amount: "₹310.75",
    avatar: "ED",
    priority: "high",
  },
]

const DashboardPage = () => {
  const [sideMenu, setSideMenu] = useState(true)
  const [modals, setModals] = useState({
    notifications: false,
    payments: false,
    pickup: false,
    subuser: false,
    profile: false,
    help: false,
    settings: false,
    menu: false,
    orders: { isOpen: false, initialTab: "new" },
  })

  const toggleModal = (name, value) => {
    setModals((prev) => ({
      ...prev,
      [name]: typeof value === "boolean" ? value : value,
    }))
  }

  const handleSidebarMenuClick = (menu) => {
    const state = {
      payments: false,
      pickup: false,
      subuser: false,
      profile: false,
      help: false,
      settings: false,
      menu: false,
      orders: { isOpen: false },
    }

    if (menu === "logout") window.dispatchEvent(new CustomEvent("redirectToLogin"))
    else if (menu === "orders") state.orders = { isOpen: true, initialTab: "new" }
    else state[menu] = true

    setModals((prev) => ({ ...prev, ...state }))
  }

  useEffect(() => {
    window.handleSidebarMenuClick = handleSidebarMenuClick
    return () => delete window.handleSidebarMenuClick
  }, [])

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
      {/* Demo loader button, remove in production */}

      <header className={`bg-white shadow-sm border-b p-4 ${sideMenu ? "ml-80" : ""}`}>
        <div className="flex justify-end">
          <button onClick={() => toggleModal("notifications", true)} className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      <main className={`p-6 space-y-8 ${sideMenu ? "ml-80" : ""}`}>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <Card key={i} className="hover:shadow-lg border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                  <div className="text-lg font-semibold text-gray-700">{stat.count}</div>
                </div>
                <Button
                  onClick={() => toggleModal("orders", { isOpen: true, initialTab: stat.tab })}
                  variant="outline"
                  size="sm"
                  className={`w-full mt-4 ${stat.textColor} border-current hover:${stat.bgColor}`}
                >
                  {stat.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section>
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{activity.id}</span>
                        <Badge variant="outline" className={`text-xs border ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{activity.action}</div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {activity.customer}
                        </div>
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
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">{activity.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <SideMenu isOpen={sideMenu} onClose={() => setSideMenu(false)} />
      <Notifications isOpen={modals.notifications} onClose={() => toggleModal("notifications", false)} />
      <PaymentsPage isOpen={modals.payments} onClose={() => toggleModal("payments", false)} />
      <PickupManagement isOpen={modals.pickup} onClose={() => toggleModal("pickup", false)} />
      <SubUserManagement isOpen={modals.subuser} onClose={() => toggleModal("subuser", false)} />
      <ProfileManagement isOpen={modals.profile} onClose={() => toggleModal("profile", false)} />
      <HelpSupport isOpen={modals.help} onClose={() => toggleModal("help", false)} />
      <AccountSettings isOpen={modals.settings} onClose={() => toggleModal("settings", false)} />
      <OrdersPage isOpen={modals.orders.isOpen} onClose={() => toggleModal("orders", { isOpen: false })} initialTab={modals.orders.initialTab} />
      <MenuManagement isOpen={modals.menu} onClose={() => toggleModal("menu", false)} />
    </div>
  )
}

export default DashboardPage
