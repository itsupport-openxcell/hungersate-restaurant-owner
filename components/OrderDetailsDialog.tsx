"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Package,
  Star,
  Truck,
  CheckCircle,
  XCircle,
  Calendar,
  Timer,
} from "lucide-react"

interface OrderDetailsDialogProps {
  order: any
  isOpen: boolean
  onClose: () => void
  onAccept?: (orderId: string) => void
  onReject?: (orderId: string) => void
  onUpdateStatus?: (orderId: string, status: string) => void
  type: "request" | "ongoing" | "history"
}

export function OrderDetailsDialog({
  order,
  isOpen,
  onClose,
  onAccept,
  onReject,
  onUpdateStatus,
  type,
}: OrderDetailsDialogProps) {
  if (!order) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "preparing":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "ready_for_pickup":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "out_for_delivery":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "rejected":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "unpaid":
        return "bg-red-100 text-red-800 border-red-200"
      case "refunded":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

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

  const formatEstimatedTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((date.getTime() - now.getTime()) / (1000 * 60))

    if (diffInMinutes <= 0) {
      return "Due now"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} mins`
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60)
      return `${diffInHours}h ${diffInMinutes % 60}m`
    }
  }

  const calculateDuration = (start: Date, end: Date | null) => {
    if (!end) return "N/A"
    const diffInMinutes = Math.floor((end.getTime() - start.getTime()) / (1000 * 60))
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = diffInMinutes % 60
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-gray-800">Order Details</DialogTitle>
            <div className="flex items-center space-x-2">
              <Badge className={`${getStatusColor(order.status)} border font-medium px-3 py-1`}>
                {order.status.replace("_", " ").toUpperCase()}
              </Badge>
              <Badge className={`${getPaymentColor(order.paymentStatus)} border font-medium px-3 py-1`}>
                {order.paymentStatus.toUpperCase()}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary Header */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Order #{order.id}</h3>
                <p className="text-gray-600 mt-1">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Ordered {formatTime(order.orderTime)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600">₹{order.totalAmount}</div>
                <p className="text-sm text-gray-600">{order.items.length} items</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-blue-800">Customer Information</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{order.customerName}</p>
                    <p className="text-sm text-gray-600">Customer</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-800">{order.customerPhone}</p>
                    <p className="text-sm text-gray-600">Phone Number</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">{order.customerAddress}</p>
                    <p className="text-sm text-gray-600">Delivery Address</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-green-800">Order Information</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-green-600 mr-3" />
                    <span className="text-gray-600">Order ID</span>
                  </div>
                  <span className="font-medium text-gray-800">{order.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-green-600 mr-3" />
                    <span className="text-gray-600">Order Date</span>
                  </div>
                  <span className="font-medium text-gray-800">{order.orderTime.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 text-green-600 mr-3" />
                    <span className="text-gray-600">Payment</span>
                  </div>
                  <Badge className={`${getPaymentColor(order.paymentStatus)} border`}>{order.paymentStatus}</Badge>
                </div>
                {order.completionTime && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Timer className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-gray-600">Duration</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {calculateDuration(order.orderTime, order.completionTime)}
                    </span>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-green-600 mr-3" />
                      <span className="text-gray-600">ETA</span>
                    </div>
                    <span className="font-medium text-orange-600">{formatEstimatedTime(order.estimatedDelivery)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Person Information (for ongoing orders) */}
          {order.deliveryPerson && type === "ongoing" && (
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-purple-800">Delivery Information</h4>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.deliveryPerson.name}</p>
                    <p className="text-sm text-gray-600">{order.deliveryPerson.phone}</p>
                    <p className="text-sm text-purple-600">Delivery Partner</p>
                  </div>
                </div>
                {order.estimatedDelivery && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-semibold text-purple-600">{formatEstimatedTime(order.estimatedDelivery)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Order Items */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Order Items ({order.items.length})
            </h4>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ₹{item.price} each</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">₹{item.price * item.quantity}</p>
                    <p className="text-sm text-gray-600">Subtotal</p>
                  </div>
                </div>
              ))}

              <Separator className="my-4" />

              <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="flex items-center">
                  <CreditCard className="w-6 h-6 text-orange-600 mr-3" />
                  <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                </div>
                <span className="text-2xl font-bold text-orange-600">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Customer Feedback (for history orders) */}
          {order.feedback && type === "history" && (
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Customer Feedback
              </h4>
              <div className="space-y-3">
                {order.rating && (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < order.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({order.rating}/5)</span>
                    </div>
                  </div>
                )}
                <div className="bg-white p-4 rounded-lg border border-yellow-200">
                  <p className="text-gray-800 italic">"{order.feedback}"</p>
                </div>
                {order.deliveryPerson && (
                  <p className="text-sm text-gray-600">
                    <strong>Delivered by:</strong> {order.deliveryPerson}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            {type === "request" && order.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    onReject?.(order.id)
                    onClose()
                  }}
                  className="flex items-center space-x-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Order</span>
                </Button>
                <Button
                  onClick={() => {
                    onAccept?.(order.id)
                    onClose()
                  }}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept Order</span>
                </Button>
              </>
            )}

            {type === "ongoing" && (
              <div className="flex space-x-2">
                {order.status === "preparing" && (
                  <Button
                    onClick={() => {
                      onUpdateStatus?.(order.id, "ready_for_pickup")
                      onClose()
                    }}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Ready for Pickup</span>
                  </Button>
                )}
                {order.status === "ready_for_pickup" && (
                  <Button
                    onClick={() => {
                      onUpdateStatus?.(order.id, "out_for_delivery")
                      onClose()
                    }}
                    className="flex items-center space-x-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Out for Delivery</span>
                  </Button>
                )}
              </div>
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
