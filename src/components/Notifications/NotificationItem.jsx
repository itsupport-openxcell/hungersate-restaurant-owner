import React from 'react'
import { Package, CreditCard } from 'lucide-react'
import Button from '../Button'

const NotificationItem = ({ 
  id, 
  type, 
  title, 
  message, 
  time, 
  amount, 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className="cursor-pointer bg-white border border-gray-100 rounded-2xl p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
      style={{
        background: `linear-gradient(135deg, ${type === "order"
          ? "rgba(59, 130, 246, 0.02), rgba(147, 197, 253, 0.05)"
          : "rgba(34, 197, 94, 0.02), rgba(134, 239, 172, 0.05)"
          })`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${type === "order" ? "bg-blue-500" : "bg-green-500"
              }`}
          >
            {type === "order" ? (
              <Package className="w-6 h-6 text-white" />
            ) : (
              <CreditCard className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
            <div className="flex gap-2 mt-1">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${type === "order"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
                }`}>
                {type === "order" ? "📦 Order" : "💳 Payment"}
              </span>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">⏰ {time}</span>
            </div>
          </div>
        </div>
        {amount && (
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">{amount}</span>
            <div className="text-xs text-gray-500 mt-1">Amount</div>
          </div>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{message}</p>
      <div className="flex justify-between">
        <Button className="bg-red-500 text-white hover:bg-red-600 rounded-xl px-6 py-2 text-sm shadow-md">
          👁️ Tap to view
        </Button>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          New
        </div>
      </div>
    </div>
  )
}

export default NotificationItem