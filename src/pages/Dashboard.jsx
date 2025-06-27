import React from 'react'
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  DollarSign 
} from 'lucide-react'

const Dashboard = () => {
  const stats = [
    {
      title: "Total Orders",
      value: "1,234",
      change: "+12%",
      icon: ShoppingCart,
      color: "bg-blue-500"
    },
    {
      title: "Pending Orders",
      value: "23",
      change: "-5%",
      icon: Clock,
      color: "bg-yellow-500"
    },
    {
      title: "Completed Orders",
      value: "1,211",
      change: "+18%",
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Revenue",
      value: "$45,678",
      change: "+25%",
      icon: DollarSign,
      color: "bg-red-500"
    },
    {
      title: "Active Restaurants",
      value: "156",
      change: "+8%",
      icon: TrendingUp,
      color: "bg-purple-500"
    },
    {
      title: "Total Users",
      value: "8,945",
      change: "+15%",
      icon: Users,
      color: "bg-indigo-500"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your restaurant management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: "New order received", time: "2 minutes ago", type: "order" },
              { action: "Restaurant approved", time: "1 hour ago", type: "approval" },
              { action: "Payment processed", time: "3 hours ago", type: "payment" },
              { action: "New user registered", time: "5 hours ago", type: "user" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'order' ? 'bg-blue-500' :
                  activity.type === 'approval' ? 'bg-green-500' :
                  activity.type === 'payment' ? 'bg-yellow-500' : 'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard