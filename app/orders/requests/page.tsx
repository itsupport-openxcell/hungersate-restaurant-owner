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
import { Search, Clock, CheckCircle, XCircle, Eye, AlertCircle } from "lucide-react"

// Mock order requests data
const mockOrderRequests = [
  {
    id: "ORD001",
    customerName: "John Doe",
    customerPhone: "+91 9876543210",
    customerAddress: "123 Main Street, Mumbai, Maharashtra 400001",
    items: [
      { name: "Butter Chicken", quantity: 2, price: 180 },
      { name: "Naan", quantity: 4, price: 40 },
    ],
    totalAmount: 520,
    status: "pending",
    paymentStatus: "paid",
    orderTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000),
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    customerPhone: "+91 9876543211",
    customerAddress: "456 Park Avenue, Mumbai, Maharashtra 400002",
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 250 },
      { name: "Raita", quantity: 1, price: 60 },
    ],
    totalAmount: 310,
    status: "pending",
    paymentStatus: "paid",
    orderTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000),
  },
  {
    id: "ORD003",
    customerName: "Mike Johnson",
    customerPhone: "+91 9876543212",
    customerAddress: "789 Oak Street, Mumbai, Maharashtra 400003",
    items: [
      { name: "Paneer Tikka", quantity: 1, price: 160 },
      { name: "Dal Makhani", quantity: 1, price: 140 },
    ],
    totalAmount: 300,
    status: "pending",
    paymentStatus: "unpaid",
    orderTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 60 * 60 * 1000),
  },
]

export default function OrderRequests() {
  const [orders, setOrders] = useState(mockOrderRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 6

  const handleAcceptOrder = (orderId: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: "accepted" } : order)))
    alert(`Order ${orderId} has been accepted successfully!`)
  }

  const handleRejectOrder = (orderId: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: "rejected" } : order)))
    alert(`Order ${orderId} has been rejected.`)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const pendingCount = orders.filter((order) => order.status === "pending").length
  const acceptedCount = orders.filter((order) => order.status === "accepted").length
  const rejectedCount = orders.filter((order) => order.status === "rejected").length

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Order Requests</h1>
            <p className="text-gray-600 mt-1">Review and manage incoming order requests</p>
          </div>
          <Badge variant="destructive" className="text-lg px-3 py-1">
            {pendingCount} Pending
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-green-600">{acceptedCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      <Badge variant={order.paymentStatus === "paid" ? "default" : "destructive"}>
                        {order.paymentStatus}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Customer:</strong> {order.customerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Phone:</strong> {order.customerPhone}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Address:</strong> {order.customerAddress}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Items:</strong> {order.items.map((item) => item.name).join(", ")}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Order Time:</strong> {formatTime(order.orderTime)}
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
                    {order.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleAcceptOrder(order.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleRejectOrder(order.id)}>
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
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
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No order requests found.</p>
            </CardContent>
          </Card>
        )}

        {/* Order Details Dialog */}
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAccept={handleAcceptOrder}
          onReject={handleRejectOrder}
          type="request"
        />
      </div>
    </Layout>
  )
}
