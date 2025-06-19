"use client"

import { useState } from "react"
import { ArrowLeft, Save, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AddBankFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (bankData: BankFormData) => void
}

interface BankFormData {
  bankName: string
  accountNumber: string
  confirmAccountNumber: string
  ifscCode: string
  accountHolderName: string
}

export default function AddBankForm({ isOpen, onClose, onSave }: AddBankFormProps) {
  const [formData, setFormData] = useState<BankFormData>({
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    accountHolderName: "",
  })

  const [errors, setErrors] = useState<Partial<BankFormData>>({})

  const handleInputChange = (field: keyof BankFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<BankFormData> = {}

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
      onSave(formData)
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

  const handleClose = () => {
    setFormData({
      bankName: "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifscCode: "",
      accountHolderName: "",
    })
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white z-50 shadow-2xl border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-sm p-4 pt-12 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">Add Bank Account</h1>
          <div className="text-sm text-white/80">9:41</div>
        </div>
      </div>

      {/* Form - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-blue-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Bank Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <Label htmlFor="bankName" className="text-sm font-medium text-gray-700">
                Bank Name
              </Label>
              <Input
                id="bankName"
                type="text"
                value={formData.bankName}
                onChange={(e) => handleInputChange("bankName", e.target.value)}
                className="mt-1 h-12"
                placeholder="Enter bank name"
              />
              {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
            </div>

            <div>
              <Label htmlFor="accountHolderName" className="text-sm font-medium text-gray-700">
                Account Holder Name
              </Label>
              <Input
                id="accountHolderName"
                type="text"
                value={formData.accountHolderName}
                onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                className="mt-1 h-12"
                placeholder="Enter account holder name"
              />
              {errors.accountHolderName && <p className="text-red-500 text-sm mt-1">{errors.accountHolderName}</p>}
            </div>

            <div>
              <Label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">
                Account Number
              </Label>
              <Input
                id="accountNumber"
                type="text"
                value={formData.accountNumber}
                onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                className="mt-1 h-12"
                placeholder="Enter account number"
              />
              {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
            </div>

            <div>
              <Label htmlFor="confirmAccountNumber" className="text-sm font-medium text-gray-700">
                Confirm Account Number
              </Label>
              <Input
                id="confirmAccountNumber"
                type="text"
                value={formData.confirmAccountNumber}
                onChange={(e) => handleInputChange("confirmAccountNumber", e.target.value)}
                className="mt-1 h-12"
                placeholder="Re-enter account number"
              />
              {errors.confirmAccountNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmAccountNumber}</p>
              )}
            </div>

            <div>
              <Label htmlFor="ifscCode" className="text-sm font-medium text-gray-700">
                IFSC Code
              </Label>
              <Input
                id="ifscCode"
                type="text"
                value={formData.ifscCode}
                onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                className="mt-1 h-12"
                placeholder="Enter IFSC code"
              />
              {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
            </div>

            <Button
              onClick={handleSave}
              className="w-full h-14 bg-red-500 hover:bg-red-600 text-white font-semibold text-lg rounded-lg flex items-center justify-center gap-2 mt-8"
            >
              <Save className="w-5 h-5" />
              Save Bank Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
