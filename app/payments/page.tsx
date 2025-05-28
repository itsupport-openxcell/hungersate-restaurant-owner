"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BankAccountDialog } from "@/components/BankAccountDialog"
import { TransactionDetailsDialog } from "@/components/TransactionDetailsDialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Layout from "@/components/Layout"
import { Plus, Edit, Trash2, Search, CreditCard, TrendingUp, Calendar, Download, Building2, Clock } from "lucide-react"

// Mock transaction data with more details
const mockTransactions = [
  {
    id: "TXN001",
    orderId: "ORD001",
    amount: 450,
    status: "completed",
    paymentMethod: "UPI",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+91 9876543210",
    notes: "Payment completed successfully via PhonePe",
  },
  {
    id: "TXN002",
    orderId: "ORD002",
    amount: 320,
    status: "pending",
    paymentMethod: "Credit Card",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+91 9876543211",
    notes: "Payment verification in progress",
  },
  {
    id: "TXN003",
    orderId: "ORD003",
    amount: 280,
    status: "completed",
    paymentMethod: "Net Banking",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    customerPhone: "+91 9876543212",
    notes: "Payment completed via HDFC Bank",
  },
  {
    id: "TXN004",
    orderId: "ORD004",
    amount: 150,
    status: "failed",
    paymentMethod: "UPI",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    customerName: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    customerPhone: "+91 9876543213",
    notes: "Payment failed due to insufficient balance",
  },
  {
    id: "TXN005",
    orderId: "ORD005",
    amount: 520,
    status: "refunded",
    paymentMethod: "Credit Card",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    customerName: "David Brown",
    customerEmail: "david@example.com",
    customerPhone: "+91 9876543214",
    notes: "Refund processed due to order cancellation",
  },
]

// Mock bank accounts data with more details
const mockBankAccounts = [
  {
    id: "1",
    bankName: "State Bank of India",
    accountNumber: "****1234",
    fullAccountNumber: "123456789012345",
    accountHolder: "Spice Garden Restaurant",
    ifscCode: "SBIN0001234",
    accountType: "Current",
    branchName: "Mumbai Main Branch",
    isDefault: true,
  },
  {
    id: "2",
    bankName: "HDFC Bank",
    accountNumber: "****5678",
    fullAccountNumber: "567890123456789",
    accountHolder: "Spice Garden Restaurant",
    ifscCode: "HDFC0001234",
    accountType: "Savings",
    branchName: "Andheri Branch",
    isDefault: false,
  },
]

const exportTransactionsToCSV = (transactions: any[]) => {
  const csvContent = [
    ["Transaction ID", "Order ID", "Customer Name", "Amount", "Status", "Payment Method", "Timestamp"].join(","),
    ...transactions.map((transaction) =>
      [
        transaction.id,
        transaction.orderId,
        transaction.customerName,
        transaction.amount,
        transaction.status,
        transaction.paymentMethod,
        transaction.timestamp.toLocaleString(),
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "transactions.csv"
  a.click()
  window.URL.revokeObjectURL(url)
}

export default function PaymentManagement() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [bankAccounts, setBankAccounts] = useState(mockBankAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isBankDialogOpen, setIsBankDialogOpen] = useState(false)
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<any>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [bankDialogMode, setBankDialogMode] = useState<"add" | "edit">("add")
  const [currentPage, setCurrentPage] = useState(1)
  const transactionsPerPage = 8

  // Calculate stats
  const totalRevenue = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)
  const pendingAmount = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)
  const refundedAmount = transactions.filter((t) => t.status === "refunded").reduce((sum, t) => sum + t.amount, 0)
  const todayTransactions = transactions.filter((t) => {
    const today = new Date()
    const transactionDate = new Date(t.timestamp)
    return transactionDate.toDateString() === today.toDateString()
  }).length

  const handleBankSubmit = (data: any) => {
    const newAccount = {
      id: editingAccount ? editingAccount.id : Date.now().toString(),
      ...data,
      isDefault: bankAccounts.length === 0,
    }

    if (editingAccount) {
      setBankAccounts((prev) => prev.map((account) => (account.id === editingAccount.id ? newAccount : account)))
      alert("Bank account updated successfully!")
    } else {
      setBankAccounts((prev) => [...prev, newAccount])
      alert("Bank account added successfully!")
    }

    setEditingAccount(null)
    setIsBankDialogOpen(false)
  }

  const handleAddBank = () => {
    setEditingAccount(null)
    setBankDialogMode("add")
    setIsBankDialogOpen(true)
  }

  const handleEditBank = (account: any) => {
    setEditingAccount(account)
    setBankDialogMode("edit")
    setIsBankDialogOpen(true)
  }

  const handleDeleteBank = (id: string) => {
    if (confirm("Are you sure you want to delete this bank account?")) {
      setBankAccounts((prev) => prev.filter((account) => account.id !== id))
      alert("Bank account deleted successfully!")
    }
  }

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionDialogOpen(true)
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage)
  const startIndex = (currentPage - 1) * transactionsPerPage
  const endIndex = startIndex + transactionsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  const formatTime = (date: Date) => {
    return date.toLocaleString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Payment Management</h1>
            <p className="text-gray-600 mt-1">Manage payments, transactions, and bank accounts</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportTransactionsToCSV(filteredTransactions)}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={handleAddBank} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Bank Account
            </Button>
          </div>
        </div>

        {/* Payment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Completed transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">₹{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Refunded Amount</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">₹{refundedAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total refunds</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{todayTransactions}</div>
              <p className="text-xs text-muted-foreground">Transactions today</p>
            </CardContent>
          </Card>
        </div>

        {/* Bank Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Linked Bank Accounts ({bankAccounts.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{account.bankName}</h3>
                        {account.isDefault && <Badge variant="default">Default</Badge>}
                        <Badge variant="outline">{account.accountType}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{account.accountNumber}</p>
                      <p className="text-sm text-gray-600">{account.accountHolder}</p>
                      <p className="text-xs text-gray-500">
                        IFSC: {account.ifscCode} • {account.branchName}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditBank(account)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteBank(account.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {bankAccounts.length === 0 && (
                <div className="col-span-2 text-center py-8">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No bank accounts linked yet.</p>
                  <Button onClick={handleAddBank} className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Bank Account
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search transactions..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History ({filteredTransactions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 hover:shadow-md transition-all duration-200"
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{transaction.id}</h3>
                        <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Order: {transaction.orderId}</p>
                      <p className="text-sm text-gray-600">Customer: {transaction.customerName}</p>
                      <p className="text-sm text-gray-600">Method: {transaction.paymentMethod}</p>
                      <p className="text-xs text-gray-500">{formatTime(transaction.timestamp)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">₹{transaction.amount}</div>
                    <p className="text-xs text-gray-500">Click to view details</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
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

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No transactions found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bank Account Dialog */}
        <BankAccountDialog
          isOpen={isBankDialogOpen}
          onClose={() => setIsBankDialogOpen(false)}
          onSubmit={handleBankSubmit}
          editingAccount={editingAccount}
          mode={bankDialogMode}
        />

        {/* Transaction Details Dialog */}
        <TransactionDetailsDialog
          transaction={selectedTransaction}
          isOpen={isTransactionDialogOpen}
          onClose={() => setIsTransactionDialogOpen(false)}
        />
      </div>
    </Layout>
  )
}
