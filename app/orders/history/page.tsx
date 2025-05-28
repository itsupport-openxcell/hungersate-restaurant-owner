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
import { Search, CheckCircle, XCircle, Eye, Star, History, Download } from "lucide-react"

// Mock order history data
const mockOrderHistory = [
  {
    id: "ORD007",
    customerName: "Robert Johnson",
    customerPhone: "+91 9876543216",
    customerAddress: "147 Oak Lane, Mumbai, Maharashtra 400007",
    items: [
      { name: "Fish Curry", quantity: 1, price: 240 },
      { name: "Rice", quantity: 1, price: 80 },
    ],
    totalAmount: 320,
    status: "completed",
    paymentStatus: "paid",
    orderTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
    completionTime: new Date(Date.now() - 23 * 60 * 60 * 1000),
    rating: 5,
    feedback: "Excellent food and fast delivery! Will order again.",
    deliveryPerson: "Raj Kumar",
  },
  {
    id: "ORD008",
    customerName: "Emily Davis",
    customerPhone: "+91 9876543217",
    customerAddress: "258 Pine Road, Mumbai, Maharashtra 400008",
    items: [
      { name: "Chicken Korma", quantity: 1, price: 200 },
      { name: "Roti", quantity: 3, price: 30 },
    ],
    totalAmount: 290,
    status: "completed",
    paymentStatus: "paid",
    orderTime: new Date(Date.now() - 48 * 60 * 60 * 1000),
    completionTime: new Date(Date.now() - 47 * 60 * 60 * 1000),
    rating: 4,
    feedback: "Good taste but delivery was a bit late.",
    deliveryPerson: "Amit Singh",
  },
  {
    id: "ORD009",
    customerName: "Michael Wilson",
    customerPhone: "+91 9876543218",
    customerAddress: "369 Cedar Street, Mumbai, Maharashtra 400009",
    items: [{ name: "Lamb Biryani", quantity: 1, price: 300 }],
    totalAmount: 300,
    status: "cancelled",
    paymentStatus: "refunded",
    orderTime: new Date(Date.now() - 72 * 60 * 60 * 1000),
    completionTime: new Date(Date.now() - 71 * 60 * 60 * 1000),
    rating: null,
    feedback: null,
    deliveryPerson: null,
  },
]

const exportOrdersToCSV = (orders: any[]) => {
  const csvContent = [
    ["Order ID", "Customer Name", "Total Amount", "Status", "Payment Status", "Order Date", "Rating"].join(","),
    ...orders.map((order) =>
      [
        order.id,
        order.customerName,
        order.totalAmount,
        order.status,
        order.paymentStatus,
        order.orderTime.toLocaleDateString(),
        order.rating || "N/A",
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "order-history.csv"
  a.click()
  window.URL.revokeObjectURL(url)
}

export default function OrderHistory() {
  const [orders] = useState(mockOrderHistory)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 6

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
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const completedCount = orders.filter((order) => order.status === "completed").length
  const cancelledCount = orders.filter((order) => order.status === "cancelled").length
  const totalRevenue = orders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.totalAmount, 0)
  const averageRating = orders
    .filter((order) => order.rating)
    .reduce((sum, order, _, arr) => sum + (order.rating || 0) / arr.length, 0)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Order History</h1>
            <p className="text-gray-600 mt-1">View completed and cancelled orders</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportOrdersToCSV(filteredOrders)}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Badge variant="default" className="text-lg px-3 py-1">
              {orders.length} Total
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <History className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">{cancelledCount}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">₹{totalRevenue.toLocaleString()}</p>
                </div>
                <Star className="w-8 h-8 text-purple-500" />
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
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
                      <Badge className={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
                      <Badge variant={order.paymentStatus === "paid" ? "default" : "destructive"}>
                        {order.paymentStatus.toUpperCase()}
                      </Badge>
                      {order.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{order.rating}/5</span>
                        </div>
                      )}
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
                          <strong>Order Date:</strong> {formatTime(order.orderTime)}
                        </p>
                        {order.completionTime && (
                          <p className="text-sm text-gray-600">
                            <strong>Completed:</strong> {formatTime(order.completionTime)}
                          </p>
                        )}
                        {order.deliveryPerson && (
                          <p className="text-sm text-gray-600">
                            <strong>Delivered by:</strong> {order.deliveryPerson}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-600">₹{order.totalAmount}</p>
                        {order.feedback && <p className="text-sm text-gray-600 italic mt-1">"{order.feedback}"</p>}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
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
              <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No order history found.</p>
            </CardContent>
          </Card>
        )}

        {/* Order Details Dialog */}
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          type="history"
        />
      </div>
    </Layout>
  )
}
