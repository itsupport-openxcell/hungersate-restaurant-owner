import React, { useState } from 'react'
import { Search, Copy, Plus, Edit, Trash2, Filter, CreditCard, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../components/Button'
import { Input, Select } from '../../components/Form'
import Modal from '../../components/Modal'
import Pagination from '../../components/Pagination'
import toast from 'react-hot-toast'

const PaymentsList = () => {
  const [activeTab, setActiveTab] = useState("Transaction")
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddBank, setShowAddBank] = useState(false)
  const [showEditBank, setShowEditBank] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedBank, setSelectedBank] = useState(null)
  const [bankToDelete, setBankToDelete] = useState(null)
  const [showCopiedToast, setShowCopiedToast] = useState(false)
  const [copiedText, setCopiedText] = useState("")
  const [loading, setLoading] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    dateRange: { startDate: "", endDate: "" },
    amountRange: { minAmount: "", maxAmount: "" },
    company: "",
  })

  // Bank accounts state
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: "1",
      bankName: "Kotak Mahindra Bank",
      accountNumber: "1234565656",
      ifscCode: "KKBK0002580",
      accountHolderName: "Spice Garden Restaurant",
    },
  ])

  // Transactions data
  const [transactions, setTransactions] = useState([
    { id: "1", company: "Hungersate Pvt Ltd", referenceId: "REF1234567890987612", amount: "12345.00" },
    { id: "2", company: "Hungersate Pvt Ltd", referenceId: "REF1234567890987613", amount: "8750.50" },
    { id: "3", company: "Spice Garden", referenceId: "REF1234567890987614", amount: "2500.00" },
    { id: "4", company: "Food Delivery Co", referenceId: "REF1234567890987615", amount: "1200.75" },
    { id: "5", company: "Hungersate Pvt Ltd", referenceId: "REF1234567890987616", amount: "5600.25" },
    { id: "6", company: "Spice Garden", referenceId: "REF1234567890987617", amount: "3200.00" },
    { id: "7", company: "Food Delivery Co", referenceId: "REF1234567890987618", amount: "950.50" },
  ])

  // Apply filters to transactions
  const applyFilters = (items) => {
    return items.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.referenceId.toLowerCase().includes(searchQuery.toLowerCase())
      
      const amount = Number(item.amount)
      const matchesAmountRange =
        (!filters.amountRange.minAmount || amount >= Number(filters.amountRange.minAmount)) &&
        (!filters.amountRange.maxAmount || amount <= Number(filters.amountRange.maxAmount))
      
      const matchesCompany = !filters.company || item.company === filters.company
      
      return matchesSearch && matchesAmountRange && matchesCompany
    })
  }

  const filteredTransactions = applyFilters(transactions)

  // Pagination state for transactions
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setShowCopiedToast(true)
    setTimeout(() => setShowCopiedToast(false), 3000)
  }

  const handleEditBank = (bank) => {
    setSelectedBank(bank)
    setShowEditBank(true)
  }

  const handleDeleteBank = (bank) => {
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
      toast.success('Bank account deleted successfully')
    }
  }

  const handleSaveBank = async (bankData) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newBank = { ...bankData, id: Date.now().toString() }
    setBankAccounts((prev) => [...prev, newBank])
    setShowAddBank(false)
    setLoading(false)
    toast.success('Bank account added successfully')
  }

  const handleUpdateBank = async (updatedBank) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setBankAccounts((prev) => prev.map((bank) => (bank.id === updatedBank.id ? updatedBank : bank)))
    setShowEditBank(false)
    setSelectedBank(null)
    setLoading(false)
    toast.success('Bank account updated successfully')
  }

  const handleApplyFilter = () => {
    setCurrentPage(1)
    setShowFilter(false)
  }

  const handleClearFilters = () => {
    setFilters({
      dateRange: { startDate: "", endDate: "" },
      amountRange: { minAmount: "", maxAmount: "" },
      company: "",
    })
    setCurrentPage(1)
    setShowFilter(false)
  }

  const maskAccountNumber = (accountNumber) =>
    accountNumber.length <= 4 ? accountNumber : "XXXXXX" + accountNumber.slice(-4)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Manage your payment transactions and bank accounts</p>
        </div>
        <Button onClick={() => setShowAddBank(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Bank Account
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex">
          {["Transaction", "Bank Detail"].map((tab) => (
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

      {/* Content */}
      {activeTab === "Transaction" && (
        <div className="space-y-4">
          {/* Search Bar and Filter */}
          <div className="flex gap-3">
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

          {/* Results Count */}
          <div>
            <p className="text-sm text-gray-600">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
          </div>

          {/* Transactions List */}
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No transactions found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              paginatedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-gray-50 rounded-2xl"
                >
                  <div className="p-6">
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
              onPageChange={setCurrentPage}
              totalItems={filteredTransactions.length}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      )}

      {activeTab === "Bank Detail" && (
        <div className="space-y-4">
          {bankAccounts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-200">
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
            <div className="space-y-4">
              {/* Bank Account Cards */}
              {bankAccounts.map((bank) => (
                <div
                  key={bank.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-blue-50 rounded-2xl"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{bank.bankName}</h3>
                      </div>
                      <span className="text-xs border-2 border-green-500 text-green-700 bg-green-50 font-semibold px-3 py-1 rounded-full">
                        Primary
                      </span>
                    </div>
                    
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
                  </div>
                </div>
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

      {/* Add Bank Form Modal */}
      <AddBankForm 
        isOpen={showAddBank} 
        onClose={() => setShowAddBank(false)} 
        onSave={handleSaveBank} 
      />

      {/* Edit Bank Form Modal */}
      <EditBankForm
        isOpen={showEditBank}
        onClose={() => {
          setShowEditBank(false)
          setSelectedBank(null)
        }}
        onSave={handleUpdateBank}
        bankAccount={selectedBank}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
          setBankToDelete(null)
        }}
        onConfirm={confirmDeleteBank}
        bankName={bankToDelete?.bankName || ""}
      />

      {/* Transaction Filter Modal */}
      <TransactionFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApplyFilter={handleApplyFilter}
        onClearFilter={handleClearFilters}
        currentFilters={filters}
        setFilters={setFilters}
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
    </div>
  )
}

// Add Bank Form Component
const AddBankForm = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required"
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required"
    }

    if (!formData.confirmAccountNumber.trim()) {
      newErrors.confirmAccountNumber = "Please confirm account number"
    } else if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match"
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC code is required"
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC code format"
    }

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        accountHolderName: formData.accountHolderName,
      })
      // Reset form
      setFormData({
        bankName: "",
        accountNumber: "",
        confirmAccountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      })
      setErrors({})
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Bank Account"
      size="lg"
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Bank Name</label>
          <Input
            value={formData.bankName}
            onChange={(e) => handleInputChange("bankName", e.target.value)}
            placeholder="Enter bank name"
            className="h-12"
          />
          {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Account Holder Name</label>
          <Input
            value={formData.accountHolderName}
            onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
            placeholder="Enter account holder name"
            className="h-12"
          />
          {errors.accountHolderName && <p className="text-red-500 text-sm mt-1">{errors.accountHolderName}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Account Number</label>
          <Input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
            placeholder="Enter account number"
            className="h-12"
          />
          {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Confirm Account Number</label>
          <Input
            type="text"
            value={formData.confirmAccountNumber}
            onChange={(e) => handleInputChange("confirmAccountNumber", e.target.value)}
            placeholder="Re-enter account number"
            className="h-12"
          />
          {errors.confirmAccountNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmAccountNumber}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">IFSC Code</label>
          <Input
            type="text"
            value={formData.ifscCode}
            onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
            placeholder="Enter IFSC code"
            className="h-12"
          />
          {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button onClick={onClose} variant="outline" className="px-4 py-2">
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2">
          Save Bank Account
        </Button>
      </div>
    </Modal>
  )
}

// Edit Bank Form Component
const EditBankForm = ({ isOpen, onClose, onSave, bankAccount }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  })

  const [errors, setErrors] = useState({})

  // Populate form when bankAccount changes
  React.useEffect(() => {
    if (bankAccount) {
      setFormData({
        bankName: bankAccount.bankName,
        accountNumber: bankAccount.accountNumber,
        confirmAccountNumber: bankAccount.accountNumber,
        ifscCode: bankAccount.ifscCode,
        accountHolderName: bankAccount.accountHolderName,
      })
    }
  }, [bankAccount])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required"
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required"
    }

    if (!formData.confirmAccountNumber.trim()) {
      newErrors.confirmAccountNumber = "Please confirm account number"
    } else if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match"
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC code is required"
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC code format"
    }

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm() && bankAccount) {
      const updatedBank = {
        ...bankAccount,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        accountHolderName: formData.accountHolderName,
      }
      onSave(updatedBank)
    }
  }

  if (!isOpen || !bankAccount) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Bank Account"
      size="lg"
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Bank Name</label>
          <Input
            value={formData.bankName}
            onChange={(e) => handleInputChange("bankName", e.target.value)}
            placeholder="Enter bank name"
            className="h-12"
          />
          {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Account Holder Name</label>
          <Input
            value={formData.accountHolderName}
            onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
            placeholder="Enter account holder name"
            className="h-12"
          />
          {errors.accountHolderName && <p className="text-red-500 text-sm mt-1">{errors.accountHolderName}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Account Number</label>
          <Input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
            placeholder="Enter account number"
            className="h-12"
          />
          {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Confirm Account Number</label>
          <Input
            type="text"
            value={formData.confirmAccountNumber}
            onChange={(e) => handleInputChange("confirmAccountNumber", e.target.value)}
            placeholder="Re-enter account number"
            className="h-12"
          />
          {errors.confirmAccountNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmAccountNumber}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">IFSC Code</label>
          <Input
            type="text"
            value={formData.ifscCode}
            onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
            placeholder="Enter IFSC code"
            className="h-12"
          />
          {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button onClick={onClose} variant="outline" className="px-4 py-2">
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2">
          Update Bank Account
        </Button>
      </div>
    </Modal>
  )
}

// Delete Confirmation Dialog Component
const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm, bankName }) => {
  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Bank Account"
      size="md"
    >
      <div className="space-y-4">
        <div className="text-gray-600">
          <p className="mb-2">Are you sure you want to delete this bank account?</p>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-semibold text-gray-900">{bankName}</p>
          </div>
          <p className="mt-2 text-sm text-red-600">
            This action cannot be undone. All associated payment information will be permanently removed.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button
          onClick={onClose}
          variant="outline"
          className="px-4 py-2"
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
        >
          Delete Account
        </Button>
      </div>
    </Modal>
  )
}

