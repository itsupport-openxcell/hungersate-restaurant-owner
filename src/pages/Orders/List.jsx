import React, { useState } from 'react'
import { Search, Filter, Eye, X, CheckCircle, Package, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../components/Button'
import { Input, Select } from '../../components/Form'
import Modal from '../../components/Modal'
import Pagination from '../../components/Pagination'
import toast from 'react-hot-toast'

const OrdersList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [viewModal, setViewModal] = useState({ isOpen: false, order: null })
  const [activeTab, setActiveTab] = useState("new")
  
  // Pagination state for each tab
  const [paginationState, setPaginationState] = useState({
    new: 1,
    ongoing: 1,
    completed: 1
  })
  
  // Filter states
  const [filters, setFilters] = useState({
    status: "",
    dateRange: { startDate: "", endDate: "" },
    amountRange: { min: "", max: "" }
  })

  // Mock data
  const [orders, setOrders] = useState({
    new: [
      {
        id: "1",
        orderId: "ORD-1001",
        customer: "John Doe",
        items: [
          { name: "Paneer Tikka", quantity: 1, price: 320, image: "/images/paneer-tikka.png" },
          { name: "Chana Masala", quantity: 1, price: 280, image: "/images/chana-masala.png" },
          { name: "Aloo Gobi", quantity: 1, price: 250, image: "/images/aloo-gobi.png" },
          { name: "Dal Tadka", quantity: 1, price: 180, image: "/images/dal-tadka.png" },
          { name: "Vegetable Biryani", quantity: 1, price: 350, image: "/images/biryani.png" },
        ],
        amount: 568,
        status: "new",
        date: "2024-06-04",
        time: "12:30 PM"
      },
      {
        id: "2",
        orderId: "ORD-1002",
        customer: "Sarah Wilson",
        items: [
          { name: "Paneer Butter Masala", quantity: 2, price: 350, image: "/images/paneer-tikka.png" },
          { name: "Garlic Naan", quantity: 4, price: 60, image: "/images/food-placeholder.png" },
          { name: "Jeera Rice", quantity: 2, price: 150, image: "/images/biryani.png" },
        ],
        amount: 750,
        status: "new",
        date: "2024-06-04",
        time: "12:15 PM"
      },
      {
        id: "3",
        orderId: "ORD-1003",
        customer: "David Brown",
        items: [
          { name: "Chicken Tikka", quantity: 1, price: 380, image: "/images/food-placeholder.png" },
          { name: "Butter Naan", quantity: 2, price: 70, image: "/images/food-placeholder.png" },
        ],
        amount: 520,
        status: "new",
        date: "2024-06-04",
        time: "11:45 AM"
      },
    ],
    ongoing: [
      {
        id: "6",
        orderId: "ORD-1006",
        customer: "Mike Johnson",
        items: [
          { name: "Gujarati Thali", quantity: 1, price: 350, image: "/images/food-placeholder.png" },
          { name: "Dhokla", quantity: 1, price: 120, image: "/images/food-placeholder.png" },
          { name: "Khandvi", quantity: 1, price: 98, image: "/images/food-placeholder.png" },
        ],
        amount: 568,
        status: "preparing",
        date: "2024-06-04",
        time: "11:45 AM"
      },
      {
        id: "7",
        orderId: "ORD-1007",
        customer: "Lisa Taylor",
        items: [
          { name: "Masala Dosa", quantity: 2, price: 180, image: "/images/food-placeholder.png" },
          { name: "Sambar", quantity: 2, price: 80, image: "/images/food-placeholder.png" },
          { name: "Coconut Chutney", quantity: 2, price: 40, image: "/images/food-placeholder.png" },
        ],
        amount: 600,
        status: "preparing",
        date: "2024-06-04",
        time: "11:30 AM"
      },
    ],
    completed: [
      {
        id: "9",
        orderId: "ORD-1009",
        customer: "Emily Davis",
        items: [
          { name: "Hyderabadi Biryani", quantity: 1, price: 450, image: "/images/biryani.png" },
          { name: "Haleem", quantity: 1, price: 280, image: "/images/food-placeholder.png" },
          { name: "Double Ka Meetha", quantity: 1, price: 150, image: "/images/food-placeholder.png" },
          { name: "Irani Chai", quantity: 2, price: 40, image: "/images/food-placeholder.png" },
        ],
        amount: 568,
        status: "completed",
        date: "2024-06-04",
        time: "10:30 AM"
      },
      {
        id: "10",
        orderId: "ORD-1010",
        customer: "Robert Wilson",
        items: [
          { name: "Chole Bhature", quantity: 2, price: 220, image: "/images/food-placeholder.png" },
          { name: "Lassi", quantity: 2, price: 80, image: "/images/food-placeholder.png" },
        ],
        amount: 600,
        status: "completed",
        date: "2024-06-04",
        time: "10:15 AM"
      },
      {
        id: "11",
        orderId: "ORD-1011",
        customer: "Jennifer Smith",
        items: [
          { name: "Pav Bhaji", quantity: 1, price: 180, image: "/images/food-placeholder.png" },
          { name: "Masala Chai", quantity: 2, price: 40, image: "/images/food-placeholder.png" },
        ],
        amount: 260,
        status: "completed",
        date: "2024-06-04",
        time: "09:45 AM"
      },
    ],
  })

  const itemsPerPage = 2
  
  const getCurrentOrders = () => {
    // Apply filters if needed
    return orders[activeTab] || []
  }
  
  const currentOrders = getCurrentOrders()
  const currentPage = paginationState[activeTab]
  const totalPages = Math.ceil(currentOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOrders = currentOrders.slice(startIndex, startIndex + itemsPerPage)

  const getTabCounts = () => ({
    new: orders.new.length,
    ongoing: orders.ongoing.length,
    completed: orders.completed.length,
  })

  const tabCounts = getTabCounts()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handlePageChange = (page) => {
    setPaginationState(prev => ({
      ...prev,
      [activeTab]: page
    }))
  }

  const handleViewOrder = (order) => {
    setViewModal({ isOpen: true, order })
  }

  const handleAcceptOrder = (orderId) => {
    // Move order from new to ongoing
    const orderIndex = orders.new.findIndex(order => order.id === orderId)
    if (orderIndex !== -1) {
      const acceptedOrder = { ...orders.new[orderIndex], status: "preparing" }
      setOrders(prev => ({
        ...prev,
        new: prev.new.filter(order => order.id !== orderId),
        ongoing: [...prev.ongoing, acceptedOrder]
      }))
      toast.success(`Order ${acceptedOrder.orderId} accepted successfully!`)
    }
    setViewModal({ isOpen: false, order: null })
  }

  const handleRejectOrder = (orderId) => {
    // Remove order from new
    setOrders(prev => ({
      ...prev,
      new: prev.new.filter(order => order.id !== orderId)
    }))
    toast.error(`Order rejected`)
    setViewModal({ isOpen: false, order: null })
  }

  const handleMarkReady = (orderId) => {
    // Update order status in ongoing
    setOrders(prev => ({
      ...prev,
      ongoing: prev.ongoing.map(order => 
        order.id === orderId ? { ...order, status: "ready" } : order
      )
    }))
    toast.success(`Order marked ready for pickup!`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600">Track and manage all orders</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex">
          <button
            onClick={() => handleTabChange("new")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "new"
                ? "text-red-500 border-b-2 border-red-500 bg-red-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>New Orders</span>
              {tabCounts.new > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{tabCounts.new}</span>
              )}
            </div>
          </button>
          <button
            onClick={() => handleTabChange("ongoing")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "ongoing"
                ? "text-blue-500 border-b-2 border-blue-500 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>In Progress</span>
              {tabCounts.ongoing > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{tabCounts.ongoing}</span>
              )}
            </div>
          </button>
          <button
            onClick={() => handleTabChange("completed")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "completed"
                ? "text-green-500 border-b-2 border-green-500 bg-green-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span>Completed</span>
              {tabCounts.completed > 0 && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">{tabCounts.completed}</span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search orders, customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-lg"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="h-12 px-4 border-gray-300 hover:bg-gray-50 text-red-600"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-6 border border-gray-200 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Orders</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <Input
                  placeholder="Enter customer name"
                  value=""
                  onChange={() => {}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                <Input
                  placeholder="e.g., new, preparing, ready"
                  value=""
                  onChange={() => {}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
                <Input
                  type="number"
                  placeholder="Minimum ₹"
                  value=""
                  onChange={() => {}}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
                <Input
                  type="number"
                  placeholder="Maximum ₹"
                  value=""
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowFilters(false)}
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
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {paginatedOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No orders found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden bg-white"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Order Image */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md">
                    <img
                      src="/images/orders.gif"
                      alt="Order Animation"
                      className="w-full h-full object-contain"
                      onError={e => {
                        const target = e.target
                        target.src = "/images/food-placeholder.png"
                      }}
                    />
                  </div>
                  
                  {/* Order Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{order.orderId}</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">₹{order.amount}</div>
                        <div className="text-sm text-gray-900">{order.items.length} Items</div>
                      </div>
                    </div>

                    {/* Items Preview */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                          >
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-6 h-6 rounded object-cover"
                                onError={(e) => {
                                  const target = e.target
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
                          onClick={() => handleViewOrder(order)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                        >
                          View Full Order Details
                        </button>
                      </div>
                    )}

                    {activeTab === "ongoing" && (
                      <Button
                        onClick={() => handleMarkReady(order.id)}
                        className="w-full h-11 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg shadow-md"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Mark Ready for Pickup
                      </Button>
                    )}

                    {activeTab === "completed" && (
                      <Button
                        onClick={() => handleViewOrder(order)}
                        variant="outline"
                        className="w-full h-11 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Order Details
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={currentOrders.length}
          itemsPerPage={itemsPerPage}
        />
      )}

      {/* View Order Modal */}
      <Modal
        isOpen={viewModal.isOpen}
        onClose={() => setViewModal({ isOpen: false, order: null })}
        title={`Order Details - ${viewModal.order?.orderId}`}
        size="lg"
      >
        {viewModal.order && (
          <div className="space-y-4">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Order Items</h4>
            <div className="space-y-4">
              {viewModal.order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target
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

            <div className="p-6 border-t border-gray-200 bg-gray-50 mt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">₹{viewModal.order.amount}</span>
              </div>
              {activeTab === "new" && (
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleRejectOrder(viewModal.order.id)}
                    variant="outline"
                    className="flex-1 h-12 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject Order
                  </Button>
                  <Button
                    onClick={() => handleAcceptOrder(viewModal.order.id)}
                    className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Accept Order
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default OrdersList