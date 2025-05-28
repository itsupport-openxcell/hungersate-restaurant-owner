"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Calendar,
  User,
  Building2,
  Receipt,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  RefreshCw,
} from "lucide-react"

interface TransactionDetailsDialogProps {
  transaction: any
  isOpen: boolean
  onClose: () => void
}

export function TransactionDetailsDialog({ transaction, isOpen, onClose }: TransactionDetailsDialogProps) {
  if (!transaction) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      case "refunded":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "refunded":
        return <RefreshCw className="w-5 h-5 text-blue-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "upi":
        return "📱"
      case "credit card":
        return "💳"
      case "debit card":
        return "💳"
      case "net banking":
        return "🏦"
      case "wallet":
        return "👛"
      default:
        return "💰"
    }
  }

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const handleDownloadReceipt = () => {
    // Simulate receipt download
    alert("Receipt downloaded successfully!")
  }

  const handleRefund = () => {
    if (confirm("Are you sure you want to initiate a refund for this transaction?")) {
      alert("Refund initiated successfully!")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-800">Transaction Details</DialogTitle>
            <div className="flex items-center space-x-2">
              <Badge className={`${getStatusColor(transaction.status)} border font-medium px-3 py-1`}>
                {transaction.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Summary Header */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getStatusIcon(transaction.status)}
                <div>
                  <h3 className="text-xl font-bold text-gray-800">₹{transaction.amount.toLocaleString()}</h3>
                  <p className="text-gray-600">Transaction ID: {transaction.id}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl">{getPaymentMethodIcon(transaction.paymentMethod)}</div>
                <p className="text-sm text-gray-600 mt-1">{transaction.paymentMethod}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction Information */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-blue-800">Transaction Information</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Receipt className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-gray-600">Transaction ID</span>
                  </div>
                  <span className="font-medium text-gray-800">{transaction.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-gray-600">Order ID</span>
                  </div>
                  <span className="font-medium text-gray-800">{transaction.orderId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-gray-600">Payment Method</span>
                  </div>
                  <Badge variant="outline">{transaction.paymentMethod}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-gray-600">Transaction Date</span>
                  </div>
                  <span className="font-medium text-gray-800">{formatDateTime(transaction.timestamp)}</span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-green-800">Customer Information</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{transaction.customerName}</p>
                    <p className="text-sm text-gray-600">Customer</p>
                  </div>
                </div>
                {transaction.customerEmail && (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.customerEmail}</p>
                      <p className="text-sm text-gray-600">Email Address</p>
                    </div>
                  </div>
                )}
                {transaction.customerPhone && (
                  <div className="flex items-center">
                    <div className="w-4 h-4 mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.customerPhone}</p>
                      <p className="text-sm text-gray-600">Phone Number</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Breakdown
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Order Amount</span>
                <span className="font-medium text-gray-800">₹{transaction.amount}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Payment Gateway Fee</span>
                <span className="font-medium text-gray-800">₹{Math.round(transaction.amount * 0.02)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Tax (GST)</span>
                <span className="font-medium text-gray-800">₹{Math.round(transaction.amount * 0.18)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2 bg-purple-100 px-4 rounded-lg">
                <span className="font-semibold text-purple-800">Total Processed</span>
                <span className="font-bold text-lg text-purple-800">
                  ₹{Math.round(transaction.amount * 1.2).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction Timeline */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Transaction Timeline
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">Payment Initiated</p>
                  <p className="text-sm text-gray-600">{formatDateTime(transaction.timestamp)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">Payment Processing</p>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(new Date(transaction.timestamp.getTime() + 30000))}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    transaction.status === "completed" ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <div>
                  <p className="font-medium text-gray-800">
                    Payment {transaction.status === "completed" ? "Completed" : "Pending"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.status === "completed"
                      ? formatDateTime(new Date(transaction.timestamp.getTime() + 120000))
                      : "Awaiting confirmation"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {transaction.notes && (
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">Additional Notes</h4>
              <p className="text-gray-700">{transaction.notes}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={handleDownloadReceipt}>
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            {transaction.status === "completed" && (
              <Button variant="outline" onClick={handleRefund} className="text-red-600 hover:text-red-700">
                <RefreshCw className="w-4 h-4 mr-2" />
                Initiate Refund
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
