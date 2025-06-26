"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  Edit,
  ChevronLeft,
  ChevronRight,
  Camera,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MenuManagementProps {
  isOpen: boolean
  onClose: () => void
}

type MenuTab = "All" | "Veg" | "Non-Veg"
type MenuStatus = "Available" | "Unavailable" | "Pending"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  dishType: string
  cuisine: string
  status: MenuStatus
  image: string
}

interface MenuFilters {
  dishType: string
  cuisine: string
  status: string
  priceRange: {
    min: string
    max: string
  }
}

export default function MenuManagement({ isOpen, onClose }: MenuManagementProps) {
  const [activeTab, setActiveTab] = useState<MenuTab>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState<MenuFilters>({
    dishType: "",
    cuisine: "",
    status: "",
    priceRange: { min: "", max: "" },
  })

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Paneer Tikka",
      description:
        "Marinated cottage cheese cubes grilled to perfection with bell pepper and onion, served with mint chutney",
      price: 320,
      dishType: "Veg",
      cuisine: "Indian",
      status: "Available",
      image: "/images/paneer-tikka.png",
    },
    {
      id: "2",
      name: "Butter Paneer Masala",
      description: "Creamy tomato-based curry with soft paneer cubes, aromatic spices and fresh herbs",
      price: 350,
      dishType: "Veg",
      cuisine: "Indian",
      status: "Available",
      image: "/images/paneer-tikka.png",
    },
    {
      id: "3",
      name: "Chana Masala",
      description: "Spicy chickpeas cooked in a rich tomato-based gravy with an array of traditional spices",
      price: 280,
      dishType: "Non-Veg",
      cuisine: "Indian",
      status: "Pending",
      image: "/images/chana-masala.png"
    },
    {
      id: "4",
      name: "Aloo Gobi",
      description: "A flavorful dry curry of potatoes and cauliflower cooked with aromatic spices and herbs",
      price: 250,
      dishType: "Non-Veg",
      cuisine: "Indian",
      status: "Available",
      image: "/images/aloo-gobi.png",
    },
    {
      id: "5",
      name: "Vegetable Biryani",
      description: "Aromatic basmati rice layered with mixed vegetables, saffron, and traditional biryani spices",
      price: 380,
      dishType: "Veg",
      cuisine: "Indian",
      status: "Unavailable",
      image: "/images/biryani.png",
    },
    {
      id: "6",
      name: "Dal Tadka",
      description: "Yellow lentils cooked to perfection and tempered with cumin, garlic, and aromatic spices",
      price: 220,
      dishType: "Non-Veg",
      cuisine: "Indian",
      status: "Available",
      image: "/images/dal-tadka.png"
    },
    {
      id: "7",
      name: "Gulab Jamun",
      description: "Soft, spongy milk dumplings soaked in sweet rose-flavored sugar syrup",
      price: 120,
      dishType: "Non-Veg",
      cuisine: "Indian",
      status: "Unavailable",
      image: "/images/food-placeholder.png",
    },
    {
      id: "8",
      name: "Masala Chai",
      description: "Traditional Indian spiced tea brewed with cardamom, ginger, and aromatic spices",
      price: 60,
      dishType: "Non-Veg",
      cuisine: "Indian",
      status: "Pending",
      image: "/images/food-placeholder.png",
    },
  ])

  const [showToast, setShowToast] = useState<{
    show: boolean
    message: string
    type: "success" | "error" | "info"
  }>({ show: false, message: "", type: "success" })

  const showToastMessage = (message: string, type: "success" | "error" | "info" = "success") => {
    setShowToast({ show: true, message, type })
    setTimeout(() => setShowToast({ show: false, message: "", type: "success" }), 3000)
  }

  const categories = ["Veg", "Non Veg"]
  const cuisines = ["Indian", "Chinese", "Continental", "Italian", "Mexican", "Thai"]

  const applyFilters = (items: MenuItem[]) => {
    return items.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !filters.dishType || item.dishType === filters.dishType
      const matchesCuisine = !filters.cuisine || item.cuisine === filters.cuisine
      const matchesStatus = !filters.status || item.status === filters.status

      const matchesPriceRange =
        (!filters.priceRange.min || item.price >= Number.parseFloat(filters.priceRange.min)) &&
        (!filters.priceRange.max || item.price <= Number.parseFloat(filters.priceRange.max))

      const matchesTab = activeTab === "All" || item.dishType === activeTab

      return matchesSearch && matchesCategory && matchesCuisine && matchesStatus && matchesPriceRange && matchesTab
    })
  }

  const filteredItems = applyFilters(menuItems)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item)
    setShowEditForm(true)
  }

  const getStatusColor = (status: MenuStatus) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800"
      case "Unavailable":
        return "bg-red-100 text-red-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTabCounts = () => ({
    All: menuItems.length,
    Veg: menuItems.filter((item) => item.dishType === "Veg").length,
    "Non-Veg": menuItems.filter((item) => item.dishType === "Non-Veg").length,
  })

  const tabCounts = getTabCounts()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed left-80 top-0 right-0 bottom-0 bg-gray-50 z-50 shadow-xl border-l border-gray-200 flex flex-col">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm p-4 pt-12 flex-shrink-0 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
            </button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">Menu Management</h1>
              <p className="text-sm text-gray-500">Manage your restaurant menu</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-colors shadow-md"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="flex overflow-x-auto">
            {(["All", "Veg", "Non-Veg"] as MenuTab[]).map((tab) => (
              < button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setCurrentPage(1)
                }}
                className={`flex-shrink-0 py-3 px-4 text-center font-medium whitespace-nowrap transition-colors ${activeTab === tab
                  ? "text-red-500 border-b-3 border-red-500 bg-red-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {tab}
                  {tab !== "All" && tabCounts[tab] > 0 && (
                    <Badge className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{tabCounts[tab]}</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border-b border-gray-100 p-4 flex-shrink-0">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-12 px-4 border-gray-300 hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Enhanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700" htmlFor="filter-dishType">DishType</Label>
                  <select
                    id="filter-dishType"
                    title="Filter by dishType"
                    value={filters.dishType}
                    onChange={(e) => {
                      setFilters({ ...filters, dishType: e.target.value })
                      setCurrentPage(1)
                    }}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((dishType) => (
                      <option key={dishType} value={dishType}>
                        {dishType}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700" htmlFor="filter-cuisine">Cuisine</Label>
                  <select
                    id="filter-cuisine"
                    title="Filter by cuisine"
                    value={filters.cuisine}
                    onChange={(e) => {
                      setFilters({ ...filters, cuisine: e.target.value })
                      setCurrentPage(1)
                    }}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Cuisines</option>
                    {cuisines.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700" htmlFor="filter-status">Status</Label>
                  <select
                    id="filter-status"
                    title="Filter by status"
                    value={filters.status}
                    onChange={(e) => {
                      setFilters({ ...filters, status: e.target.value })
                      setCurrentPage(1)
                    }}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700" htmlFor="filter-price-min">Min Price (₹)</Label>
                  <Input
                    id="filter-price-min"
                    type="number"
                    placeholder="0"
                    value={filters.priceRange.min}
                    onChange={(e) => {
                      setFilters({ ...filters, priceRange: { ...filters.priceRange, min: e.target.value } })
                      setCurrentPage(1)
                    }}
                    className="h-10"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700" htmlFor="filter-price-max">Max Price (₹)</Label>
                  <Input
                    id="filter-price-max"
                    type="number"
                    placeholder="1000"
                    value={filters.priceRange.max}
                    onChange={(e) => {
                      setFilters({ ...filters, priceRange: { ...filters.priceRange, max: e.target.value } })
                      setCurrentPage(1)
                    }}
                    className="h-10"
                  />
                </div>
              </div>

              {/* Add Clear and Apply Filters buttons */}
              <div className="flex gap-3 justify-end pt-2">
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setFilters({
                      dishType: "",
                      cuisine: "",
                      status: "",
                      priceRange: { min: "", max: "" },
                    })
                    setCurrentPage(1)
                  }}
                  title="Clear all filters"
                >
                  Clear Filters
                </Button>
                <Button
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                  onClick={() => setShowFilters(false)}
                  title="Apply filters"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Menu Items Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {paginatedItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No menu items found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {paginatedItems.map((item) => (
                  <Card
                    key={item.id}
                    className="border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden group"
                  >
                    <CardContent className="p-0">
                      {/* Enhanced Item Image */}
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/images/food-placeholder.png"
                          }}
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className={`text-xs ${getStatusColor(item.status)} shadow-md`}>{item.status}</Badge>
                        </div>
                      </div>

                      {/* Enhanced Item Details */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{item.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {item.dishType}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.cuisine}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-2xl font-bold text-gray-900">₹{item.price}</div>
                        </div>


                        {/* Enhanced Action Buttons */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditItem(item)}
                            variant="outline"
                            size="sm"
                            className="flex-1 h-9 text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredItems.length)} of{" "}
                {filteredItems.length} items
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded">
                  {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div >

      {/* Enhanced Add/Edit Menu Item Forms */}
      {
        (showAddForm || showEditForm) && (
          <MenuItemForm
            isOpen={showAddForm || showEditForm}
            onClose={() => {
              setShowAddForm(false)
              setShowEditForm(false)
              setSelectedItem(null)
            }}
            onSave={(item) => {
              if (showEditForm && selectedItem) {
                setMenuItems((prev) => prev.map((i) => (i.id === selectedItem.id ? { ...item, id: selectedItem.id } : i)))
                showToastMessage(`${item.name} updated successfully`)
              } else {
                setMenuItems((prev) => [...prev, { ...item, id: Date.now().toString() }])
                showToastMessage(`${item.name} added successfully`)
              }
              setShowAddForm(false)
              setShowEditForm(false)
              setSelectedItem(null)
            }}
            item={selectedItem}
            isEdit={showEditForm}
            categories={categories}
            cuisines={cuisines}
          />
        )
      }

      {/* Enhanced Toast Notification */}
      {
        showToast.show && (
          <div
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in ${showToast.type === "success"
              ? "bg-green-500 text-white"
              : showToast.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
              }`}
          >
            <span className="font-medium">{showToast.message}</span>
            <button
              onClick={() => setShowToast({ show: false, message: "", type: "success" })}
              className="text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      }
    </>
  )
}

