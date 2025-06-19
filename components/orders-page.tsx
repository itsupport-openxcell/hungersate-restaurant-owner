"use client"

import { useState } from "react"
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  Phone,
  Star,
  TrendingUp,
  Package,
  Timer,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface OrdersPageProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: "new" | "ongoing" | "past"
}

type OrderTab = "new" | "ongoing" | "past"
type OrderStatus = "new" | "preparing" | "ready" | "completed"

interface OrderItem {
  name: string
  quantity: number
  price: number
  image?: string
}

interface Order {
  id: string
  customerName: string
  customerLocation?: string
  orderId: string
  amount: number
  itemCount: number
  items: OrderItem[]
  status: OrderStatus
  avatar: string
  timestamp?: string
  date: string
  time: string
  rating?: number
  phone?: string
}

interface OrderFilters {
  dateRange: {
    startDate: string
    endDate: string
  }
  amountRange: {
    minAmount: string
    maxAmount: string
  }
  customer: string
  status: string
  location: string
}

export default function OrdersPage({ isOpen, onClose, initialTab = "new" }: OrdersPageProps) {
  const [activeTab, setActiveTab] = useState<OrderTab>(initialTab)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const itemsPerPage = 4

  const [filters, setFilters] = useState<OrderFilters>({
    dateRange: { startDate: "", endDate: "" },
    amountRange: { minAmount: "", maxAmount: "" },
    customer: "",
    status: "",
    location: "",
  })

  const [orders, setOrders] = useState<Record<OrderTab, Order[]>>({
    new: [
      {
        id: "1",
        customerName: "Rahul Sharma",
        customerLocation: "Bandra West, Mumbai",
        orderId: "ORD-1001",
        amount: 568,
        itemCount: 5,
        items: [
          { name: "Paneer Tikka", quantity: 1, price: 320, image: "/images/paneer-tikka.png" },
          { name: "Chana Masala", quantity: 1, price: 280, image: "/images/chana-masala.png" },
          { name: "Aloo Gobi", quantity: 1, price: 250, image: "/images/aloo-gobi.png" },
          { name: "Dal Tadka", quantity: 1, price: 180, image: "/images/dal-tadka.png" },
          { name: "Vegetable Biryani", quantity: 1, price: 350, image: "/images/biryani.png" },
        ],
        status: "new",
        avatar: "RS",
        date: "2024-01-15",
        time: "10:30 AM",
        phone: "+91 98765 43210",
        rating: 4.5,
      },
      {
        id: "2",
        customerName: "Anita Desai",
        customerLocation: "Connaught Place, Delhi",
        orderId: "ORD-1002",
        amount: 750,
        itemCount: 3,
        items: [
          { name: "Paneer Butter Masala", quantity: 2, price: 300, image: "/images/paneer-tikka.png" },
          { name: "Garlic Naan", quantity: 4, price: 60 },
          { name: "Jeera Rice", quantity: 2, price: 150, image: "/images/biryani.png" },
        ],
        status: "new",
        avatar: "AD",
        date: "2024-01-15",
        time: "11:15 AM",
        phone: "+91 98765 43211",
        rating: 4.8,
      },
    ],
    ongoing: [
      {
        id: "6",
        customerName: "Rajesh Patel",
        customerLocation: "Satellite, Ahmedabad",
        orderId: "ORD-1006",
        amount: 568,
        itemCount: 4,
        items: [
          { name: "Gujarati Thali", quantity: 1, price: 350, image: "/images/food-placeholder.png" },
          { name: "Dhokla", quantity: 1, price: 120 },
          { name: "Khandvi", quantity: 1, price: 98 },
        ],
        status: "preparing",
        avatar: "RP",
        date: "2024-01-15",
        time: "09:30 AM",
        phone: "+91 98765 43216",
        rating: 4.3,
      },
    ],
    past: [
      {
        id: "9",
        customerName: "Meera Reddy",
        customerLocation: "Banjara Hills, Hyderabad",
        orderId: "ORD-1009",
        amount: 568,
        itemCount: 5,
        items: [
          { name: "Hyderabadi Biryani", quantity: 1, price: 450, image: "/images/biryani.png" },
          { name: "Haleem", quantity: 1, price: 280 },
          { name: "Double Ka Meetha", quantity: 1, price: 150 },
          { name: "Irani Chai", quantity: 2, price: 40 },
        ],
        status: "completed",
        avatar: "MR",
        date: "2024-01-14",
        time: "08:30 PM",
        phone: "+91 98765 43219",
        rating: 4.9,
      },
    ],
  })

  const [showToast, setShowToast] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "info"
  }>({ show: false, message: "", type: "success" })

  const applyFilters = (orders: Order[]) => {
    return orders.filter((order) => {
      const matchesSearch =
        !searchQuery ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerLocation?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDateRange =
        (!filters.dateRange.startDate || order.date >= filters.dateRange.startDate) &&
        (!filters.dateRange.endDate || order.date <= filters.dateRange.endDate)

      const matchesAmountRange =
        (!filters.amountRange.minAmount || order.amount >= Number.parseFloat(filters.amountRange.minAmount)) &&
        (!filters.amountRange.maxAmount || order.amount <= Number.parseFloat(filters.amountRange.maxAmount))

      const matchesCustomer =
        !filters.customer || order.customerName.toLowerCase().includes(filters.customer.toLowerCase())

      const matchesStatus = !filters.status || order.status === filters.status

      const matchesLocation =
        !filters.location || order.customerLocation?.toLowerCase().includes(filters.location.toLowerCase())

      return (
        matchesSearch && matchesDateRange && matchesAmountRange && matchesCustomer && matchesStatus && matchesLocation
      )
    })
  }

  const currentOrders = applyFilters(orders[activeTab])
  const totalPages = Math.ceil(currentOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = currentOrders.slice(startIndex, startIndex + itemsPerPage)

  const getTabCounts = () => ({
    new: orders.new.length,
    ongoing: orders.ongoing.length,
    past: orders.past.length,
  })

  const tabCounts = getTabCounts()

  const showToastMessage = (message: string, type: "success" | "error" | "info" = "success") => {
    setShowToast({ show: true, message, type })
    setTimeout(() => setShowToast({ show: false, message: "", type: "success" }), 3000)
  }

  const handleTabChange = (tab: OrderTab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev) => {
      const newOrders = { ...prev }
      const orderIndex = newOrders.new.findIndex((order) => order.id === orderId)
      if (orderIndex !== -1) {
        const acceptedOrder = { ...newOrders.new[orderIndex], status: "preparing" as OrderStatus }
        newOrders.new.splice(orderIndex, 1)
        newOrders.ongoing.unshift(acceptedOrder)
      }
      return newOrders
    })
    showToastMessage(`Order ${orderId} accepted successfully!`)
  }

  const handleRejectOrder = (orderId: string) => {
    setOrders((prev) => {
      const newOrders = { ...prev }
      newOrders.new = newOrders.new.filter((order) => order.id !== orderId)
      return newOrders
    })
    showToastMessage(`Order ${orderId} rejected`, "error")
  }

  const handleMarkReady = (orderId: string) => {
    setOrders((prev) => {
      const newOrders = { ...prev }
      const orderIndex = newOrders.ongoing.findIndex((order) => order.id === orderId)
      if (orderIndex !== -1) {
        newOrders.ongoing[orderIndex].status = "ready"
      }
      return newOrders
    })
    showToastMessage(`Order ${orderId} marked ready for pickup!`)
  }

  const handleViewItems = (order: Order) => {
    setSelectedOrder(order)
  }

  const getStatusButton = (order: Order) => {
    if (order.status === "preparing") {
      return (
        <Button
          onClick={() => handleMarkReady(order.id)}
          className="w-full h-11 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md"
        >
          <Package className="w-4 h-4 mr-2" />
          Mark Ready for Pickup
        </Button>
      )
    }
    if (order.status === "ready") {
      return (
        <div className="w-full h-11 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-medium rounded-lg flex items-center justify-center shadow-sm">
          <Timer className="w-4 h-4 mr-2" />
          Ready for Pickup
        </div>
      )
    }
    return null
  }

  const getActiveFilters = () => {
    const active = []
    if (filters.dateRange.startDate || filters.dateRange.endDate) {
      const dateText =
        filters.dateRange.startDate && filters.dateRange.endDate
          ? `${filters.dateRange.startDate} to ${filters.dateRange.endDate}`
          : filters.dateRange.startDate
            ? `From ${filters.dateRange.startDate}`
            : `Until ${filters.dateRange.endDate}`
      active.push({ key: "dateRange", label: `Date: ${dateText}` })
    }
    return active
  }

  const activeFilters = getActiveFilters()

  const handleRemoveFilter = (filterKey: string) => {
    const newFilters = { ...filters }
    switch (filterKey) {
      case "dateRange":
        newFilters.dateRange = { startDate: "", endDate: "" }
        break
    }
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleClearAllFilters = () => {
    setFilters({
      dateRange: { startDate: "", endDate: "" },
      amountRange: { minAmount: "", maxAmount: "" },
      customer: "",
      status: "",
      location: "",
    })
    setSearchQuery("")
    setCurrentPage(1)
  }

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

  if (!isOpen) return null

  return (
    <>
      <div className="fixed left-80 top-0 right-0 bottom-0 bg-gray-50 z-50 shadow-xl border-l border-gray-200 flex flex-col">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm p-4 pt-12 flex-shrink-0 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">Orders Management</h1>
              <p className="text-sm text-gray-500">Track and manage all orders</p>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">9:41</div>
          </div>
        </div>

        {/* Enhanced Summary Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  {currentOrders.length}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                  <DollarSign className="w-6 h-6 text-green-600" />₹
                  {currentOrders.reduce((sum, order) => sum + order.amount, 0).toFixed(0)}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">
                  <Star className="w-6 h-6 text-yellow-500" />
                  4.6
                </div>
                <div className="text-xs text-gray-500 font-medium">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex">
            <button
              onClick={() => handleTabChange("new")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "new"
                  ? "text-red-500 border-b-3 border-red-500 bg-red-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                New Orders
                {tabCounts.new > 0 && (
                  <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{tabCounts.new}</Badge>
                )}
              </div>
            </button>
            <button
              onClick={() => handleTabChange("ongoing")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "ongoing"
                  ? "text-blue-500 border-b-3 border-blue-500 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Package className="w-4 h-4" />
                In Progress
                {tabCounts.ongoing > 0 && (
                  <Badge className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{tabCounts.ongoing}</Badge>
                )}
              </div>
            </button>
            <button
              onClick={() => handleTabChange("past")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === "past"
                  ? "text-green-500 border-b-3 border-green-500 bg-green-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed
              </div>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border-b border-gray-100 p-4 flex-shrink-0">
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search orders, customers, locations..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-12 px-4 border-gray-300 hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content - Enhanced Order Cards */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="space-y-4 pb-20">
              {paginatedOrders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg font-medium">No orders found</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                paginatedOrders.map((order) => (
                  <Card
                    key={order.id}
                    className="border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex">
                        {/* Customer Info Section */}
                        <div className="flex-1 p-6">
                          <div className="flex items-start gap-4">
                            {/* Enhanced Avatar */}
                            <div
                              className={`w-14 h-14 ${getAvatarColor(order.customerName)} rounded-xl flex items-center justify-center shadow-md`}
                            >
                              <span className="text-white font-bold text-lg">{order.avatar}</span>
                            </div>

                            {/* Order Details */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-bold text-lg text-gray-900">{order.customerName}</h3>
                                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{order.customerLocation}</span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      {order.date} at {order.time}
                                    </div>
                                    {order.phone && (
                                      <div className="flex items-center gap-1">
                                        <Phone className="w-4 h-4" />
                                        {order.phone}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-gray-900">₹{order.amount}</div>
                                  <div className="text-sm text-gray-500">{order.itemCount} Items</div>
                                  {order.rating && (
                                    <div className="flex items-center gap-1 mt-1">
                                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                      <span className="text-sm font-medium text-gray-700">{order.rating}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Order ID Badge */}
                              <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline" className="text-sm font-mono">
                                  {order.orderId}
                                </Badge>
                                {activeTab === "new" && (
                                  <Badge className="bg-red-100 text-red-800 animate-pulse">🔥 HOT ORDER</Badge>
                                )}
                              </div>

                              {/* Items Preview with Images */}
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {order.items.slice(0, 3).map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                                    >
                                      {item.image && (
                                        <img
                                          src={item.image || "/placeholder.svg"}
                                          alt={item.name}
                                          className="w-6 h-6 rounded object-cover"
                                          onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.src = "/images/food-placeholder.png"
                                          }}
                                        />
                                      )}
                                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                      <span className="text-xs text-gray-500">x{item.quantity}</span>
                                    </div>
                                  ))}
                                  {order.items.length > 3 && (
                                    <div className="bg-gray-100 rounded-lg px-3 py-2">
                                      <span className="text-sm text-gray-600">+{order.items.length - 3} more...</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Action Buttons */}
                              {activeTab === "new" && (
                                <div className="space-y-3">
                                  <div className="flex gap-3">
                                    <Button
                                      onClick={() => handleAcceptOrder(order.id)}
                                      className="flex-1 h-11 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md"
                                    >
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Accept Order
                                    </Button>
                                    <Button
                                      onClick={() => handleRejectOrder(order.id)}
                                      variant="outline"
                                      className="flex-1 h-11 border-red-300 text-red-600 hover:bg-red-50 font-medium rounded-lg"
                                    >
                                      <X className="w-4 h-4 mr-2" />
                                      Reject
                                    </Button>
                                  </div>
                                  <button
                                    onClick={() => handleViewItems(order)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                                  >
                                    View Full Order Details
                                  </button>
                                </div>
                              )}

                              {activeTab === "ongoing" && getStatusButton(order)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, currentOrders.length)} of{" "}
                {currentOrders.length} orders
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded">
                  {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Order Details Modal */}
      {selectedOrder && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setSelectedOrder(null)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl max-h-[85vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 ${getAvatarColor(selectedOrder.customerName)} rounded-xl flex items-center justify-center shadow-md`}
                    >
                      <span className="text-white font-bold text-lg">{selectedOrder.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{selectedOrder.customerName}</h3>
                      <p className="text-gray-600">{selectedOrder.customerLocation}</p>
                      <p className="text-sm text-gray-500">{selectedOrder.orderId}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-96">
                <h4 className="font-bold text-lg text-gray-900 mb-4">Order Items</h4>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/images/food-placeholder.png"
                            }}
                          />
                        )}
                        <div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <div className="text-sm text-gray-500">₹{item.price} each</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">x{item.quantity}</div>
                        <div className="text-sm text-gray-600">₹{item.price * item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">₹{selectedOrder.amount}</span>
                </div>
                {activeTab === "new" && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        handleRejectOrder(selectedOrder.id)
                        setSelectedOrder(null)
                      }}
                      variant="outline"
                      className="flex-1 h-12 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject Order
                    </Button>
                    <Button
                      onClick={() => {
                        handleAcceptOrder(selectedOrder.id)
                        setSelectedOrder(null)
                      }}
                      className="flex-1 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Order
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Enhanced Toast Notification */}
      {showToast.show && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in ${
            showToast.type === "success"
              ? "bg-green-500 text-white"
              : showToast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          <span className="font-medium">{showToast.message}</span>
          <button
            onClick={() => setShowToast({ show: false, message: "", type: "success" })}
            className="text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  )
}
