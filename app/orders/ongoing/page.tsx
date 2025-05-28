"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderDetailsDialog } from "@/components/OrderDetailsDialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Layout from "@/components/Layout"
import { Search, Clock, Truck, Package, Eye, CheckCircle } from "lucide-react"

// Mock ongoing orders data
const mockOngoingOrders = [
  {
    id: "ORD004",
    customerName: "Sarah Wilson",
    customerPhone: "+91 9876543213",
    customerAddress: "321 Pine Street, Mumbai, Maharashtra 400004",
    items: [
      { name: "Chicken Tikka", quantity: 1, price: 200 },
      { name: "Garlic Naan", quantity: 2, price: 50 },
    ],
    totalAmount: 300,
    status: "preparing",
    paymentStatus: "paid",
    orderTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 20 * 60 * 1000),
    deliveryPerson: {
      name: "Raj Kumar",
      phone: "+91 9876543220",
    },
  },
  {
    id: "ORD005",
    customerName: "David Brown",
    customerPhone: "+91 9876543214",
    customerAddress: "654 Elm Street, Mumbai, Maharashtra 400005",
    items: [
      { name: "Mutton Curry", quantity: 1, price: 280 },
      { name: "Rice", quantity: 1, price: 80 },
    ],
    totalAmount: 360,
    status: "ready_for_pickup",
    paymentStatus: "paid",
    orderTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000),
    deliveryPerson: {
      name: "Amit Singh",
      phone: "+91 9876543221",
    },
  },
  {
    id: "ORD006",
    customerName: "Lisa Anderson",
    customerPhone: "+91 9876543215",
    customerAddress: "987 Maple Avenue, Mumbai, Maharashtra 400006",
    items: [
      { name: "Vegetable Biryani", quantity: 2, price: 220 },
      { name: "Pickle", quantity: 1, price: 30 },
    ],
    totalAmount: 470,
    status: "out_for_delivery",
    paymentStatus: "paid",
    orderTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 10 * 60 * 1000),
    deliveryPerson: {
      name: "Suresh Patel",
      phone: "+91 9876543222",
    },
  },
]

export default function OngoingOrders() {
  const [orders, setOrders] = useState(mockOngoingOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 6

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    alert(`Order ${orderId} status updated to ${newStatus.replace("_", " ")}!`)
  }

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    }
  }

  const formatEstimatedTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((date.getTime() - now.getTime()) / (1000 * 60))

    if (diffInMinutes <= 0) {
      return "Due now"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} mins`
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60)
      return `${diffInHours}h ${diffInMinutes % 60}m`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-orange-100 text-orange-800"
      case "ready_for_pickup":
        return "bg-purple-100 text-purple-800"
      case "out_for_delivery":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const preparingCount = orders.filter((order) => order.status === "preparing").length
  const readyCount = orders.filter((order) => order.status === "ready_for_pickup").length
  const deliveryCount = orders.filter((order) => order.status === "out_for_delivery").length

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Ongoing Orders</h1>
            <p className="text-gray-600 mt-1">Track and manage orders in progress</p>
          </div>
          <Badge variant="default" className="text-lg px-3 py-1">
            {orders.length} Active
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Ongoing</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Preparing</p>
                  <p className="text-2xl font-bold text-orange-600">{preparingCount}</p>
                </div>
                <Package className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ready for Pickup</p>
                  <p className="text-2xl font-bold text-purple-600">{readyCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Out for Delivery</p>
                  <p className="text-2xl font-bold text-blue-600">{deliveryCount}</p>
                </div>
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="ready_for_pickup">Ready for Pickup</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace("_", " ").toUpperCase()}
                      </Badge>
                      <Badge variant="default">PAID</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Customer:</strong> {order.customerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Phone:</strong> {order.customerPhone}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Items:</strong> {order.items.map((item) => item.name).join(", ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Delivery Person:</strong> {order.deliveryPerson.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Contact:</strong> {order.deliveryPerson.phone}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Order Time:</strong> {formatTime(order.orderTime)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>ETA:</strong> {formatEstimatedTime(order.estimatedDelivery)}
                        </p>
                        <p className="text-lg font-bold text-green-600">₹{order.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    {order.status === "preparing" && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id, "ready_for_pickup")}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Ready
                      </Button>
                    )}
                    {order.status === "ready_for_pickup" && (
                      <Button
                        size="sm"
                        onClick={() => handleUpdateStatus(order.id, "out_for_delivery")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Truck className="w-4 h-4 mr-1" />
                        Out for Delivery
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No ongoing orders found.</p>
            </CardContent>
          </Card>
        )}

        {/* Order Details Dialog */}
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onUpdateStatus={handleUpdateStatus}
          type="ongoing"
        />
      </div>
    </Layout>
  )
}
