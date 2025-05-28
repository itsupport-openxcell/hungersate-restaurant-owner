"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MenuItemDialog } from "@/components/MenuItemDialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Layout from "@/components/Layout"
import { Plus, Edit, Trash2, Search, Download, Star, Clock, Package } from "lucide-react"

// Mock menu data with HD images
const mockMenuItems = [
  {
    id: "1",
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces, served with aromatic basmati rice",
    ingredients: "Chicken, Tomatoes, Cream, Butter, Onions, Garlic, Ginger, Garam Masala, Cumin, Coriander",
    price: 180,
    discount: 10,
    category: "North Indian",
    cuisine: "Indian",
    dishType: "Main Course",
    expiryDate: "2024-12-31",
    packagingDetails: "Microwave-safe container with secure lid",
    status: "approved",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.5,
    orders: 156,
  },
  {
    id: "2",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice layered with spiced chicken and saffron, cooked to perfection",
    ingredients: "Basmati Rice, Chicken, Saffron, Yogurt, Onions, Mint, Coriander, Biryani Masala",
    price: 250,
    discount: 0,
    category: "South Indian",
    cuisine: "Indian",
    dishType: "Main Course",
    expiryDate: "2024-12-31",
    packagingDetails: "Insulated container to maintain temperature",
    status: "pending",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.8,
    orders: 203,
  },
  {
    id: "3",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese marinated in yogurt and spices, served with mint chutney",
    ingredients: "Paneer, Bell Peppers, Onions, Yogurt, Tandoori Masala, Ginger-Garlic Paste",
    price: 160,
    discount: 5,
    category: "North Indian",
    cuisine: "Indian",
    dishType: "Appetizer",
    expiryDate: "2024-12-31",
    packagingDetails: "Eco-friendly biodegradable container",
    status: "approved",
    image: "/placeholder.svg?height=400&width=600",
    rating: 4.3,
    orders: 89,
  },
]

const exportMenuToCSV = (menuItems: any[]) => {
  const csvContent = [
    ["Name", "Description", "Price", "Discount", "Category", "Cuisine", "Dish Type", "Status", "Ingredients"].join(","),
    ...menuItems.map((item) =>
      [
        item.name,
        `"${item.description}"`,
        item.price,
        item.discount,
        item.category,
        item.cuisine,
        item.dishType,
        item.status,
        `"${item.ingredients}"`,
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "menu-items.csv"
  a.click()
  window.URL.revokeObjectURL(url)
}

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState(mockMenuItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const handleSubmit = (data: any) => {
    const newItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      ...data,
      status: "pending",
      image: data.image || "/placeholder.svg?height=400&width=600",
      rating: editingItem?.rating || 0,
      orders: editingItem?.orders || 0,
    }

    if (editingItem) {
      setMenuItems((prev) => prev.map((item) => (item.id === editingItem.id ? newItem : item)))
      alert("Menu item updated successfully!")
    } else {
      setMenuItems((prev) => [...prev, newItem])
      alert("Menu item added successfully and submitted for admin approval!")
    }

    setEditingItem(null)
    setIsDialogOpen(false)
  }

  const handleAdd = () => {
    setEditingItem(null)
    setDialogMode("add")
    setIsDialogOpen(true)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setDialogMode("edit")
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id))
      alert("Menu item deleted successfully!")
    }
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredItems.slice(startIndex, endIndex)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Menu Management</h1>
            <p className="text-gray-600 mt-1">Manage your restaurant's menu items and pricing</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportMenuToCSV(filteredItems)}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={handleAdd} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold">{menuItems.length}</p>
                </div>
                <Package className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {menuItems.filter((item) => item.status === "approved").length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {menuItems.filter((item) => item.status === "pending").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {(menuItems.reduce((sum, item) => sum + (item.rating || 0), 0) / menuItems.length).toFixed(1)}
                  </p>
                </div>
                <Star className="w-8 h-8 text-blue-500" />
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
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="North Indian">North Indian</SelectItem>
                  <SelectItem value="South Indian">South Indian</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Continental">Continental</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <Badge
                    variant={item.status === "approved" ? "default" : "secondary"}
                    className="bg-white/90 text-gray-800"
                  >
                    {item.status}
                  </Badge>
                  {item.discount > 0 && (
                    <Badge variant="destructive" className="bg-red-500/90">
                      {item.discount}% OFF
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 left-3">
                  <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">{item.rating}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.description}</p>
                    </div>
                    <div className="text-right ml-3">
                      {item.discount > 0 ? (
                        <div>
                          <span className="text-lg font-bold text-green-600">
                            ₹{Math.round(item.price * (1 - item.discount / 100))}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-1">₹{item.price}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-green-600">₹{item.price}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {item.dishType}
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>
                      <strong>Orders:</strong> {item.orders}
                    </p>
                    <p>
                      <strong>Packaging:</strong> {item.packagingDetails}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <div className="text-xs text-gray-500">
                      Expires: {new Date(item.expiryDate).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
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

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No menu items found matching your criteria.</p>
              <Button onClick={handleAdd} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Menu Item
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Menu Item Dialog */}
        <MenuItemDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmit}
          editingItem={editingItem}
          mode={dialogMode}
        />
      </div>
    </Layout>
  )
}
