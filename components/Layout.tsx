"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { useNotifications } from "@/contexts/NotificationContext"
import CreativeLoader from "@/components/CreativeLoader"
import {
  LayoutDashboard,
  ShoppingCart,
  Clock,
  History,
  MenuIcon,
  Users,
  CreditCard,
  Bell,
  Calendar,
  FileText,
  User,
  LogOut,
  ChefHat,
  X,
  ChevronDown,
  Settings,
  Menu,
} from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const { user, logout } = useAuth()
  const { notifications } = useNotifications()
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: ShoppingCart, label: "Order Requests", href: "/orders/requests" },
    { icon: Clock, label: "Ongoing Orders", href: "/orders/ongoing" },
    { icon: History, label: "Order History", href: "/orders/history" },
    { icon: MenuIcon, label: "Menu Management", href: "/menu" },
    { icon: Users, label: "Sub-User Management", href: "/sub-users" },
    { icon: CreditCard, label: "Payment Management", href: "/payments" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Calendar, label: "Availability", href: "/availability" },
    { icon: FileText, label: "CMS Pages", href: "/cms" },
    { icon: User, label: "My Account", href: "/account" },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleNavigation = async (href: string) => {
    if (pathname === href) return

    setIsNavigating(true)
    setSidebarOpen(false)

    // Show loader for a brief moment to simulate loading
    setTimeout(() => {
      router.push(href)
      setIsNavigating(false)
    }, 500)
  }

  const handleModuleSelect = (value: string) => {
    const selectedItem = menuItems.find((item) => item.href === value)
    if (selectedItem) {
      handleNavigation(selectedItem.href)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getCurrentPageTitle = () => {
    const item = menuItems.find((item) => item.href === pathname)
    return item ? item.label : "Dashboard"
  }

  const getCurrentModuleValue = () => {
    return pathname
  }

  if (isNavigating) {
    return <CreativeLoader />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-4 border-b">
              <div className="flex items-center space-x-2">
                <ChefHat className="w-8 h-8 text-orange-500" />
                <span className="text-xl font-bold">
                  Hunger<span className="text-orange-500">Sate</span>
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-4">
              {/* Mobile Module Selector */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Select Module</label>
                <Select value={getCurrentModuleValue()} onValueChange={handleModuleSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a module" />
                  </SelectTrigger>
                  <SelectContent>
                    {menuItems.map((item) => (
                      <SelectItem key={item.href} value={item.href}>
                        <div className="flex items-center space-x-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.label}</span>
                          {item.label === "Notifications" && unreadCount > 0 && (
                            <Badge variant="destructive" className="ml-auto text-xs">
                              {unreadCount}
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                    {item.label === "Notifications" && unreadCount > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          <div className="flex h-16 items-center px-4 border-b">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <span className="text-xl font-bold">
                Hunger<span className="text-orange-500">Sate</span>
              </span>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {/* Desktop Module Selector */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                <Menu className="w-4 h-4 inline mr-1" />
                Select Module
              </label>
              <Select value={getCurrentModuleValue()} onValueChange={handleModuleSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a module" />
                </SelectTrigger>
                <SelectContent>
                  {menuItems.map((item) => (
                    <SelectItem key={item.href} value={item.href}>
                      <div className="flex items-center space-x-2">
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        {item.label === "Notifications" && unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-auto text-xs">
                            {unreadCount}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.label === "Notifications" && unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <MenuIcon className="w-6 h-6" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-xl font-semibold text-gray-900">{getCurrentPageTitle()}</h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notification Bell */}
              <Button variant="ghost" size="sm" onClick={() => handleNavigation("/notifications")}>
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-1">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

              {/* Restaurant Name Display */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-orange-50 rounded-lg">
                <ChefHat className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">{user?.restaurantName}</span>
              </div>

              {/* User Menu with Logout */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{user?.restaurantName?.charAt(0) || "R"}</span>
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-gray-700">{user?.restaurantName}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.restaurantName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.mobile}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigation("/account")}>
                    <User className="w-4 h-4 mr-2" />
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavigation("/account")}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
