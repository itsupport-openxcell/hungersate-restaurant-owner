"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Search,
  Copy,
  Plus,
  Edit,
  Trash2,
  Filter,
  CreditCard,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
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
import type { BankAccount } from "@/types/bank-account"

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
}

const initialFilters: FilterOptions = {
  dateRange: { startDate: "", endDate: "" },
  amountRange: { minAmount: "", maxAmount: "" },
  company: "",
}

const initialBankAccounts: BankAccount[] = [
  {
    id: "1",
    bankName: "Kotak Mahindra Bank",
    accountNumber: "1234565656",
    ifscCode: "KKBK0002580",
    accountHolderName: "Spice Garden Restaurant",
  },
]

const transactionsData: Transaction[] = [
  { id: "1", company: "Hungersate Pvt Ltd", referenceId: "REF1234567890987612", amount: "12345.00" },
  { id: "2", company: "Hungersate Pvt Ltd", referenceId: "REF1234567890987613", amount: "8750.50" },
  { id: "3", company: "Spice Garden", referenceId: "REF1234567890987614", amount: "2500.00" },
  { id: "4", company: "Food Delivery Co", referenceId: "REF1234567890987615", amount: "1200.75" },
  { id: "5", company: "Hungersate Pvt Ltd", referenceId: "REF1234567890987616", amount: "5600.25" },
  { id: "6", company: "Spice Garden", referenceId: "REF1234567890987617", amount: "3200.00" },
  { id: "7", company: "Food Delivery Co", referenceId: "REF1234567890987618", amount: "950.50" },
]

export default function PaymentsPage({ isOpen, onClose }: PaymentsPageProps) {
  // State
  const [activeTab, setActiveTab] = useState<PaymentTab>("Transaction")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddBank, setShowAddBank] = useState(false)
  const [showEditBank, setShowEditBank] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedBank, setSelectedBank] = useState<BankAccount | null>(null)
  const [bankToDelete, setBankToDelete] = useState<BankAccount | null>(null)
  const [showCopiedToast, setShowCopiedToast] = useState(false)
  const [copiedText, setCopiedText] = useState("")
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(initialBankAccounts)
  const [loading, setLoading] = useState(false)

  // Memoized transactions
  const transactions = transactionsData

  // Effects
  useEffect(() => {
    if (showCopiedToast) {
      const timer = setTimeout(() => setShowCopiedToast(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showCopiedToast])

  // Handlers
  const applyFilters = useCallback((transactions: Transaction[]) => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        !searchQuery ||
        transaction.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.referenceId.toLowerCase().includes(searchQuery.toLowerCase())
      const amount = Number.parseFloat(transaction.amount)
      const matchesAmountRange =
        (!filters.amountRange.minAmount || amount >= Number.parseFloat(filters.amountRange.minAmount)) &&
        (!filters.amountRange.maxAmount || amount <= Number.parseFloat(filters.amountRange.maxAmount))
      const matchesCompany = !filters.company || transaction.company === filters.company
      return matchesSearch && matchesAmountRange && matchesCompany
    })
  }, [searchQuery, filters])

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
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setBankAccounts((prev) => prev.filter((bank) => bank.id !== bankToDelete.id))
      setShowDeleteDialog(false)
      setBankToDelete(null)
      setLoading(false)
    }
  }

  const handleSaveBank = async (bankData: Omit<BankAccount, "id">) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newBank: BankAccount = { ...bankData, id: Date.now().toString() }
    setBankAccounts((prev) => [...prev, newBank])
    setShowAddBank(false)
    setLoading(false)
  }

  const handleUpdateBank = async (updatedBank: BankAccount) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setBankAccounts((prev) => prev.map((bank) => (bank.id === updatedBank.id ? updatedBank : bank)))
    setShowEditBank(false)
    setSelectedBank(null)
    setLoading(false)
  }

  const handleApplyFilter = (newFilters: FilterOptions) => setFilters(newFilters)

  const handleRemoveFilter = (filterKey: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
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
      }
      return newFilters
    })
  }

  const handleClearAllFilters = () => setFilters(initialFilters)

  const maskAccountNumber = (accountNumber: string) =>
    accountNumber.length <= 4 ? accountNumber : "XXXXXX" + accountNumber.slice(-4)

  // Pagination state for transactions
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

  // Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filters])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed left-80 top-0 right-0 bottom-0 bg-white z-50 shadow-xl border-l border-gray-200 flex flex-col">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm p-4 pt-12 flex-shrink-0 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
            </button>
            <h1 className="text-xl font-bold text-gray-800">Payments</h1>
            <button
              onClick={() => setShowAddBank(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors shadow-md"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
          <div className="flex">
            {(["Transaction", "Bank Detail"] as PaymentTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-4 text-center font-semibold transition-all duration-200 relative ${activeTab === tab
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
                  paginatedTransactions.map((transaction) => (
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
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm font-semibold text-gray-700">Reference ID</span>
                                <button
                                  onClick={() => copyToClipboard(transaction.referenceId)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                  title="Copy reference ID"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-700 font-mono bg-gray-50 rounded-lg p-2">
                                {transaction.referenceId}
                              </p>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-2xl font-bold text-gray-900 mb-2">₹ {transaction.amount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 bg-white border-t border-gray-200 p-4 rounded-b-xl">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
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
              )}
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
                                  title="Copy account number"
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
                                title="Copy IFSC code"
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
          <button
            onClick={() => setShowCopiedToast(false)}
            className="ml-2 text-gray-400 hover:text-white"
            title="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  )
}
