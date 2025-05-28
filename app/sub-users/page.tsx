"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubUserDialog } from "@/components/SubUserDialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Layout from "@/components/Layout"
import { Plus, Edit, Trash2, Search, UserCheck, UserX, Download, Users, Shield, Clock } from "lucide-react"

// Mock sub-users data with photos
const mockSubUsers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@spicegarden.com",
    mobile: "+91 9876543213",
    role: "Shift Manager",
    status: "active",
    photo: "/placeholder.svg?height=200&width=200",
    permissions: {
      orderManagement: true,
      menuManagement: false,
      userManagement: true,
      paymentAccess: false,
      fullAccess: false,
    },
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date("2024-01-20T10:30:00"),
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@spicegarden.com",
    mobile: "+91 9876543214",
    role: "Chef",
    status: "active",
    photo: "/placeholder.svg?height=200&width=200",
    permissions: {
      orderManagement: true,
      menuManagement: true,
      userManagement: false,
      paymentAccess: false,
      fullAccess: false,
    },
    createdAt: new Date("2024-02-01"),
    lastLogin: new Date("2024-01-20T14:15:00"),
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@spicegarden.com",
    mobile: "+91 9876543215",
    role: "Cashier",
    status: "blocked",
    photo: "",
    permissions: {
      orderManagement: false,
      menuManagement: false,
      userManagement: false,
      paymentAccess: false,
      fullAccess: false,
    },
    createdAt: new Date("2024-01-20"),
    lastLogin: new Date("2024-01-18T09:45:00"),
  },
]

const exportSubUsersToCSV = (subUsers: any[]) => {
  const csvContent = [
    ["Name", "Email", "Mobile", "Role", "Status", "Created Date", "Permissions"].join(","),
    ...subUsers.map((user) =>
      [
        user.name,
        user.email,
        user.mobile,
        user.role,
        user.status,
        user.createdAt.toLocaleDateString(),
        user.permissions.fullAccess
          ? "Full Access"
          : Object.entries(user.permissions)
              .filter(([key, value]) => key !== "fullAccess" && value)
              .map(([key]) => key)
              .join("; "),
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "sub-users.csv"
  a.click()
  window.URL.revokeObjectURL(url)
}

export default function SubUserManagement() {
  const [subUsers, setSubUsers] = useState(mockSubUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add")
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 6

  const handleSubmit = (data: any) => {
    const newUser = {
      id: editingUser ? editingUser.id : Date.now().toString(),
      ...data,
      status: "active",
      createdAt: editingUser ? editingUser.createdAt : new Date(),
      lastLogin: editingUser ? editingUser.lastLogin : null,
    }

    if (editingUser) {
      setSubUsers((prev) => prev.map((user) => (user.id === editingUser.id ? newUser : user)))
      alert("Sub-user updated successfully!")
    } else {
      setSubUsers((prev) => [...prev, newUser])
      alert("Sub-user added successfully!")
    }

    setEditingUser(null)
    setIsDialogOpen(false)
  }

  const handleAdd = () => {
    setEditingUser(null)
    setDialogMode("add")
    setIsDialogOpen(true)
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setDialogMode("edit")
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this sub-user?")) {
      setSubUsers((prev) => prev.filter((user) => user.id !== id))
      alert("Sub-user deleted successfully!")
    }
  }

  const handleStatusToggle = (id: string) => {
    setSubUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "blocked" : "active" } : user,
      ),
    )
  }

  const getPermissionCount = (permissions: any) => {
    const { fullAccess, ...otherPermissions } = permissions
    if (fullAccess) return 4
    return Object.values(otherPermissions).filter(Boolean).length
  }

  const filteredUsers = subUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Sub-User Management</h1>
            <p className="text-gray-600 mt-1">Manage team members and their access permissions</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportSubUsersToCSV(filteredUsers)}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Sub-User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{subUsers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {subUsers.filter((user) => user.status === "active").length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Blocked</p>
                  <p className="text-2xl font-bold text-red-600">
                    {subUsers.filter((user) => user.status === "blocked").length}
                  </p>
                </div>
                <UserX className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Full Access</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {subUsers.filter((user) => user.permissions.fullAccess).length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Shift Manager">Shift Manager</SelectItem>
                  <SelectItem value="Chef">Chef</SelectItem>
                  <SelectItem value="Cashier">Cashier</SelectItem>
                  <SelectItem value="Delivery Manager">Delivery Manager</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sub-Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Profile Photo */}
                  <div className="relative">
                    {user.photo ? (
                      <img
                        src={user.photo || "/placeholder.svg"}
                        alt={user.name}
                        className="w-16 h-16 object-cover rounded-full border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                        user.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg truncate">{user.name}</h3>
                      <Badge variant={user.status === "active" ? "default" : "destructive"} className="text-xs">
                        {user.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    <p className="text-sm text-gray-600">{user.mobile}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {user.role}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {getPermissionCount(user.permissions)} Permissions
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Permissions Preview */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-700 mb-2">Access Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.fullAccess && (
                      <Badge variant="default" className="text-xs bg-purple-100 text-purple-800">
                        Full Access
                      </Badge>
                    )}
                    {!user.permissions.fullAccess && (
                      <>
                        {user.permissions.orderManagement && (
                          <Badge variant="secondary" className="text-xs">
                            Orders
                          </Badge>
                        )}
                        {user.permissions.menuManagement && (
                          <Badge variant="secondary" className="text-xs">
                            Menu
                          </Badge>
                        )}
                        {user.permissions.userManagement && (
                          <Badge variant="secondary" className="text-xs">
                            Users
                          </Badge>
                        )}
                        {user.permissions.paymentAccess && (
                          <Badge variant="secondary" className="text-xs">
                            Payments
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* User Stats */}
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {user.lastLogin ? `Last login: ${user.lastLogin.toLocaleDateString()}` : "Never logged in"}
                  </div>
                  <div>Joined: {user.createdAt.toLocaleDateString()}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => handleStatusToggle(user.id)} className="flex-1">
                    {user.status === "active" ? (
                      <>
                        <UserX className="w-4 h-4 mr-1" />
                        Block
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 mr-1" />
                        Activate
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(user.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No sub-users found matching your criteria.</p>
              <Button onClick={handleAdd} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Sub-User
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sub-User Dialog */}
        <SubUserDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmit}
          editingUser={editingUser}
          mode={dialogMode}
        />
      </div>
    </Layout>
  )
}
