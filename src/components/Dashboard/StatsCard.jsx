import React from 'react'
import { cn } from '@/utils/cn'

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  count, 
  action, 
  icon: Icon, 
  color, 
  textColor, 
  bgColor,
  onClick
}) => {
  return (
    <div className="hover:shadow-lg border-0 shadow-md rounded-lg">
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <p className="text-sm text-gray-500">{subtitle}</p>
          {count && <div className="text-lg font-semibold text-gray-700">{count}</div>}
        </div>
        <button
          onClick={onClick}
          className={`w-full mt-4 px-4 py-2 text-sm font-medium rounded-md border ${textColor} border-current hover:${bgColor}`}
        >
          {action}
        </button>
      </div>
    </div>
  )
}

export default StatsCard