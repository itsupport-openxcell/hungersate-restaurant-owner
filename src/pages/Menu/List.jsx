import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { Input } from '../../components/Form'
import toast from 'react-hot-toast'

const MenuList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null })

  // Mock data - replace with actual API call
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Paneer Tikka",
      description: "Marinated cottage cheese cubes grilled to perfection",
      price: 320,
      cuisine: "Indian",
      category: "Veg",
      status: "Available",
      image: "/images/paneer-tikka.png"
    },
    {
      id: 2,
      name: "Butter Chicken",
      description: "Creamy tomato-based curry with tender chicken",
      price: 450,
      cuisine: "Indian",
      category: "Non-Veg",
      status: "Available",
      image: "/images/food-placeholder.png"
    },
    {
      id: 3,
      name: "Vegetable Biryani",
      description: "Aromatic basmati rice with mixed vegetables",
      price: 380,
      cuisine: "Indian",
      category: "Veg",
      status: "Unavailable",
      image: "/images/biryani.png"
    }
  ])

  const columns = [
    {
      header: "Image",
      accessor: "image",
      render: (value) => (
        <img 
          src={value || "/images/food-placeholder.png"} 
          alt="Menu item" 
          className="w-12 h-12 rounded-lg object-cover"
          onError={(e) => {
            e.target.src = "/images/food-placeholder.png"
          }}
        />
      )
    },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { 
      header: "Price", 
      accessor: "price",
      render: (value) => `₹${value}`
    },
    { header: "Cuisine", accessor: "cuisine" },
    { header: "Category", accessor: "category" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Available' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ]

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (item) => {
    navigate(`/menu/edit/${item.id}`)
  }

  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item })
  }

  const confirmDelete = () => {
    setMenuItems(prev => prev.filter(item => item.id !== deleteModal.item.id))
    setDeleteModal({ isOpen: false, item: null })
    toast.success('Menu item deleted successfully')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant menu items</p>
        </div>
        <Button onClick={() => navigate('/menu/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search menu items..."
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
          data={filteredItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        title="Delete Menu Item"
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

export default MenuList