// Transaction Filter Component
const TransactionFilter = ({ isOpen, onClose, onApplyFilter, onClearFilter, currentFilters, setFilters }) => {
  if (!isOpen) return null

  const handleDateRangeChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [key]: value },
    }))
  }

  const handleAmountRangeChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      amountRange: { ...prev.amountRange, [key]: value },
    }))
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Transactions"
      size="md"
    >
      <div className="space-y-6">
        {/* Date Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4" />
            Date Range
          </h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">From Date</label>
              <Input
                type="date"
                value={currentFilters.dateRange.startDate}
                onChange={(e) => handleDateRangeChange("startDate", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">To Date</label>
              <Input
                type="date"
                value={currentFilters.dateRange.endDate}
                onChange={(e) => handleDateRangeChange("endDate", e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>

        {/* Amount Range */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Amount Range</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Minimum Amount (₹)</label>
              <Input
                type="number"
                placeholder="0"
                value={currentFilters.amountRange.minAmount}
                onChange={(e) => handleAmountRangeChange("minAmount", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Maximum Amount (₹)</label>
              <Input
                type="number"
                placeholder="999999"
                value={currentFilters.amountRange.maxAmount}
                onChange={(e) => handleAmountRangeChange("maxAmount", e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Company</h4>
          <Select
            value={currentFilters.company}
            onChange={(e) => setFilters({ ...currentFilters, company: e.target.value })}
            className="text-gray-900"
          >
            <option value="" className="text-gray-900">All Companies</option>
            <option value="Hungersate Pvt Ltd" className="text-gray-900">Hungersate Pvt Ltd</option>
            <option value="Spice Garden" className="text-gray-900">Spice Garden</option>
            <option value="Food Delivery Co" className="text-gray-900">Food Delivery Co</option>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button
          onClick={onClearFilter}
          variant="outline"
          className="px-4 py-2"
        >
          Reset
        </Button>
        <Button 
          onClick={onApplyFilter} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
        >
          Apply Filter
        </Button>
      </div>
    </Modal>
  )
}

export default PaymentsList