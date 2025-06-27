import React, { useState } from 'react'
import { Search, Filter, Eye } from 'lucide-react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { Input, Select } from '../../components/Form'

const OrdersList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [viewModal, setViewModal] = useState({ isOpen: false, order: null })

  const [orders] = useState([
    {
      id: 1,
      orderId: "ORD-001",
      customer: "John Doe",
      restaurant: "Spice Garden",
      items: 3,
      amount: 450,
      status: "Delivered",
      date: "2024-01-15",
      time: "12:30 PM"
    },
    {
      id: 2,
      orderId: "ORD-002",
      customer: "Jane Smith",
      restaurant: "Pizza Palace",
      items: 2,
      amount: 320,
      status: "Preparing",
      date: "2024-01-15",
      time: "01:15 PM"
    },
    {
      id: 3,
      orderId: "ORD-003",
      customer: "Mike Johnson",
      restaurant: "Burger Hub",
      items: 1,
      amount: 180,
      status: "Cancelled",
      date: "2024-01-15",
      time: "02:00 PM"
    }
  ])

  const columns = [
    { header: "Order ID", accessor: "orderId" },
    { header: "Customer", accessor: "customer" },
    { header: "Restaurant", accessor: "restaurant" },
    { 
      header: "Items", 
      accessor: "items",
      render: (value) => `${value} items`
    },
    { 
      header: "Amount", 
      accessor: "amount",
      render: (value) => `₹${value}`
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Delivered' ? 'bg-green-100 text-green-800' :
          value === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
          value === 'Cancelled' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleView = (order) => {
    setViewModal({ isOpen: true, order })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
        <p className="text-gray-600">Track and manage all orders</p>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-48"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          columns={columns}
          data={filteredOrders}
          onEdit={handleView}
          showActions={true}
          onDelete={null}
        />
      </div>

      {/* View Order Modal */}
      <Modal
        isOpen={viewModal.isOpen}
        onClose={() => setViewModal({ isOpen: false, order: null })}
        title={`Order Details - ${viewModal.order?.orderId}`}
        size="lg"
      >
        {viewModal.order && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Customer</label>
                <p className="text-gray-900">{viewModal.order.customer}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Restaurant</label>
                <p className="text-gray-900">{viewModal.order.restaurant}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Order Date</label>
                <p className="text-gray-900">{viewModal.order.date} at {viewModal.order.time}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  viewModal.order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  viewModal.order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800' :
                  viewModal.order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {viewModal.order.status}
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Total Amount</label>
              <p className="text-2xl font-bold text-gray-900">₹{viewModal.order.amount}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default OrdersList