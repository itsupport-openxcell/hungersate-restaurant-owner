import React, { useState } from 'react'
import { LogOut, Mail, MessageSquare, Smartphone, User } from 'lucide-react'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

const AccountSettings = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
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

  const handleNotificationToggle = (category, type, value) => {
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
    console.log("User logged out")
    window.dispatchEvent(new CustomEvent("logout"))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">Manage your preferences</p>
      </div>

      {/* User Profile Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">👤</span>
              <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
            </div>
            <div className="flex items-center gap-4 w-full text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl p-4 -m-2 transition-all duration-200 group">
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
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-1">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔔</span>
                <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
              </div>
            </div>

            {/* Order Alerts */}
            <div className="mb-8">
              <div className="space-y-4 bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
                {/* Push Notifications */}
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.orderAlerts.push}
                      onChange={(e) => handleNotificationToggle("orderAlerts", "push", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
                {/* Email Notifications */}
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.orderAlerts.email}
                      onChange={(e) => handleNotificationToggle("orderAlerts", "email", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
                {/* SMS Notifications */}
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
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.orderAlerts.sms}
                      onChange={(e) => handleNotificationToggle("orderAlerts", "sms", e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowLogoutConfirm(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-sm bg-white shadow-2xl border-0 overflow-hidden rounded-lg">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-1">
                <div className="bg-white rounded-lg p-8 text-center">
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
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AccountSettings