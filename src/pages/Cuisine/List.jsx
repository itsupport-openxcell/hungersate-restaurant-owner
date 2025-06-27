import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search } from 'lucide-react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { Input } from '../../components/Form'
import toast from 'react-hot-toast'

const CuisineList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null })

  const [cuisines, setCuisines] = useState([
    {
      id: 1,
      name: "Indian",
      description: "Traditional Indian cuisine with rich spices and flavors",
      status: "Active",
      itemCount: 45
    },
    {
      id: 2,
      name: "Chinese",
      description: "Authentic Chinese dishes with oriental flavors",
      status: "Active",
      itemCount: 32
    },
    {
      id: 3,
      name: "Italian",
      description: "Classic Italian cuisine with pasta and pizza",
      status: "Inactive",
      itemCount: 28
    }
  ])

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { 
      header: "Menu Items", 
      accessor: "itemCount",
      render: (value) => `${value} items`
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    }
  ]

  const filteredCuisines = cuisines.filter(cuisine =>
    cuisine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cuisine.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (item) => {
    navigate(`/cuisine/edit/${item.id}`)
  }

  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item })
  }

  const confirmDelete = () => {
    setCuisines(prev => prev.filter(item => item.id !== deleteModal.item.id))
    setDeleteModal({ isOpen: false, item: null })
    toast.success('Cuisine deleted successfully')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cuisine Management</h1>
          <p className="text-gray-600">Manage different cuisine types</p>
        </div>
        <Button onClick={() => navigate('/cuisine/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Cuisine
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search cuisines..."
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
          data={filteredCuisines}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        title="Delete Cuisine"
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
        <p>Are you sure you want to delete "{deleteModal.item?.name}" cuisine? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default CuisineList