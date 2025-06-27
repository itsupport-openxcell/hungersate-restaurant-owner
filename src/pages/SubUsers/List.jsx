import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Mail, Phone } from 'lucide-react'
import Button from '../../components/Button'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import { Input } from '../../components/Form'
import toast from 'react-hot-toast'

const SubUsersList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null })

  const [subUsers, setSubUsers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+91 9876543210",
      role: "Manager",
      restaurant: "Spice Garden",
      status: "Active",
      lastLogin: "2024-01-15"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+91 9876543211",
      role: "Chef",
      restaurant: "Pizza Palace",
      status: "Active",
      lastLogin: "2024-01-14"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      phone: "+91 9876543212",
      role: "Cashier",
      restaurant: "Burger Hub",
      status: "Inactive",
      lastLogin: "2024-01-10"
    }
  ])

  const columns = [
    { header: "Name", accessor: "name" },
    { 
      header: "Contact", 
      accessor: "email",
      render: (value, row) => (
        <div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-1 text-gray-400" />
            <span className="text-sm">{value}</span>
          </div>
          <div className="flex items-center mt-1">
            <Phone className="h-4 w-4 mr-1 text-gray-400" />
            <span className="text-sm">{row.phone}</span>
          </div>
        </div>
      )
    },
    { header: "Role", accessor: "role" },
    { header: "Restaurant", accessor: "restaurant" },
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
    },
    { header: "Last Login", accessor: "lastLogin" }
  ]

  const filteredUsers = subUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (item) => {
    // Navigate to edit form or open edit modal
    console.log('Edit user:', item)
  }

  const handleDelete = (item) => {
    setDeleteModal({ isOpen: true, item })
  }

  const confirmDelete = () => {
    setSubUsers(prev => prev.filter(item => item.id !== deleteModal.item.id))
    setDeleteModal({ isOpen: false, item: null })
    toast.success('Sub-user deleted successfully')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sub-User Management</h1>
          <p className="text-gray-600">Manage restaurant staff and their access</p>
        </div>
        <Button onClick={() => console.log('Add new sub-user')}>
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
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
          data={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, item: null })}
        title="Delete Sub-User"
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

export default SubUsersList