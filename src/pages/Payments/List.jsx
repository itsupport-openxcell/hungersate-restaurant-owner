import React, { useState } from 'react'
import { Search, Download } from 'lucide-react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import { Input, Select } from '../../components/Form'

const PaymentsList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [payments] = useState([
    {
      id: 1,
      transactionId: "TXN-001",
      orderId: "ORD-001",
      restaurant: "Spice Garden",
      amount: 450,
      commission: 45,
      netAmount: 405,
      status: "Completed",
      method: "UPI",
      date: "2024-01-15"
    },
    {
      id: 2,
      transactionId: "TXN-002",
      orderId: "ORD-002",
      restaurant: "Pizza Palace",
      amount: 320,
      commission: 32,
      netAmount: 288,
      status: "Pending",
      method: "Card",
      date: "2024-01-15"
    },
    {
      id: 3,
      transactionId: "TXN-003",
      orderId: "ORD-003",
      restaurant: "Burger Hub",
      amount: 180,
      commission: 18,
      netAmount: 162,
      status: "Failed",
      method: "Wallet",
      date: "2024-01-15"
    }
  ])

  const columns = [
    { header: "Transaction ID", accessor: "transactionId" },
    { header: "Order ID", accessor: "orderId" },
    { header: "Restaurant", accessor: "restaurant" },
    { 
      header: "Amount", 
      accessor: "amount",
      render: (value) => `₹${value}`
    },
    { 
      header: "Commission", 
      accessor: "commission",
      render: (value) => `₹${value}`
    },
    { 
      header: "Net Amount", 
      accessor: "netAmount",
      render: (value) => `₹${value}`
    },
    { header: "Method", accessor: "method" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-green-100 text-green-800' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { header: "Date", accessor: "date" }
  ]

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !statusFilter || payment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    // Export functionality
    console.log('Exporting payments data...')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments Management</h1>
          <p className="text-gray-600">Track and manage all payment transactions</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search payments..."
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
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold text-gray-900">₹9,50,000</div>
          <div className="text-sm text-green-600">+12% from last month</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">Commission Earned</div>
          <div className="text-2xl font-bold text-gray-900">₹95,000</div>
          <div className="text-sm text-green-600">+8% from last month</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">Pending Payments</div>
          <div className="text-2xl font-bold text-gray-900">₹25,000</div>
          <div className="text-sm text-yellow-600">5 transactions</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-sm font-medium text-gray-500">Failed Payments</div>
          <div className="text-2xl font-bold text-gray-900">₹5,000</div>
          <div className="text-sm text-red-600">2 transactions</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          columns={columns}
          data={filteredPayments}
          showActions={false}
        />
      </div>
    </div>
  )
}

export default PaymentsList