// Enhanced Menu Item Form Component
interface MenuItemFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (item: Omit<MenuItem, "id">) => void
  item: MenuItem | null
  isEdit: boolean
  categories: string[]
  cuisines: string[]
}

function MenuItemForm({ isOpen, onClose, onSave, item, isEdit, categories, cuisines }: MenuItemFormProps) {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price?.toString() || "",
    dishType: item?.dishType || "",
    cuisine: item?.cuisine || "",
    image: item?.image || "",
    status: (item?.status as MenuStatus) || "Available",
    spiceLevel: item?.spiceLevel || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Dish name is required"
    if (!formData.price.trim()) newErrors.price = "Price is required"
    else if (Number.isNaN(Number.parseFloat(formData.price)) || Number.parseFloat(formData.price) <= 0)
      newErrors.price = "Valid price is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.dishType) newErrors.dishType = "Dish type is required"
    if (!formData.cuisine) newErrors.cuisine = "Cuisine is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave({
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        dishType: formData.dishType,
        cuisine: formData.cuisine,
        image: formData.image || "/images/food-placeholder.png",
        status: formData.status,
        spiceLevel: formData.spiceLevel,
      })
    }
  }

  if (!isOpen) return null

  // Add spice levels
  const spiceLevels = [
    { value: "mild", label: "Mild" },
    { value: "medium", label: "Medium" },
    { value: "spicy", label: "Spicy" },
    { value: "very-spicy", label: "Very Spicy" },
  ]

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
            {/* Enhanced Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{isEdit ? "Edit Menu Item" : "Add Menu Item"}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Enhanced Form */}
            <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
              {/* Dish Image */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Dish Image</Label>
                <div className="mt-2 flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                  {formData.image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Dish preview"
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/images/food-placeholder.png"
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Camera className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">Upload dish image</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">Basic Information</h4>

                <div>
                  <Label htmlFor="dishName" className="text-sm font-medium text-gray-700">
                    Dish Name
                  </Label>
                  <Input
                    id="dishName"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter dish name"
                    className="mt-1 h-12"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                      Price (₹)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="Enter price"
                      className="mt-1 h-12"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter dish description"
                    className="mt-1"
                    rows={3}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
              </div>

              {/* dishType & Classification */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">DishType & Classification</h4>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dishType" className="text-sm font-medium text-gray-700">
                      Dish Type
                    </Label>
                    <select
                      id="dishType"
                      value={formData.dishType}
                      onChange={(e) => handleInputChange("dishType", e.target.value)}
                      className="mt-1 w-full h-12 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select Dish Type</option>
                      {categories.map((dishType) => (
                        <option key={dishType} value={dishType}>
                          {dishType}
                        </option>
                      ))}
                    </select>
                    {errors.dishType && <p className="text-red-500 text-sm mt-1">{errors.dishType}</p>}
                  </div>

                  <div>
                    <Label htmlFor="cuisine" className="text-sm font-medium text-gray-700">
                      Cuisine
                    </Label>
                    <select
                      id="cuisine"
                      value={formData.cuisine}
                      onChange={(e) => handleInputChange("cuisine", e.target.value)}
                      className="mt-1 w-full h-12 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select Cuisine</option>
                      {cuisines.map((cuisine) => (
                        <option key={cuisine} value={cuisine}>
                          {cuisine}
                        </option>
                      ))}
                    </select>
                    {errors.cuisine && <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>}
                  </div>
                </div>

                {/* Spice Level Dropdown */}
                <div className="mt-4">
                  <Label htmlFor="spiceLevel" className="text-sm font-medium text-gray-700">
                    Spice Level
                  </Label>
                  <select
                    id="spiceLevel"
                    value={formData.spiceLevel}
                    onChange={e => handleInputChange("spiceLevel", e.target.value)}
                    className="mt-1 w-full h-12 px-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select Spice Level</option>
                    {spiceLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Enhanced Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <Button onClick={onClose} variant="outline" className="flex-1 h-12">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium"
                >
                  {isEdit ? "Update Dish" : "Add Dish"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
