"use client"

import { useState } from "react"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Clock,
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
  orderId: string
  amount: number
  itemCount: number
  items: OrderItem[]
  status: OrderStatus
  timestamp?: string
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
      },
      {
        id: "2",
        customerName: "Anita Desai",
        orderId: "ORD-1002",
        amount: 750,
        itemCount: 3,
        items: [
          { name: "Paneer Butter Masala", quantity: 2, price: 300, image: "/images/paneer-tikka.png" },
          { name: "Garlic Naan", quantity: 4, price: 60, image: "/images/food-placeholder.png" },
          { name: "Jeera Rice", quantity: 2, price: 150, image: "/images/biryani.png" },
        ],
        status: "new",
      },
    ],
    ongoing: [
      {
        id: "6",
        customerName: "Rajesh Patel",
        orderId: "ORD-1006",
        amount: 568,
        itemCount: 4,
        items: [
          { name: "Gujarati Thali", quantity: 1, price: 350, image: "/images/food-placeholder.png" },
          { name: "Dhokla", quantity: 1, price: 120, image: "/images/food-placeholder.png" },
          { name: "Khandvi", quantity: 1, price: 98, image: "/images/food-placeholder.png" },
        ],
        status: "preparing",
      },
    ],
    past: [
      {
        id: "9",
        customerName: "Meera Reddy",
        orderId: "ORD-1009",
        amount: 568,
        itemCount: 5,
        items: [
          { name: "Hyderabadi Biryani", quantity: 1, price: 450, image: "/images/biryani.png" },
          { name: "Haleem", quantity: 1, price: 280, image: "/images/food-placeholder.png" },
          { name: "Double Ka Meetha", quantity: 1, price: 150, image: "/images/food-placeholder.png" },
          { name: "Irani Chai", quantity: 2, price: 40, image: "/images/food-placeholder.png" },
        ],
        status: "completed",
      },
    ],
  })

  const [showToast, setShowToast] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "info"
  }>({ show: false, message: "", type: "success" })

  const [paginationState, setPaginationState] = useState<Record<OrderTab, number>>({
    new: 1,
    ongoing: 1,
    past: 1,
  })


  const setCurrentPage = (page: number) => {
    setPaginationState((prev) => ({ ...prev, [activeTab]: page }))
  }

  const currentPage = paginationState[activeTab]

  const applyFilters = (orders: Order[]) => {
    return orders.filter((order) => {
      const matchesSearch =
        !searchQuery ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesAmountRange =
        (!filters.amountRange.minAmount || order.amount >= Number.parseFloat(filters.amountRange.minAmount)) &&
        (!filters.amountRange.maxAmount || order.amount <= Number.parseFloat(filters.amountRange.maxAmount))

      const matchesCustomer =
        !filters.customer || order.customerName.toLowerCase().includes(filters.customer.toLowerCase())

      const matchesStatus = !filters.status || order.status === filters.status

      return (
        matchesSearch && matchesAmountRange && matchesCustomer && matchesStatus
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
    setShowFilters(false)  // ⬅️ Close filters on tab switch
    setCurrentPage(1)      // ⬅️ Reset pagination
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
          className="w-full h-11 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg shadow-md"
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

  if (!isOpen) return null

  return (
    <>
      {/* Demo loader button, remove in production */}
      <div className="fixed left-80 top-0 right-0 bottom-0 bg-gray-50 z-50 shadow-xl border-l border-gray-200 flex flex-col">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm p-4 pt-12 flex-shrink-0 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close orders panel"
            >
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">Orders Management</h1>
              <p className="text-sm text-gray-500">Track and manage all orders</p>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex">
            <button
              onClick={() => handleTabChange("new")}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === "new"
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
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === "ongoing"
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
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${activeTab === "past"
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
              {showFilters && (
                <div className="mb-6 p-6 border border-gray-200 bg-white rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Orders</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                      <Input
                        placeholder="Enter customer name"
                        value={filters.customer}
                        onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                      <Input
                        placeholder="e.g., new, preparing, ready"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                      <Input
                        type="number"
                        placeholder="Minimum ₹"
                        value={filters.amountRange.minAmount}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            amountRange: { ...filters.amountRange, minAmount: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                      <Input
                        type="number"
                        placeholder="Maximum ₹"
                        value={filters.amountRange.maxAmount}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            amountRange: { ...filters.amountRange, maxAmount: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setFilters({
                          dateRange: { startDate: "", endDate: "" },
                          amountRange: { minAmount: "", maxAmount: "" },
                          customer: "",
                          status: "",
                          location: "",
                        })
                        setShowFilters(false)
                      }}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={() => setShowFilters(false)}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}

              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search orders, customers..."
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
              className="h-12 px-4 border-gray-300 hover:bg-red-50 text-red-600"
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
                            <div
                              className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md`}
                            >
                              <img
                                src="/images/user.jpg"
                                alt="Logo"
                                className="w-full h-full object-contain"
                              />
                            </div>

                            {/* Order Details */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-bold text-lg text-gray-900">{order.customerName}</h3>
                                  <p className="text-sm text-gray-900">{order.orderId}</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-gray-900">₹{order.amount}</div>
                                  <div className="text-sm text-gray-900">{order.itemCount} Items</div>
                                </div>
                              </div>

                              {/* Order ID Badge */}
                              {/* <div className="flex items-center gap-2 mb-3">
                                <Badge variant="outline" className="text-sm font-mono">
                                  {order.orderId}
                                </Badge>
                              </div> */}

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
                                      className="flex-1 h-11 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg shadow-md"
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
                                    className="text-red-600 hover:text-red-800 text-sm font-medium underline"
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
        {true && (
          <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, currentOrders.length)} of {currentOrders.length} orders
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                  title="Previous page"
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
                  title="Next page"
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
                      className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-md`}
                    >
                      <img
                        src="/images/user.jpg"
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{selectedOrder.customerName}</h3>
                      <p className="text-sm text-gray-500">{selectedOrder.orderId}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Close details"
                  >
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
                      className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
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
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in ${showToast.type === "success"
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
            title="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  )
}
