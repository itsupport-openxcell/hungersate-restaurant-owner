import React from 'react'

const Dashboard = () => {
  const stats = [
    { title: 'Total Restaurants', value: '25', color: 'bg-blue-500' },
    { title: 'Menu Items', value: '342', color: 'bg-green-500' },
    { title: 'Cuisines', value: '18', color: 'bg-yellow-500' },
    { title: 'Active Orders', value: '127', color: 'bg-[#FF0000]' },
  ]
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 italic">Dashboard</h1>
        <p className="text-gray-600 italic">Welcome to the Restaurant Admin Panel</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-full p-3 mr-4`}>
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 italic">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 italic">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 italic">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600 italic">New restaurant added</span>
              <span className="text-xs text-gray-400 italic">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-gray-600 italic">Menu item updated</span>
              <span className="text-xs text-gray-400 italic">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 italic">New cuisine category</span>
              <span className="text-xs text-gray-400 italic">1 day ago</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 italic">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-[#FF0000] hover:bg-[#E60000] text-white py-2 px-4 rounded italic">
              Add New Restaurant
            </button>
            <button className="w-full bg-[#FF0000] hover:bg-[#E60000] text-white py-2 px-4 rounded italic">
              Add Menu Item
            </button>
            <button className="w-full bg-[#FF0000] hover:bg-[#E60000] text-white py-2 px-4 rounded italic">
              Add Cuisine
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard