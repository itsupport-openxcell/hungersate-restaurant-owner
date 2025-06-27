import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, User, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../components/Button'
import { Input, Select, FormField } from '../../components/Form'
import Modal from '../../components/Modal'
import Pagination from '../../components/Pagination'
import { PageLoader, LoadingSpinner } from '../../components/Loader'
import toast from 'react-hot-toast'

const SubUsersList = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddUser, setShowAddUser] = useState(false)
  const [showEditUser, setShowEditUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [activeTab, setActiveTab] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [actionLoading, setActionLoading] = useState({})
  const itemsPerPage = 5

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Rahul Sharma",
      role: "Manager",
      email: "Rahul.sharma@example.com",
      phone: "+91 987654321",
      isActive: true,
    },
    {
      id: "2",
      name: "Vivek Shah",
      role: "Chef",
      email: "Vivek.shah@example.com",
      phone: "+91 987654322",
      isActive: false
    },
    {
      id: "3",
      name: "Meera Gupta",
      role: "Designer",
      email: "Meera.gupta@example.com",
      phone: "+91 987654323",
      isActive: true
    },
    {
      id: "4",
      name: "Anil Patel",
      role: "Developer",
      email: "Anil.patel@example.com",
      phone: "+91 987654324",
      isActive: true
    },
    {
      id: "5",
      name: "Nisha Roy",
      role: "Marketing Specialist",
      email: "Nisha.roy@example.com",
      phone: "+91 987654325",
      isActive: false
    },
    {
      id: "6",
      name: "Kiran Singh",
      role: "Waiter",
      email: "Kiran.singh@example.com",
      phone: "+91 987654326",
      isActive: true
    },
    {
      id: "7",
      name: "Priya Joshi",
      role: "Cashier",
      email: "Priya.joshi@example.com",
      phone: "+91 987654327",
      isActive: true
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      activeTab === "All" || 
      (activeTab === "Active" && user.isActive) || 
      (activeTab === "Inactive" && !user.isActive)

    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handleToggleUser = async (userId) => {
    setActionLoading(prev => ({ ...prev, [`toggle-${userId}`]: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user)))
    toast.success('User status updated successfully')
    setActionLoading(prev => ({ ...prev, [`toggle-${userId}`]: false }))
  }

  const handleDeleteUser = async (userId) => {
    setActionLoading(prev => ({ ...prev, [`delete-${userId}`]: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    toast.success('User deleted successfully')
    
    // Adjust current page if necessary
    if (paginatedUsers.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
    setActionLoading(prev => ({ ...prev, [`delete-${userId}`]: false }))
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowEditUser(true)
  }

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "manager":
        return "bg-blue-100 text-blue-800"
      case "chef":
        return "bg-green-100 text-green-800"
      case "designer":
        return "bg-purple-100 text-purple-800"
      case "developer":
        return "bg-orange-100 text-orange-800"
      case "marketing specialist":
        return "bg-pink-100 text-pink-800"
      case "waiter":
        return "bg-yellow-100 text-yellow-800"
      case "cashier":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusCounts = () => {
    const active = users.filter((user) => user.isActive).length
    const inactive = users.filter((user) => !user.isActive).length
    return { active, inactive, total: users.length }
  }

  const statusCounts = getStatusCounts()

  if (loading) {
    return <PageLoader message="Loading users..." />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">👥 Sub-User Management</h1>
          <p className="text-gray-600">Manage restaurant staff and their access</p>
        </div>
        <Button onClick={() => setShowAddUser(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex">
          {(["All", "Active", "Inactive"]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setCurrentPage(1)
              }}
              className={`flex-1 py-4 px-4 text-center font-bold transition-all ${
                activeTab === tab
                  ? "text-red-500 border-b-2 border-red-500 bg-gradient-to-t from-red-50 to-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab === "All" && "📊"} {tab === "Active" && "🟢"} {tab === "Inactive" && "🔴"} {tab}
              {tab !== "All" && (
                <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded-full">
                  ({tab === "Active" ? statusCounts.active : statusCounts.inactive})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="🔍 Search users by name, role, or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="pl-12 h-14 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 font-medium"
          aria-label="Search users"
        />
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {paginatedUsers.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-4">👥</div>
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl font-bold">No users found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-gray-50 hover:border-red-200 rounded-lg"
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md">
                    <img
                      src="/images/user.jpg"
                      alt="User"
                      className="w-full h-full object-contain rounded-xl"
                      onError={(e) => {
                        e.target.src = "/images/food-placeholder.png"
                      }}
                    />
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${getRoleColor(user.role)} shadow-sm`}>
                        {user.role === "Manager" && "👔"}
                        {user.role === "Chef" && "👨‍🍳"}
                        {user.role === "Designer" && "🎨"}
                        {user.role === "Developer" && "💻"}
                        {user.role === "Marketing Specialist" && "📢"}
                        {user.role === "Waiter" && "🍽️"}
                        {user.role === "Cashier" && "💰"}
                        {user.role}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1 font-medium">📧 {user.email}</p>
                    <p className="text-sm text-gray-500 font-medium">📱 {user.phone}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-500 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-all shadow-sm border border-blue-200"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={user.isActive}
                          onChange={() => handleToggleUser(user.id)}
                          className="sr-only peer"
                          disabled={actionLoading[`toggle-${user.id}`]}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                      </label>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${user.isActive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}
                      >
                        {actionLoading[`toggle-${user.id}`] ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          user.isActive ? "Active" : "Inactive"
                        )}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-700 p-3 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-red-200"
                      disabled={actionLoading[`delete-${user.id}`]}
                    >
                      {actionLoading[`delete-${user.id}`] ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
        />
      )}

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddUser}
        onClose={() => setShowAddUser(false)}
        onAddUser={(user) => {
          setUsers((prev) => [...prev, { ...user, id: Date.now().toString() }])
          toast.success('User added successfully')
          setShowAddUser(false)
        }}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={showEditUser}
        user={selectedUser}
        onClose={() => {
          setShowEditUser(false)
          setSelectedUser(null)
        }}
        onUpdateUser={(updatedUser) => {
          setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
          setShowEditUser(false)
          setSelectedUser(null)
          toast.success('User updated successfully')
        }}
      />
    </div>
  )
}

// Add User Modal Component
const AddUserModal = ({ isOpen, onClose, onAddUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "+91 ",
    isActive: true,
  })

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const roles = ["Manager", "Chef", "Designer", "Developer", "Marketing Specialist", "Waiter", "Cashier"]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.role) newErrors.role = "Role is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\+91 \d{9,10}$/.test(formData.phone)) newErrors.phone = "Invalid phone format (+91 XXXXXXXXXX)"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      setSaving(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onAddUser(formData)
      // Reset form
      setFormData({
        name: "",
        role: "",
        email: "",
        phone: "+91 ",
        isActive: true,
      })
      setErrors({})
      setSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New User"
      size="md"
    >
      <div className="space-y-4">
        <FormField label="Name" error={errors.name} required>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter full name"
            className="h-12"
          />
        </FormField>

        <FormField label="Role" error={errors.role} required>
          <Select
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            className="text-gray-900"
          >
            <option value="" className="text-gray-900">Select role</option>
            {roles.map((role) => (
              <option key={role} value={role} className="text-gray-900">{role}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Email" error={errors.email} required>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="user@example.com"
            className="h-12"
          />
        </FormField>

        <FormField label="Phone" error={errors.phone} required>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+91 9876543210"
            className="h-12"
          />
        </FormField>

        <FormField label="Active Status">
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleInputChange("isActive", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {formData.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </FormField>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button onClick={onClose} variant="outline" className="px-4 py-2">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
          disabled={saving}
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size="sm" color="white" />
              Adding...
            </div>
          ) : (
            "Add User"
          )}
        </Button>
      </div>
    </Modal>
  )
}

// Edit User Modal Component
const EditUserModal = ({ isOpen, user, onClose, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    isActive: true,
  })

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const roles = ["Manager", "Chef", "Designer", "Developer", "Marketing Specialist", "Waiter", "Cashier"]

  // Initialize form with user data when it changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        role: user.role || "",
        email: user.email || "",
        phone: user.phone || "",
        isActive: user.isActive,
      })
    }
  }, [user])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.role) newErrors.role = "Role is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\+91 \d{9,10}$/.test(formData.phone)) newErrors.phone = "Invalid phone format (+91 XXXXXXXXXX)"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm() && user) {
      setSaving(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onUpdateUser({
        ...user,
        ...formData,
      })
      setSaving(false)
    }
  }

  if (!isOpen || !user) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit User"
      size="md"
    >
      <div className="space-y-4">
        <FormField label="Name" error={errors.name} required>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter full name"
            className="h-12"
          />
        </FormField>

        <FormField label="Role" error={errors.role} required>
          <Select
            value={formData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            className="text-gray-900"
          >
            {roles.map((role) => (
              <option key={role} value={role} className="text-gray-900">{role}</option>
            ))}
          </Select>
        </FormField>

        <FormField label="Email" error={errors.email} required>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="user@example.com"
            className="h-12"
          />
        </FormField>

        <FormField label="Phone" error={errors.phone} required>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+91 9876543210"
            className="h-12"
          />
        </FormField>

        <FormField label="Active Status">
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleInputChange("isActive", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {formData.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </FormField>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button onClick={onClose} variant="outline" className="px-4 py-2">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
          disabled={saving}
        >
          {saving ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size="sm" color="white" />
              Updating...
            </div>
          ) : (
            "Update User"
          )}
        </Button>
      </div>
    </Modal>
  )
}

export default SubUsersList