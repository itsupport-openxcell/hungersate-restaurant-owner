"use client"

import { useState } from "react"
import { ArrowLeft, Search, Plus, Trash2, User, Edit, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface SubUserManagementProps {
  isOpen: boolean
  onClose: () => void
}

type UserStatus = "All" | "Active" | "Inactive"
type UserRole = "All" | "Manager" | "Chef" | "Designer" | "Developer" | "Marketing Specialist" | "Waiter" | "Cashier"

interface SubUser {
  id: string
  name: string
  role: string
  email: string
  phone: string
  isActive: boolean
  avatar?: string
  joinDate: string
  lastActive: string
}

export default function SubUserManagement({ isOpen, onClose }: SubUserManagementProps) {
  const [activeTab, setActiveTab] = useState<UserStatus>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddUser, setShowAddUser] = useState(false)
  const [showEditUser, setShowEditUser] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedUser, setSelectedUser] = useState<SubUser | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState<UserRole>("All")
  const itemsPerPage = 5

  const [users, setUsers] = useState<SubUser[]>([
    {
      id: "1",
      name: "Rahul Sharma",
      role: "Manager",
      email: "Rahul.sharma@example.com",
      phone: "+91 987654321",
      isActive: true,
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Vivek Shah",
      role: "Chef",
      email: "Vivek.shah@example.com",
      phone: "+91 987654322",
      isActive: false,
      joinDate: "2024-01-10",
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Meera Gupta",
      role: "Designer",
      email: "Meera.gupta@example.com",
      phone: "+91 987654323",
      isActive: true,
      joinDate: "2024-01-20",
      lastActive: "30 minutes ago",
    },
    {
      id: "4",
      name: "Anil Patel",
      role: "Developer",
      email: "Anil.patel@example.com",
      phone: "+91 987654324",
      isActive: true,
      joinDate: "2024-01-05",
      lastActive: "1 hour ago",
    },
    {
      id: "5",
      name: "Nisha Roy",
      role: "Marketing Specialist",
      email: "Nisha.roy@example.com",
      phone: "+91 987654325",
      isActive: false,
      joinDate: "2024-01-25",
      lastActive: "3 days ago",
    },
    {
      id: "6",
      name: "Kiran Singh",
      role: "Waiter",
      email: "Kiran.singh@example.com",
      phone: "+91 987654326",
      isActive: true,
      joinDate: "2024-02-01",
      lastActive: "5 minutes ago",
    },
    {
      id: "7",
      name: "Priya Joshi",
      role: "Cashier",
      email: "Priya.joshi@example.com",
      phone: "+91 987654327",
      isActive: true,
      joinDate: "2024-02-05",
      lastActive: "15 minutes ago",
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      activeTab === "All" || (activeTab === "Active" && user.isActive) || (activeTab === "Inactive" && !user.isActive)

    const matchesRole = roleFilter === "All" || user.role === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage)

  const handleToggleUser = (userId: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, isActive: !user.isActive } : user)))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
    // Adjust current page if necessary
    if (paginatedUsers.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleEditUser = (user: SubUser) => {
    setSelectedUser(user)
    setShowEditUser(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRoleColor = (role: string) => {
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

  if (!isOpen) return null

  return (
    <>
      <div className="fixed left-80 top-0 right-0 bottom-0 bg-white z-50 shadow-xl border-l border-gray-200 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 shadow-lg p-4 pt-12 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-white hover:text-red-100 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-white">👥 Sub-User Management</h1>
            <button
              onClick={() => setShowAddUser(true)}
              className="text-white hover:text-red-100 bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-center bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 flex items-center gap-1">👥 {statusCounts.total}</div>
                <div className="text-xs text-gray-500 font-medium">Total Users</div>
              </div>
              <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg px-4 py-3 shadow-sm border border-green-100">
                <div className="text-2xl font-bold text-green-600 flex items-center gap-1">
                  🟢 {statusCounts.active}
                </div>
                <div className="text-xs text-green-600 font-medium">Active</div>
              </div>
              <div className="text-center bg-gradient-to-br from-red-50 to-pink-50 rounded-lg px-4 py-3 shadow-sm border border-red-100">
                <div className="text-2xl font-bold text-red-600 flex items-center gap-1">
                  🔴 {statusCounts.inactive}
                </div>
                <div className="text-xs text-red-600 font-medium">Inactive</div>
              </div>
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              size="sm"
              className="text-gray-600 border-gray-300 hover:bg-white hover:shadow-md transition-all"
            >
              <Filter className="w-4 h-4 mr-1" />🔍 Filters
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0 shadow-sm">
          <div className="flex">
            {(["All", "Active", "Inactive"] as UserStatus[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setCurrentPage(1)
                }}
                className={`flex-1 py-4 px-4 text-center font-bold transition-all ${
                  activeTab === tab
                    ? "text-red-500 border-b-3 border-red-500 bg-gradient-to-t from-red-50 to-white"
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

        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-100 p-4 flex-shrink-0">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="🔍 Search users by name, role, or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-12 h-14 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-200 font-medium"
              />
            </div>
          </div>

          {/* Role Filter */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                🏷️ Filter by Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value as UserRole)
                  setCurrentPage(1)
                }}
                className="w-full h-12 px-4 border-2 border-blue-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium shadow-sm"
              >
                <option value="All">All Roles</option>
                <option value="Manager">👔 Manager</option>
                <option value="Chef">👨‍🍳 Chef</option>
                <option value="Designer">🎨 Designer</option>
                <option value="Developer">💻 Developer</option>
                <option value="Marketing Specialist">📢 Marketing Specialist</option>
                <option value="Waiter">🍽️ Waiter</option>
                <option value="Cashier">💰 Cashier</option>
              </select>
            </div>
          )}
        </div>

        {/* Users List - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {paginatedUsers.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-dashed border-gray-200">
                <div className="text-6xl mb-4">👥</div>
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-xl font-bold">No users found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="space-y-4 pb-20">
                {paginatedUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-br from-white to-gray-50 hover:border-red-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-16 h-16 bg-gradient-to-br from-red-400 via-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <span className="text-white font-bold text-lg">{getInitials(user.name)}</span>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
                            <Badge className={`text-xs font-bold ${getRoleColor(user.role)} shadow-sm`}>
                              {user.role === "Manager" && "👔"}
                              {user.role === "Chef" && "👨‍🍳"}
                              {user.role === "Designer" && "🎨"}
                              {user.role === "Developer" && "💻"}
                              {user.role === "Marketing Specialist" && "📢"}
                              {user.role === "Waiter" && "🍽️"}
                              {user.role === "Cashier" && "💰"}
                              {user.role}
                            </Badge>
                            {user.isActive && (
                              <Badge
                                variant="secondary"
                                className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 font-bold"
                              >
                                🟢 Online
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1 font-medium">📧 {user.email}</p>
                          <p className="text-sm text-gray-500 font-medium">📱 {user.phone}</p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                            <span className="bg-gray-100 px-2 py-1 rounded-full">📅 Joined: {user.joinDate}</span>
                            <span className="bg-gray-100 px-2 py-1 rounded-full">
                              ⏰ Last active: {user.lastActive}
                            </span>
                          </div>
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
                            <Switch
                              checked={user.isActive}
                              onCheckedChange={() => handleToggleUser(user.id)}
                              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
                            />
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded-full ${user.isActive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}
                            >
                              {user.isActive ? "Active" : "Inactive"}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-500 hover:text-red-700 p-3 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-red-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-gradient-to-r from-white to-gray-50 border-t border-gray-200 p-4 flex-shrink-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-2 rounded-full">
                📊 Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 border-2 hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <span className="text-sm font-bold bg-red-100 text-red-700 px-4 py-2 rounded-full">
                  {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 border-2 hover:bg-gray-50 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onAddUser={(user) => setUsers((prev) => [...prev, { ...user, id: Date.now().toString() }])}
        />
      )}

      {/* Edit User Modal */}
      {showEditUser && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditUser(false)
            setSelectedUser(null)
          }}
          onUpdateUser={(updatedUser) => {
            setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
            setShowEditUser(false)
            setSelectedUser(null)
          }}
        />
      )}
    </>
  )
}

// Add User Modal Component (same as before but with join date)
interface AddUserModalProps {
  onClose: () => void
  onAddUser: (user: Omit<SubUser, "id">) => void
}

function AddUserModal({ onClose, onAddUser }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    isActive: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const roles = ["Manager", "Chef", "Designer", "Developer", "Marketing Specialist", "Waiter", "Cashier"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.role.trim()) newErrors.role = "Role is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\+91 \d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone format (+91 XXXXXXXXXX)"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onAddUser({
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
        lastActive: "Just now",
      })
      onClose()
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white max-h-[90vh] overflow-y-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add New User</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className="h-12"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="user@example.com"
                  className="h-12"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 9876543210"
                  className="h-12"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Active Status</label>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={onClose} variant="outline" className="flex-1 h-12">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white">
                Add User
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// Edit User Modal Component
interface EditUserModalProps {
  user: SubUser
  onClose: () => void
  onUpdateUser: (user: SubUser) => void
}

function EditUserModal({ user, onClose, onUpdateUser }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    email: user.email,
    phone: user.phone,
    isActive: user.isActive,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const roles = ["Manager", "Chef", "Designer", "Developer", "Marketing Specialist", "Waiter", "Cashier"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.role.trim()) newErrors.role = "Role is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\+91 \d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone format (+91 XXXXXXXXXX)"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onUpdateUser({
        ...user,
        ...formData,
      })
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white max-h-[90vh] overflow-y-auto">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className="h-12"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="user@example.com"
                  className="h-12"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 9876543210"
                  className="h-12"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Active Status</label>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={onClose} variant="outline" className="flex-1 h-12">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white">
                Update User
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
