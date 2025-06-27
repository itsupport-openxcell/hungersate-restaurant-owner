import React, { useState } from 'react'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logout clicked')
  }
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 italic">Admin Panel</h2>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <div className="w-8 h-8 bg-[#FF0000] rounded-full flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
            <span className="italic">Admin User</span>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 italic"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 italic"
              >
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 italic"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar