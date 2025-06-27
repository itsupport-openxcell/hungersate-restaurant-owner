import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Menu, 
  ShoppingCart, 
  CreditCard, 
  Users, 
  User, 
  Clock, 
  HelpCircle, 
  Settings 
} from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Menu, label: "Menu Management", path: "/menu" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: Users, label: "Sub Users", path: "/sub-users" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Clock, label: "Pickup Management", path: "/pickup" },
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ]

  return (
    <div className="bg-white shadow-lg h-full w-64 fixed left-0 top-0 z-40 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img 
            src="/images/Logo-icon.png" 
            alt="Logo" 
            className="w-10 h-10"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900">HUNGERSATE</h1>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 pb-6">
        <div className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 mb-1 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-600 border-r-2 border-red-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default Sidebar