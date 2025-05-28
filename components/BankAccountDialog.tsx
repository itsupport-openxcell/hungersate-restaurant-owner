"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Building2, CreditCard, User, Shield, CheckCircle } from "lucide-react"

interface BankAccountDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  editingAccount?: any
  mode: "add" | "edit"
}

export function BankAccountDialog({ isOpen, onClose, onSubmit, editingAccount, mode }: BankAccountDialogProps) {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountHolder: "",
    ifscCode: "",
    accountType: "",
    branchName: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editingAccount && mode === "edit") {
      setFormData({
        bankName: editingAccount.bankName || "",
        accountNumber: editingAccount.fullAccountNumber || "",
        confirmAccountNumber: editingAccount.fullAccountNumber || "",
        accountHolder: editingAccount.accountHolder || "",
        ifscCode: editingAccount.ifscCode || "",
        accountType: editingAccount.accountType || "",
        branchName: editingAccount.branchName || "",
      })
    } else {
      setFormData({
        bankName: "",
        accountNumber: "",
        confirmAccountNumber: "",
        accountHolder: "",
        ifscCode: "",
        accountType: "",
        branchName: "",
      })
    }
    setErrors({})
  }, [editingAccount, mode, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required"
    if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required"
    else if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) {
      newErrors.accountNumber = "Account number must be 9-18 digits"
    }
    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match"
    }
    if (!formData.accountHolder.trim()) newErrors.accountHolder = "Account holder name is required"
    if (!formData.ifscCode.trim()) newErrors.ifscCode = "IFSC code is required"
    else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC code format"
    }
    if (!formData.accountType) newErrors.accountType = "Account type is required"
    if (!formData.branchName.trim()) newErrors.branchName = "Branch name is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        ...formData,
        fullAccountNumber: formData.accountNumber,
        accountNumber: `****${formData.accountNumber.slice(-4)}`,
      })
      onClose()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span>{mode === "add" ? "Add Bank Account" : "Edit Bank Account"}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bank Information */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <Building2 className="w-5 h-5 mr-2" />
              Bank Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bankName">Bank Name *</Label>
                <Select value={formData.bankName} onValueChange={(value) => handleInputChange("bankName", value)}>
                  <SelectTrigger className={errors.bankName ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="State Bank of India">State Bank of India</SelectItem>
                    <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                    <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                    <SelectItem value="Axis Bank">Axis Bank</SelectItem>
                    <SelectItem value="Punjab National Bank">Punjab National Bank</SelectItem>
                    <SelectItem value="Bank of Baroda">Bank of Baroda</SelectItem>
                    <SelectItem value="Canara Bank">Canara Bank</SelectItem>
                    <SelectItem value="Union Bank of India">Union Bank of India</SelectItem>
                    <SelectItem value="Kotak Mahindra Bank">Kotak Mahindra Bank</SelectItem>
                    <SelectItem value="IndusInd Bank">IndusInd Bank</SelectItem>
                  </SelectContent>
                </Select>
                {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
              </div>
              <div>
                <Label htmlFor="branchName">Branch Name *</Label>
                <Input
                  id="branchName"
                  value={formData.branchName}
                  onChange={(e) => handleInputChange("branchName", e.target.value)}
                  className={errors.branchName ? "border-red-500" : ""}
                  placeholder="Enter branch name"
                />
                {errors.branchName && <p className="text-red-500 text-xs mt-1">{errors.branchName}</p>}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Account Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value.replace(/\D/g, ""))}
                    className={errors.accountNumber ? "border-red-500" : ""}
                    placeholder="Enter account number"
                    maxLength={18}
                  />
                  {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                </div>
                <div>
                  <Label htmlFor="confirmAccountNumber">Confirm Account Number *</Label>
                  <Input
                    id="confirmAccountNumber"
                    value={formData.confirmAccountNumber}
                    onChange={(e) => handleInputChange("confirmAccountNumber", e.target.value.replace(/\D/g, ""))}
                    className={errors.confirmAccountNumber ? "border-red-500" : ""}
                    placeholder="Re-enter account number"
                    maxLength={18}
                  />
                  {errors.confirmAccountNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmAccountNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ifscCode">IFSC Code *</Label>
                  <Input
                    id="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                    className={errors.ifscCode ? "border-red-500" : ""}
                    placeholder="e.g., SBIN0001234"
                    maxLength={11}
                  />
                  {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
                  <p className="text-xs text-gray-500 mt-1">11-character alphanumeric code</p>
                </div>
                <div>
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) => handleInputChange("accountType", value)}
                  >
                    <SelectTrigger className={errors.accountType ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Savings">Savings Account</SelectItem>
                      <SelectItem value="Current">Current Account</SelectItem>
                      <SelectItem value="Business">Business Account</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.accountType && <p className="text-red-500 text-xs mt-1">{errors.accountType}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Account Holder Information */}
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Account Holder Information
            </h3>
            <div>
              <Label htmlFor="accountHolder">Account Holder Name *</Label>
              <Input
                id="accountHolder"
                value={formData.accountHolder}
                onChange={(e) => handleInputChange("accountHolder", e.target.value)}
                className={errors.accountHolder ? "border-red-500" : ""}
                placeholder="Enter account holder name as per bank records"
              />
              {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder}</p>}
              <p className="text-xs text-gray-500 mt-1">Name should match exactly as per bank records</p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Security Notice</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Your bank account information is encrypted and stored securely. We use industry-standard security
                  measures to protect your financial data.
                </p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {(formData.bankName || formData.accountHolder) && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{formData.bankName || "Bank Name"}</h4>
                  <p className="text-gray-600">{formData.accountHolder || "Account Holder Name"}</p>
                  <p className="text-gray-600">
                    {formData.accountNumber ? `****${formData.accountNumber.slice(-4)}` : "Account Number"}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {formData.accountType && <Badge variant="outline">{formData.accountType}</Badge>}
                    {formData.ifscCode && <Badge variant="outline">{formData.ifscCode}</Badge>}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              {mode === "add" ? "Add Bank Account" : "Update Account"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
