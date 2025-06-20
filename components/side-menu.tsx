"use client"

import {
  X, CreditCard, Clock, Users, HelpCircle, Settings, User,
  LogOut, ShoppingCart, Menu, Home
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

interface MenuItem {
  icon: React.ElementType
  title: string
  key: string
  badge?: string
  badgeColor?: string
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [activeKey, setActiveKey] = useState("dashboard")

  const menuItems: MenuItem[] = [
    { icon: Home, title: "Dashboard", key: "dashboard" },
    { icon: ShoppingCart, title: "Orders", key: "orders", badge: "12", badgeColor: "bg-red-500" },
    { icon: Menu, title: "Menu Management", key: "menu" },
    { icon: User, title: "Profile Management", key: "profile" },
    { icon: CreditCard, title: "Payments", key: "payments" },
    { icon: Clock, title: "Pickup Management", key: "pickup" },
    { icon: Users, title: "Sub-user Management", key: "subuser", badge: "7", badgeColor: "bg-blue-500" },
    { icon: HelpCircle, title: "Help & Support", key: "help" },
    { icon: Settings, title: "Account Setting", key: "settings" },
  ]

  const handleItemClick = (key: string) => {
    setActiveKey(key)
    if ((window as any).handleSidebarMenuClick) {
      (window as any).handleSidebarMenuClick(key)
    }
  }

  const handleLogout = () => {
    onClose()
    if ((window as any).handleSidebarMenuClick) {
      (window as any).handleSidebarMenuClick("logout")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-white z-40 shadow-2xl border-r border-gray-200 transition-transform duration-300">
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
          {menuItems.map(({ icon: Icon, title, key, badge, badgeColor }) => {
            const isActive = key === activeKey
            return (
              <button
                key={key}
                onClick={() => handleItemClick(key)}
                className={`w-full flex items-center gap-4 p-4 text-left rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-red-50 text-red-600 shadow-sm border border-red-100"
                  : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                  }`}
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${isActive
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium flex-1">{title}</span>
                {badge && (
                  <div className={`${badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center`}>
                    {badge}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 text-left hover:bg-red-50 rounded-xl transition-all duration-200 text-red-600 group"
          >
            <div className="p-2 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 transition-colors">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-xs text-gray-500">Hungersate Restaurant v1.0</p>
            <p className="text-xs text-gray-400 mt-1">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
  )
}
