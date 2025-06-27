import React, { useState } from 'react'
import { Bell, User, LogOut, ChevronDown } from 'lucide-react'
import Button from './Button'
import Modal from './Modal'
import NotificationItem from './Notifications/NotificationItem'

const Topbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notificationsModal, setNotificationsModal] = useState(false)
  const [activeTab, setActiveTab] = useState("All")
  const [selectedNotification, setSelectedNotification] = useState(null)

  const notifications = [
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
    }
  ]

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "All") return true
    return notification.type === activeTab.toLowerCase()
  })

  const handleLogout = () => {
    // Dispatch logout event
    window.dispatchEvent(new CustomEvent("logout"))
    setShowUserMenu(false)
  }

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 relative z-30">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Restaurant Admin Panel</h2>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={() => setNotificationsModal(true)}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center space-x-2"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin User</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowUserMenu(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                <div className="py-1">
                  <a
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Settings
                  </a>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Notifications Modal */}
      <Modal
        isOpen={notificationsModal}
        onClose={() => setNotificationsModal(false)}
        title="Notifications"
        size="lg"
      >
        <div className="mb-6">
          <div className="flex border-b border-gray-200 mb-4">
            {["All", "Order", "Payment"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all relative ${
                  activeTab === tab
                    ? "text-red-600 bg-gradient-to-b from-red-50 to-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {tab}
                </div>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                time={notification.time}
                amount={notification.amount}
                onClick={() => handleNotificationClick(notification)}
              />
            ))}
          </div>
        </div>
      </Modal>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <Modal
          isOpen={!!selectedNotification}
          onClose={() => setSelectedNotification(null)}
          title={selectedNotification.title}
          size="md"
          footer={
            <Button onClick={() => setSelectedNotification(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4">
            <p className="text-gray-600">{selectedNotification.message}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{selectedNotification.time}</span>
              {selectedNotification.amount && (
                <span className="font-bold text-lg">{selectedNotification.amount}</span>
              )}
            </div>
          </div>
        </Modal>
      )}
    </header>
  )
}

export default Topbar