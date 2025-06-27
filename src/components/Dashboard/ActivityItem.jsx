import React from 'react'
import { User, ShoppingCart, Calendar } from 'lucide-react'

const ActivityItem = ({ 
  id, 
  date, 
  time, 
  status, 
  action, 
  customer, 
  items, 
  amount, 
  avatar, 
  priority 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "HOT":
        return "bg-red-100 text-red-800 border-red-200"
      case "COLD":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-900">{id}</span>
          <span className={`text-xs border px-2 py-0.5 rounded-full ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
        <div className="text-sm text-gray-600 mb-1">{action}</div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {customer}
          </div>
          <div className="flex items-center gap-1">
            <ShoppingCart className="w-3 h-3" />
            {items}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {date} {time}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold text-gray-900">{amount}</div>
      </div>
    </div>
  )
}

export default ActivityItem