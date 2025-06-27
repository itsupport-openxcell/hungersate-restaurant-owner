import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  BuildingStorefrontIcon,
  CubeIcon
} from '@heroicons/react/24/outline'

const Sidebar = () => {
  const location = useLocation()
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Menu Management', path: '/menu', icon: ClipboardDocumentListIcon },
    { name: 'Cuisines', path: '/cuisines', icon: CubeIcon },
    { name: 'Restaurants', path: '/restaurants', icon: BuildingStorefrontIcon },
  ]
  
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold italic text-[#FF0000]">Restaurant Admin</h1>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname.startsWith(item.path)
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm italic hover:bg-gray-700 transition-colors ${
                isActive ? 'bg-[#FF0000] text-white' : 'text-gray-300'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar