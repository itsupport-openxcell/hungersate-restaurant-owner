"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Search,
  Copy,
  Plus,
  Edit,
  Trash2,
  Filter,
  CreditCard,
  Calendar,
  Download,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EditBankForm from "./edit-bank-form"
import AddBankForm from "./add-bank-form"
import DeleteConfirmationDialog from "./delete-confirmation-dialog"
import TransactionFilter, { type FilterOptions } from "./transaction-filter"
import FilterSummary from "./filter-summary"
import type { BankAccount } from "@/types/bank-account" // Import BankAccount type

interface PaymentsPageProps {
  isOpen: boolean
  onClose: () => void
}

type PaymentTab = "Transaction" | "Bank Detail"

interface Transaction {
  id: string
  company: string
  referenceId: string
  amount: string
  date: string
  status: "completed" | "pending" | "failed" | "processing"
  type: "payment" | "refund" | "settlement" | "commission"
  time: string
}

export default function PaymentsPage({ isOpen, onClose }: PaymentsPageProps) {
  const [activeTab, setActiveTab] = useState<PaymentTab>("Transaction")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddBank, setShowAddBank] = useState(false)
  const [showEditBank, setShowEditBank] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null)
  const [bankToDelete, setBankToDelete] = useState<BankAccount | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showCopiedToast, setShowCopiedToast] = useState(false)
  const [copiedText, setCopiedText] = useState("")

  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: { startDate: "", endDate: "" },
    amountRange: { minAmount: "", maxAmount: "" },
    company: "",
    status: "",
    transactionType: "",
  })

  const transactions: Transaction[] = [
    {
      id: "1",
      company: "Hungersate Pvt Ltd",
      referenceId: "REF1234567890987612",
      amount: "12345.00",
      date: "2024-01-15",
      status: "completed",
      type: "payment",
      time: "10:30 AM",
    },
    {
      id: "2",
      company: "Hungersate Pvt Ltd",
      referenceId: "REF1234567890987613",
      amount: "8750.50",
      date: "2024-01-14",
      status: "pending",
      type: "payment",
      time: "02:45 PM",
    },
    {
      id: "3",
      company: "Spice Garden",
      referenceId: "REF1234567890987614",
      amount: "2500.00",
      date: "2024-01-13",
      status: "completed",
      type: "settlement",
      time: "11:20 AM",
    },
    {
      id: "4",
      company: "Food Delivery Co",
      referenceId: "REF1234567890987615",
      amount: "1200.75",
      date: "2024-01-12",
      status: "failed",
      type: "refund",
      time: "09:15 AM",
    },
    {
      id: "5",
      company: "Hungersate Pvt Ltd",
      referenceId: "REF1234567890987616",
      amount: "5600.25",
      date: "2024-01-11",
      status: "completed",
      type: "payment",
      time: "03:30 PM",
    },
    {
      id: "6",
      company: "Spice Garden",
      referenceId: "REF1234567890987617",
      amount: "3200.00",
      date: "2024-01-10",
      status: "processing",
      type: "commission",
      time: "01:45 PM",
    },
    {
      id: "7",
      company: "Food Delivery Co",
      referenceId: "REF1234567890987618",
      amount: "950.50",
      date: "2024-01-09",
      status: "completed",
      type: "payment",
      time: "10:00 AM",
    },
  ]

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "Kotak Mahindra Bank",
      accountNumber: "1234565656",
      ifscCode: "KKBK0002580",
      accountHolderName: "Spice Garden Restaurant",
    },
  ])

  useEffect(() => {
    if (showCopiedToast) {
      const timer = setTimeout(() => {
        setShowCopiedToast(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showCopiedToast])

  const applyFilters = (transactions: Transaction[]) => {
    return transactions.filter((transaction) => {
      // Search query filter
      const matchesSearch =
        !searchQuery ||
        transaction.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.referenceId.toLowerCase().includes(searchQuery.toLowerCase())

      // Date range filter
      const matchesDateRange =
        (!filters.dateRange.startDate || transaction.date >= filters.dateRange.startDate) &&
        (!filters.dateRange.endDate || transaction.date <= filters.dateRange.endDate)

      // Amount range filter
      const amount = Number.parseFloat(transaction.amount)
      const matchesAmountRange =
        (!filters.amountRange.minAmount || amount >= Number.parseFloat(filters.amountRange.minAmount)) &&
        (!filters.amountRange.maxAmount || amount <= Number.parseFloat(filters.amountRange.maxAmount))

      // Company filter
      const matchesCompany = !filters.company || transaction.company === filters.company

      // Status filter
      const matchesStatus = !filters.status || transaction.status === filters.status

      // Transaction type filter
      const matchesType = !filters.transactionType || transaction.type === filters.transactionType

      return matchesSearch && matchesDateRange && matchesAmountRange && matchesCompany && matchesStatus && matchesType
    })
  }

  const filteredTransactions = applyFilters(transactions)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setShowCopiedToast(true)
  }

  const handleEditBank = (bank: BankAccount) => {
    setSelectedBank(bank)
    setShowEditBank(true)
  }

  const handleDeleteBank = (bank: BankAccount) => {
    setBankToDelete(bank)
    setShowDeleteDialog(true)
  }

  const confirmDeleteBank = async () => {
    if (bankToDelete) {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setBankAccounts((prev) => prev.filter((bank) => bank.id !== bankToDelete.id))
      setShowDeleteDialog(false)
      setBankToDelete(null)
      setIsLoading(false)
    }
  }

  const handleSaveBank = async (bankData: Omit<BankAccount, "id">) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newBank: BankAccount = {
      ...bankData,
      id: Date.now().toString(),
    }
    setBankAccounts((prev) => [...prev, newBank])
    setShowAddBank(false)
    setIsLoading(false)
  }

  const handleUpdateBank = async (updatedBank: BankAccount) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setBankAccounts((prev) => prev.map((bank) => (bank.id === updatedBank.id ? updatedBank : bank)))
    setShowEditBank(false)
    setSelectedBank(null)
    setIsLoading(false)
  }

  const handleApplyFilter = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  const handleRemoveFilter = (filterKey: string) => {
    const newFilters = { ...filters }

    switch (filterKey) {
      case "dateRange":
        newFilters.dateRange = { startDate: "", endDate: "" }
        break
      case "amountRange":
        newFilters.amountRange = { minAmount: "", maxAmount: "" }
        break
      case "company":
        newFilters.company = ""
        break
      case "status":
        newFilters.status = ""
        break
      case "transactionType":
        newFilters.transactionType = ""
        break
    }

    setFilters(newFilters)
  }

  const handleClearAllFilters = () => {
    setFilters({
      dateRange: { startDate: "", endDate: "" },
      amountRange: { minAmount: "", maxAmount: "" },
      company: "",
      status: "",
      transactionType: "",
    })
  }

  const maskAccountNumber = (accountNumber: string) => {
    if (accountNumber.length <= 4) return accountNumber
    return "XXXXXX" + accountNumber.slice(-4)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "failed":
        return <AlertCircle className="w-4 h-4" />
      case "processing":
        return <CreditCard className="w-4 h-4" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-green-100 text-green-800"
      case "refund":
        return "bg-orange-100 text-orange-800"
      case "settlement":
        return "bg-blue-100 text-blue-800"
      case "commission":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTotalAmount = () => {
    return filteredTransactions
      .filter((t) => t.status === "completed")
      .reduce((sum, transaction) => sum + Number.parseFloat(transaction.amount), 0)
      .toFixed(2)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed left-80 top-0 right-0 bottom-0 bg-white z-50 shadow-xl border-l border-gray-200 flex flex-col">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg p-4 pt-12 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-white">Payments</h1>
            <div className="text-sm text-white/80">9:41</div>
          </div>
        </div>

        {/* Enhanced Summary Bar */}
        <div className="bg-gradient-to-br from-white to-gray-50 border-b border-gray-200 p-6 flex-shrink-0 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 min-w-[120px]">
                <div className="text-3xl font-bold text-green-700">₹ {getTotalAmount()}</div>
                <div className="text-xs text-green-600 font-medium mt-1">Total Amount</div>
              </div>
              <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 min-w-[120px]">
                <div className="text-3xl font-bold text-blue-700">{filteredTransactions.length}</div>
                <div className="text-xs text-blue-600 font-medium mt-1">Transactions</div>
              </div>
            </div>
            <Button
              onClick={() => console.log("Export transactions")}
              variant="outline"
              size="sm"
              className="text-gray-600 border-2 border-gray-300 hover:bg-gray-50 font-semibold px-4 py-2 rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
          <div className="flex">
            {(["Transaction", "Bank Detail"] as PaymentTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-4 text-center font-semibold transition-all duration-200 relative ${
                  activeTab === tab
                    ? "text-red-600 bg-gradient-to-b from-red-50 to-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "Transaction" && (
            <div className="p-4">
              {/* Search Bar and Filter */}
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-lg"
                  />
                </div>
                <Button
                  onClick={() => setShowFilter(true)}
                  variant="outline"
                  className="h-12 px-4 border-gray-300 hover:bg-gray-50"
                >
                  <Filter className="w-5 h-5" />
                </Button>
              </div>

              {/* Filter Summary */}
              <FilterSummary filters={filters} onRemoveFilter={handleRemoveFilter} onClearAll={handleClearAllFilters} />

              {/* Quick Date Filters */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                <Button
                  onClick={() => {
                    const today = new Date().toISOString().split("T")[0]
                    setFilters({
                      ...filters,
                      dateRange: { startDate: today, endDate: today },
                    })
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-nowrap"
                >
                  Today
                </Button>
                <Button
                  onClick={() => {
                    const today = new Date()
                    const yesterday = new Date(today)
                    yesterday.setDate(yesterday.getDate() - 1)
                    setFilters({
                      ...filters,
                      dateRange: {
                        startDate: yesterday.toISOString().split("T")[0],
                        endDate: yesterday.toISOString().split("T")[0],
                      },
                    })
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-nowrap"
                >
                  Yesterday
                </Button>
                <Button
                  onClick={() => {
                    const today = new Date()
                    const lastWeek = new Date(today)
                    lastWeek.setDate(lastWeek.getDate() - 7)
                    setFilters({
                      ...filters,
                      dateRange: {
                        startDate: lastWeek.toISOString().split("T")[0],
                        endDate: today.toISOString().split("T")[0],
                      },
                    })
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-nowrap"
                >
                  Last 7 days
                </Button>
                <Button
                  onClick={() => {
                    const today = new Date()
                    const lastMonth = new Date(today)
                    lastMonth.setMonth(lastMonth.getMonth() - 1)
                    setFilters({
                      ...filters,
                      dateRange: {
                        startDate: lastMonth.toISOString().split("T")[0],
                        endDate: today.toISOString().split("T")[0],
                      },
                    })
                  }}
                  variant="outline"
                  size="sm"
                  className="text-xs whitespace-nowrap"
                >
                  Last 30 days
                </Button>
              </div>

              {/* Results Count */}
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </p>
              </div>

              {/* Transactions List */}
              <div className="space-y-4 pb-20">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No transactions found</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  /* Enhanced Transaction Cards */
                  filteredTransactions.map((transaction) => (
                    <Card
                      key={transaction.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-gray-50 rounded-2xl"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">{transaction.company.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 text-lg">{transaction.company}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge
                                    className={`text-xs flex items-center gap-1 font-medium px-3 py-1 rounded-full ${getStatusColor(transaction.status)}`}
                                  >
                                    {getStatusIcon(transaction.status)}
                                    {transaction.status}
                                  </Badge>
                                  <Badge
                                    className={`text-xs font-medium px-3 py-1 rounded-full ${getTypeColor(transaction.type)}`}
                                  >
                                    {transaction.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-semibold text-gray-700">Reference ID</span>
                                <button
                                  onClick={() => copyToClipboard(transaction.referenceId)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-700 font-mono bg-gray-50 rounded-lg p-2">
                                {transaction.referenceId}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
                                <div className="flex items-center gap-1 bg-blue-50 rounded-full px-2 py-1">
                                  <Calendar className="w-3 h-3" />
                                  {transaction.date}
                                </div>
                                <div className="flex items-center gap-1 bg-green-50 rounded-full px-2 py-1">
                                  <Clock className="w-3 h-3" />
                                  {transaction.time}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-2xl font-bold text-gray-900 mb-2">₹ {transaction.amount}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-red-600 hover:text-red-800 hover:bg-red-50 font-semibold px-4 py-2 rounded-xl border border-red-200"
                              onClick={() => console.log(`View details for ${transaction.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === "Bank Detail" && (
            <div className="p-4">
              {bankAccounts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <CreditCard className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-6">No bank accounts added yet</p>
                  <Button
                    onClick={() => setShowAddBank(true)}
                    className="w-full max-w-sm h-14 bg-red-500 hover:bg-red-600 text-white font-semibold text-lg rounded-lg flex items-center justify-center gap-2"
                  >
                    <Plus className="w-6 h-6" />
                    Add New Bank
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 pb-20">
                  {/* Enhanced Bank Account Cards */}
                  {bankAccounts.map((bank) => (
                    <Card
                      key={bank.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-blue-50 rounded-2xl"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-900">{bank.bankName}</CardTitle>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs border-2 border-green-500 text-green-700 bg-green-50 font-semibold px-3 py-1 rounded-full"
                          >
                            Primary
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-2 pb-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                              <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <span className="text-sm">👤</span>
                                Account Holder
                              </p>
                              <p className="text-base font-bold text-gray-900">{bank.accountHolderName}</p>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                              <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <span className="text-sm">🏦</span>
                                Account Number
                              </p>
                              <div className="flex items-center gap-2">
                                <p className="text-base font-bold text-gray-900">
                                  {maskAccountNumber(bank.accountNumber)}
                                </p>
                                <button
                                  onClick={() => copyToClipboard(bank.accountNumber)}
                                  className="text-gray-400 hover:text-blue-500 transition-colors"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                              <span className="text-sm">🔢</span>
                              IFSC CODE
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-base font-bold text-gray-900 bg-gray-50 rounded-lg px-3 py-2 font-mono">
                                {bank.ifscCode}
                              </p>
                              <button
                                onClick={() => copyToClipboard(bank.ifscCode)}
                                className="text-gray-400 hover:text-blue-500 transition-colors"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex gap-3 pt-2">
                            <Button
                              onClick={() => handleEditBank(bank)}
                              variant="outline"
                              className="flex-1 h-12 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold rounded-xl"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteBank(bank)}
                              variant="outline"
                              className="flex-1 h-12 border-2 border-red-300 text-red-600 hover:bg-red-50 font-semibold rounded-xl"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    onClick={() => setShowAddBank(true)}
                    className="w-full h-14 bg-red-500 hover:bg-red-600 text-white font-semibold text-lg rounded-lg flex items-center justify-center gap-2 mt-6"
                  >
                    <Plus className="w-6 h-6" />
                    Add New Bank
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => (activeTab === "Bank Detail" ? setShowAddBank(true) : console.log("Add transaction"))}
            size="lg"
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Add Bank Form */}
      <AddBankForm isOpen={showAddBank} onClose={() => setShowAddBank(false)} onSave={handleSaveBank} />

      {/* Edit Bank Form */}
      <EditBankForm
        isOpen={showEditBank}
        onClose={() => {
          setShowEditBank(false)
          setSelectedBank(null)
        }}
        onSave={handleUpdateBank}
        bankAccount={selectedBank}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
          setBankToDelete(null)
        }}
        onConfirm={confirmDeleteBank}
        bankName={bankToDelete?.bankName || ""}
      />

      {/* Transaction Filter */}
      <TransactionFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilter={handleApplyFilter}
        currentFilters={filters}
      />

      {/* Copied Toast */}
      {showCopiedToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm">Copied to clipboard!</span>
          <button onClick={() => setShowCopiedToast(false)} className="ml-2 text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  )
}
