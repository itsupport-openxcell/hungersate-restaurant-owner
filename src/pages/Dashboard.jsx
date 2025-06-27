import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Bell,
  User,
  Calendar,
  Package,
  CreditCard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import StatsCard from '../components/Dashboard/StatsCard'
import ActivityItem from '../components/Dashboard/ActivityItem'
import Modal from '../components/Modal'
import NotificationItem from '../components/Notifications/NotificationItem'
import Button from '../components/Button'
import Pagination from '../components/Pagination'
import { PageLoader, CardSkeleton } from '../components/Loader'

const Dashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [notificationsModal, setNotificationsModal] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [activeTab, setActiveTab] = useState("All")
  
  // Pagination state for each tab
  const [paginationState, setPaginationState] = useState({
    All: 1,
    Order: 1,
    Payment: 1
  })
  const itemsPerPage = 3

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

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
      tab: "completed",
      route: "/orders"
    },
    {
      title: "New Order Requests",
      value: "12",
      subtitle: "Awaiting confirmation",
      action: "View Requests",
      icon: Clock,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      tab: "new",
      route: "/orders"
    },
    {
      title: "Ongoing Orders",
      value: "8",
      subtitle: "Orders in progress",
      action: "Manage Orders",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      tab: "ongoing",
      route: "/orders"
    },
    {
      title: "Completed Today",
      value: "8",
      subtitle: "Orders delivered",
      action: "View History",
      icon: CheckCircle,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      tab: "completed",
      route: "/orders"
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
    },
    {
      id: "4",
      type: "payment",
      title: "New Payment",
      message: "You've received another payment for $45.90.",
      time: "20m ago",
      amount: "$45.90",
    },
    {
      id: "5",
      type: "order",
      title: "Order Delivered",
      message: "Order #12346 has been successfully delivered.",
      time: "30m ago",
      amount: "$32.50",
    },
    {
      id: "6",
      type: "order",
      title: "New order #12347",
      message: "You have received a new order for $38.75. Tap to view details and accept.",
      time: "45m ago",
      amount: "$38.75",
    },
    {
      id: "7",
      type: "payment",
      title: "Payment Received",
      message: "Payment of $38.75 received. View transaction details.",
      time: "50m ago",
      amount: "$38.75",
    },
    {
      id: "8",
      type: "order",
      title: "Order Cancelled",
      message: "Order #12348 has been cancelled by the customer.",
      time: "1h ago",
      amount: "$27.50",
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "All") return true
    return notification.type === activeTab.toLowerCase()
  })

  const currentPage = paginationState[activeTab]
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    setPaginationState(prev => ({
      ...prev,
      [activeTab]: page
    }))
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification)
  }

  const handleCardClick = (stat) => {
    // Navigate to the specified route with the tab parameter
    if (stat.route && stat.tab) {
      navigate(`${stat.route}?tab=${stat.tab}`)
    }
  }

  if (loading) {
    return <PageLoader message="Loading dashboard..." />
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your restaurant management dashboard</p>
        </div>
        <button 
          onClick={() => setNotificationsModal(true)}
          className="relative p-2 hover:bg-gray-100 rounded-lg"
        >
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <StatsCard
            key={i}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            count={stat.count}
            action={stat.action}
            icon={stat.icon}
            color={stat.color}
            textColor={stat.textColor}
            bgColor={stat.bgColor}
            onClick={() => handleCardClick(stat)}
          />
        ))}
      </section>

      {/* Recent Activity */}
      <section>
        <div className="border-0 shadow-md rounded-lg bg-white">
          <div className="pb-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                  <p className="text-sm text-gray-500">Latest updates from your restaurant</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  id={activity.id}
                  date={activity.date}
                  time={activity.time}
                  status={activity.status}
                  action={activity.action}
                  customer={activity.customer}
                  items={activity.items}
                  amount={activity.amount}
                  avatar={activity.avatar}
                  priority={activity.priority}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

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
                onClick={() => handleTabChange(tab)}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all relative ${
                  activeTab === tab
                    ? "text-red-600 bg-gradient-to-b from-red-50 to-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {tab === "All" && "📋"}
                  {tab === "Order" && <Package className="w-4 h-4" />}
                  {tab === "Payment" && <CreditCard className="w-4 h-4" />}
                  {tab}
                </div>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No notifications yet</h3>
              <p className="text-gray-500">You're all caught up! 🎉</p>
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedNotifications.map((notification) => (
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
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={filteredNotifications.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
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
    </div>
  )
}

export default Dashboard