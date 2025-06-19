"use client"

import { useState } from "react"
import { ArrowLeft, ChevronRight, LogOut, Mail, MessageSquare, Smartphone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

interface AccountSettingsProps {
  isOpen: boolean
  onClose: () => void
}

interface NotificationSettings {
  orderAlerts: {
    push: boolean
    email: boolean
    sms: boolean
  }
  paymentAlerts: {
    push: boolean
    email: boolean
    sms: boolean
  }
}

export default function AccountSettings({ isOpen, onClose }: AccountSettingsProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderAlerts: {
      push: true,
      email: true,
      sms: false,
    },
    paymentAlerts: {
      push: true,
      email: false,
      sms: true,
    },
  })

  const userInfo = {
    name: "Jane Cooper",
    email: "janecooper@gmail.com",
    phone: "+91 98986 70323",
    avatar: "JC",
  }

  const handleNotificationToggle = (
    category: keyof NotificationSettings,
    type: keyof NotificationSettings["orderAlerts"],
    value: boolean,
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value,
      },
    }))
  }

  const handleLogout = () => {
    setShowLogoutConfirm(false)
    // Handle logout logic here
    console.log("User logged out")
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("logout"))
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
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
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Account Settings</h1>
                <p className="text-red-100 text-sm">Manage your preferences</p>
              </div>
            </div>
            <div className="text-sm text-red-100 bg-white/10 px-3 py-1 rounded-full">9:41</div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* User Profile Section */}
            <Card className="mb-6 overflow-hidden shadow-lg border-0">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                <div className="bg-white rounded-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">👤</span>
                      <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
                    </div>
                    <button
                      onClick={() => {
                        onClose()
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(new CustomEvent("openProfileManagement"))
                        }
                      }}
                      className="flex items-center gap-4 w-full text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl p-4 -m-2 transition-all duration-200 group"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{userInfo.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {userInfo.name}
                        </h4>
                        <p className="text-gray-600 text-sm flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {userInfo.email}
                        </p>
                        <p className="text-gray-600 text-sm flex items-center gap-1">
                          <Smartphone className="w-4 h-4" />
                          {userInfo.phone}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </button>
                  </CardContent>
                </div>
              </div>
            </Card>

            {/* Notification Settings */}
            <Card className="mb-6 overflow-hidden shadow-lg border-0">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-1">
                <div className="bg-white rounded-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🔔</span>
                        <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Order Alerts */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">📦</span>
                        <h4 className="text-base font-semibold text-gray-800">Order Alerts</h4>
                      </div>
                      <div className="space-y-4 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                              <Smartphone className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <span className="text-gray-800 font-medium">Push Notifications</span>
                              <p className="text-xs text-gray-600">Get instant updates on your phone</p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationSettings.orderAlerts.push}
                            onCheckedChange={(checked) => handleNotificationToggle("orderAlerts", "push", checked)}
                            className="data-[state=checked]:bg-red-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                              <Mail className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <span className="text-gray-800 font-medium">Email Notification</span>
                              <p className="text-xs text-gray-600">Receive updates via email</p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationSettings.orderAlerts.email}
                            onCheckedChange={(checked) => handleNotificationToggle("orderAlerts", "email", checked)}
                            className="data-[state=checked]:bg-red-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <span className="text-gray-800 font-medium">SMS Notification</span>
                              <p className="text-xs text-gray-600">Get text messages on your phone</p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationSettings.orderAlerts.sms}
                            onCheckedChange={(checked) => handleNotificationToggle("orderAlerts", "sms", checked)}
                            className="data-[state=checked]:bg-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Alerts */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">💳</span>
                        <h4 className="text-base font-semibold text-gray-800">Payment Alerts</h4>
                      </div>
                      <div className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                              <Smartphone className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <span className="text-gray-800 font-medium">Push Notifications</span>
                              <p className="text-xs text-gray-600">Payment confirmations & alerts</p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationSettings.paymentAlerts.push}
                            onCheckedChange={(checked) => handleNotificationToggle("paymentAlerts", "push", checked)}
                            className="data-[state=checked]:bg-red-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                              <Mail className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <span className="text-gray-800 font-medium">Email Notification</span>
                              <p className="text-xs text-gray-600">Payment receipts via email</p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationSettings.paymentAlerts.email}
                            onCheckedChange={(checked) => handleNotificationToggle("paymentAlerts", "email", checked)}
                            className="data-[state=checked]:bg-red-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                              <MessageSquare className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <span className="text-gray-800 font-medium">SMS Notification</span>
                              <p className="text-xs text-gray-600">Transaction alerts via SMS</p>
                            </div>
                          </div>
                          <Switch
                            checked={notificationSettings.paymentAlerts.sms}
                            onCheckedChange={(checked) => handleNotificationToggle("paymentAlerts", "sms", checked)}
                            className="data-[state=checked]:bg-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>

            {/* Logout Button */}
            <Card className="overflow-hidden shadow-lg border-0">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-1">
                <div className="bg-white rounded-lg p-4">
                  <Button
                    onClick={() => setShowLogoutConfirm(true)}
                    variant="outline"
                    className="w-full h-16 border-red-300 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:border-red-400 flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200">
                      <LogOut className="w-5 h-5 text-red-600" />
                    </div>
                    <span>Logout from Account</span>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Bottom padding */}
            <div className="pb-20" />
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowLogoutConfirm(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm bg-white shadow-2xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-1">
                <div className="bg-white rounded-lg">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <LogOut className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Confirm Logout</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      Are you sure you want to logout from your account? You'll need to sign in again to access your
                      account.
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setShowLogoutConfirm(false)}
                        variant="outline"
                        className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleLogout}
                        className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium shadow-lg"
                      >
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  )
}
