"use client"

import { X, CreditCard, Clock, Users, HelpCircle, Settings, User, LogOut, ShoppingCart, Menu, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const menuItems = [
    {
      icon: Home,
      title: "Dashboard",
      onClick: () => {
        console.log("Dashboard clicked")
      },
      isActive: true,
    },
    {
      icon: ShoppingCart,
      title: "Orders",
      onClick: () => {
        console.log("Orders clicked")
        if ((window as any).handleSidebarMenuClick) {
          ;(window as any).handleSidebarMenuClick("orders")
        }
      },
      badge: "12",
      badgeColor: "bg-red-500",
    },
    {
      icon: Menu,
      title: "Menu Management",
      onClick: () => {
        console.log("Menu Management clicked")
        if ((window as any).handleSidebarMenuClick) {
          ;(window as any).handleSidebarMenuClick("menu")
        }
      },
    },
    {
      icon: User,
      title: "Profile Management",
      onClick: () => {
        console.log("Profile Management clicked")
        if ((window as any).handleSidebarMenuClick) {
          ;(window as any).handleSidebarMenuClick("profile")
        }
      },
    },
    {
      icon: CreditCard,
      title: "Payments",
      onClick: () => {
        console.log("Payments clicked")
        if ((window as any).handleSidebarMenuClick) {
          ;(window as any).handleSidebarMenuClick("payments")
        }
      },
    },
    {
      icon: Clock,
      title: "Pickup Management",
      onClick: () => {
        console.log("Pickup Management clicked")
        if ((window as any).handleSidebarMenuClick) {
          ;(window as any).handleSidebarMenuClick("pickup")
        }
      },
    },
    {
      icon: Users,
      title: "Sub-user Management",
      onClick: () => {
        console.log("Sub-user Management clicked")
        if ((window as any).handleSidebarMenuClick) {
          ;(window as any).handleSidebarMenuClick("subuser")
        }
      },
      badge: "7",
      badgeColor: "bg-blue-500",
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      onClick: () => {
        console.log("Help & Support clicked")
        if ((window as any).handleSidebarMenuClick) {
          ;(window as any).handleSidebarMenuClick("help")
        }
      },
    },
    {
      icon: Settings,
      title: "Account Setting",
      onClick: () => {
        console.log("Account Settings clicked")
        if ((window as any).handleSidebarMenuClick) {
          ;(window as any).handleSidebarMenuClick("settings")
        }
      },
    },
  ]

  const logoutItem = {
    icon: LogOut,
    title: "Logout",
    onClick: () => {
      console.log("Logout clicked")
      onClose()
      if ((window as any).handleSidebarMenuClick) {
        ;(window as any).handleSidebarMenuClick("logout")
      }
    },
  }

  if (!isOpen) return null

  return (
    <>
      {/* Side Menu */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-white z-40 shadow-2xl transform transition-transform duration-300 border-r border-gray-200 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-500 to-red-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white font-bold text-lg">SG</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Spice Garden</h3>
                  <p className="text-sm text-red-100">Mumbai, Maharashtra</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  console.log(`Menu item clicked: ${item.title}`)
                  item.onClick()
                }}
                className={`w-full flex items-center gap-4 p-4 text-left rounded-xl transition-all duration-200 group ${
                  item.isActive
                    ? "bg-red-50 text-red-600 shadow-sm border border-red-100"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    item.isActive ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="font-medium flex-1">{item.title}</span>
                {item.badge && (
                  <div
                    className={`${item.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center`}
                  >
                    {item.badge}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Logout Section */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                console.log("Logout button clicked")
                logoutItem.onClick()
              }}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-red-50 rounded-xl transition-all duration-200 text-red-600 group"
            >
              <div className="p-2 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors">
                <logoutItem.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{logoutItem.title}</span>
            </button>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-xs text-gray-500">Hungersate Restaurant v2.1.0</p>
              <p className="text-xs text-gray-400 mt-1">© 2024 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
