import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, MapPin, Phone } from 'lucide-react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { Input } from '../../components/Form'
import toast from 'react-hot-toast'

const RestaurantList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null })

  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "Spice Garden",
      owner: "John Doe",
      phone: "+91 9876543210",
      address: "123 Main Street, Mumbai",
      cuisine: "Indian, Chinese",
      status: "Active",
      rating: 4.5
    },
    {
      id: 2,
      name: "Pizza Palace",
      owner: "Jane Smith",
      phone: "+91 9876543211",
      address: "456 Park Avenue, Delhi",
      cuisine: "Italian",
      status: "Pending",
      rating: 4.2
    },
    {
      id: 3,
      name: "Burger Hub",
      owner: "Mike Johnson",
      phone: "+91 9876543212",
      address: "789 Food Street, Bangalore",
      cuisine: "American",
      status: "Inactive",
      rating: 3.8
    }
  ])

  const columns = [
    { header: "Restaurant Name", accessor: "name" },
    { header: "Owner", accessor: "owner" },
    { 
      header: "Contact", 
      accessor: "phone",
      render: (value) => (
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-1 text-gray-400" />
          {value}
        </div>
      )
    },
    { 
      header: "Address", 
      accessor: "address",
      render: (value) => (
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          <span className="truncate max-w-xs">{value}</span>
        </div>
      )
    },
    { header: "Cuisine", accessor: "cuisine" },
    { 
      header: "Rating", 
      accessor: "rating",
      render: (value) => (
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{value}</span>
        </div>
      )
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' ? 'bg-green-100 text-green-800' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ]

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (item) => {
    navigate(`/restaurants/edit/${item.id}`)
  }

  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item })
  }

  const confirmDelete = () => {
    setRestaurants(prev => prev.filter(item => item.id !== deleteModal.item.id))
    setDeleteModal({ isOpen: false, item: null })
    toast.success('Restaurant deleted successfully')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Management</h1>
          <p className="text-gray-600">Manage restaurants on your platform</p>
        </div>
        <Button onClick={() => navigate('/restaurants/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Restaurant
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table
          columns={columns}
          data={filteredRestaurants}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        title="Delete Restaurant"
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => setDeleteModal({ isOpen: false, item: null })}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete "{deleteModal.item?.name}"? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default RestaurantList