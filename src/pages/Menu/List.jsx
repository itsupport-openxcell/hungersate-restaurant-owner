import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Filter, Edit, ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '../../components/Button'
import { Input, Select } from '../../components/Form'
import Modal from '../../components/Modal'
import Pagination from '../../components/Pagination'
import { PageLoader, CardSkeleton, LoadingSpinner } from '../../components/Loader'
import toast from 'react-hot-toast'

const MenuList = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("All")
  const [actionLoading, setActionLoading] = useState({})
  
  // Filter states
  const [filters, setFilters] = useState({
    dishType: "",
    cuisine: "",
    status: "",
    priceRange: { min: "", max: "" }
  })

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data
  const [menuItems, setMenuItems] = useState([
    {
      id: "1",
      name: "Paneer Tikka",
      description: "Marinated cottage cheese cubes grilled to perfection with bell pepper and onion, served with mint chutney",
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

  const categories = ["Veg", "Non-Veg"]
  const cuisines = ["Indian", "Chinese", "Continental", "Italian", "Mexican", "Thai"]
  const statuses = ["Available", "Unavailable", "Pending"]
  const spiceLevels = [
    { value: "mild", label: "Mild" },
    { value: "medium", label: "Medium" },
    { value: "spicy", label: "Spicy" },
    { value: "very-spicy", label: "Very Spicy" },
  ]

  // Apply filters to menu items
  const applyFilters = (items) => {
    return items.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !filters.dishType || item.dishType === filters.dishType
      const matchesCuisine = !filters.cuisine || item.cuisine === filters.cuisine
      const matchesStatus = !filters.status || item.status === filters.status

      const matchesPriceRange =
        (!filters.priceRange.min || item.price >= Number(filters.priceRange.min)) &&
        (!filters.priceRange.max || item.price <= Number(filters.priceRange.max))

      const matchesTab = activeTab === "All" || item.dishType === activeTab

      return matchesSearch && matchesCategory && matchesCuisine && matchesStatus && matchesPriceRange && matchesTab
    })
  }

  const filteredItems = applyFilters(menuItems)
  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  const getStatusColor = (status) => {
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

  const handleEditItem = async (item) => {
    setActionLoading(prev => ({ ...prev, [item.id]: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setSelectedItem(item)
    setShowEditForm(true)
    setActionLoading(prev => ({ ...prev, [item.id]: false }))
  }

  const handleAddItem = () => {
    setShowAddForm(true)
  }

  const handleSaveItem = async (item, isEdit = false) => {
    if (isEdit && selectedItem) {
      setMenuItems(prev => prev.map(i => i.id === selectedItem.id ? { ...item, id: selectedItem.id } : i))
      toast.success(`${item.name} updated successfully`)
    } else {
      setMenuItems(prev => [...prev, { ...item, id: Date.now().toString() }])
      toast.success(`${item.name} added successfully`)
    }
    setShowAddForm(false)
    setShowEditForm(false)
    setSelectedItem(null)
  }

  const handleApplyFilters = () => {
    setCurrentPage(1)
    setShowFilters(false)
  }

  const handleClearFilters = () => {
    setFilters({
      dishType: "",
      cuisine: "",
      status: "",
      priceRange: { min: "", max: "" }
    })
    setCurrentPage(1)
  }

  const getTabCounts = () => ({
    All: menuItems.length,
    Veg: menuItems.filter(item => item.dishType === "Veg").length,
    "Non-Veg": menuItems.filter(item => item.dishType === "Non-Veg").length,
  })

  const tabCounts = getTabCounts()

  if (loading) {
    return <PageLoader message="Loading menu items..." />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant menu</p>
        </div>
        <Button onClick={handleAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Item
        </Button>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex overflow-x-auto">
          {(["All", "Veg", "Non-Veg"]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setCurrentPage(1)
              }}
              className={`flex-shrink-0 py-3 px-4 text-center font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "text-red-500 border-b-2 border-red-500 bg-red-50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                {tab}
                {tab !== "All" && tabCounts[tab] > 0 && (
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{tabCounts[tab]}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-lg"
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

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Dish Type</label>
                <Select
                  value={filters.dishType}
                  onChange={(e) => setFilters({ ...filters, dishType: e.target.value })}
                  className="text-gray-900"
                >
                  <option value="" className="text-gray-900">All Categories</option>
                  {categories.map((dishType) => (
                    <option key={dishType} value={dishType} className="text-gray-900">{dishType}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Cuisine</label>
                <Select
                  value={filters.cuisine}
                  onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                  className="text-gray-900"
                >
                  <option value="" className="text-gray-900">All Cuisines</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine} className="text-gray-900">{cuisine}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Status</label>
                <Select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="text-gray-900"
                >
                  <option value="" className="text-gray-900">All Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status} className="text-gray-900">{status}</option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Min Price (₹)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    priceRange: { ...filters.priceRange, min: e.target.value } 
                  })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Max Price (₹)</label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    priceRange: { ...filters.priceRange, max: e.target.value } 
                  })}
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {paginatedItems.length === 0 ? (
          <div className="col-span-3 text-center py-16">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No menu items found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          paginatedItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden group bg-white"
            >
              {/* Item Image */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={item.image || "/images/food-placeholder.png"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "/images/food-placeholder.png"
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)} shadow-md`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Item Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs border border-gray-200 px-2 py-1 rounded-full bg-gray-50">
                    {item.dishType}
                  </span>
                  <span className="text-xs border border-gray-200 px-2 py-1 rounded-full bg-gray-50">
                    {item.cuisine}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900">₹{item.price}</div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => handleEditItem(item)}
                  variant="outline"
                  className="w-full h-9 text-blue-600 border-blue-200 hover:bg-blue-50"
                  disabled={actionLoading[item.id]}
                >
                  {actionLoading[item.id] ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </>
                  )}
                </Button>
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
          totalItems={filteredItems.length}
          itemsPerPage={itemsPerPage}
        />
      )}

      {/* Add Menu Item Modal */}
      <MenuItemForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSave={(item) => handleSaveItem(item, false)}
        categories={categories}
        cuisines={cuisines}
        statuses={statuses}
        spiceLevels={spiceLevels}
      />

      {/* Edit Menu Item Modal */}
      <MenuItemForm
        isOpen={showEditForm}
        onClose={() => {
          setShowEditForm(false)
          setSelectedItem(null)
        }}
        onSave={(item) => handleSaveItem(item, true)}
        item={selectedItem}
        isEdit={true}
        categories={categories}
        cuisines={cuisines}
        statuses={statuses}
        spiceLevels={spiceLevels}
      />
    </div>
  )
}

// Menu Item Form Component
const MenuItemForm = ({ 
  isOpen, 
  onClose, 
  onSave, 
  item = null, 
  isEdit = false,
  categories,
  cuisines,
  statuses,
  spiceLevels
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    dishType: "",
    cuisine: "",
    status: "Available",
    spiceLevel: "",
    image: ""
  })

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  // Initialize form with item data if editing
  React.useEffect(() => {
    if (item && isEdit) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        price: item.price?.toString() || "",
        dishType: item.dishType || "",
        cuisine: item.cuisine || "",
        status: item.status || "Available",
        spiceLevel: item.spiceLevel || "",
        image: item.image || ""
      })
    } else {
      // Reset form for new item
      setFormData({
        name: "",
        description: "",
        price: "",
        dishType: "",
        cuisine: "",
        status: "Available",
        spiceLevel: "",
        image: ""
      })
    }
    setErrors({})
  }, [item, isEdit, isOpen])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Dish name is required"
    if (!formData.price.trim()) newErrors.price = "Price is required"
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0)
      newErrors.price = "Valid price is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.dishType) newErrors.dishType = "Dish type is required"
    if (!formData.cuisine) newErrors.cuisine = "Cuisine is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      setSaving(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onSave({
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        dishType: formData.dishType,
        cuisine: formData.cuisine,
        status: formData.status,
        spiceLevel: formData.spiceLevel,
        image: formData.image || "/images/food-placeholder.png"
      })
      
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Menu Item" : "Add Menu Item"}
      size="lg"
    >
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
        {/* Dish Image */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Dish Image</label>
          <div className="mt-1 flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            {formData.image ? (
              <div className="relative w-full h-full">
                <img
                  src={formData.image}
                  alt="Dish preview"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = "/images/food-placeholder.png"
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="mt-1 text-sm text-gray-500">Upload dish image</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Basic Information</h4>
          
          <div className="mb-4">
            <label htmlFor="dishName" className="text-sm font-medium text-gray-700 block mb-1">
              Dish Name
            </label>
            <Input
              id="dishName"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter dish name"
              className="w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="text-sm font-medium text-gray-700 block mb-1">
              Price (₹)
            </label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="Enter price"
              className="w-full"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 block mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter dish description"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 min-h-[80px]"
              rows={3}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
        </div>

        {/* DishType & Classification */}
        <div>
          <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">DishType & Classification</h4>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="dishType" className="text-sm font-medium text-gray-700 block mb-1">
                Dish Type
              </label>
              <Select
                id="dishType"
                value={formData.dishType}
                onChange={(e) => handleInputChange("dishType", e.target.value)}
                className="text-gray-900"
              >
                <option value="" className="text-gray-900">Select Dish Type</option>
                {categories.map((dishType) => (
                  <option key={dishType} value={dishType} className="text-gray-900">{dishType}</option>
                ))}
              </Select>
              {errors.dishType && <p className="text-red-500 text-sm mt-1">{errors.dishType}</p>}
            </div>

            <div>
              <label htmlFor="cuisine" className="text-sm font-medium text-gray-700 block mb-1">
                Cuisine
              </label>
              <Select
                id="cuisine"
                value={formData.cuisine}
                onChange={(e) => handleInputChange("cuisine", e.target.value)}
                className="text-gray-900"
              >
                <option value="" className="text-gray-900">Select Cuisine</option>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine} className="text-gray-900">{cuisine}</option>
                ))}
              </Select>
              {errors.cuisine && <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="text-sm font-medium text-gray-700 block mb-1">
                Status
              </label>
              <Select
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="text-gray-900"
              >
                {statuses.map((status) => (
                  <option key={status} value={status} className="text-gray-900">{status}</option>
                ))}
              </Select>
            </div>

            <div>
              <label htmlFor="spiceLevel" className="text-sm font-medium text-gray-700 block mb-1">
                Spice Level
              </label>
              <Select
                id="spiceLevel"
                value={formData.spiceLevel}
                onChange={(e) => handleInputChange("spiceLevel", e.target.value)}
                className="text-gray-900"
              >
                <option value="" className="text-gray-900">Select Spice Level</option>
                {spiceLevels.map((level) => (
                  <option key={level.value} value={level.value} className="text-gray-900">{level.label}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
              {isEdit ? "Updating..." : "Adding..."}
            </div>
          ) : (
            isEdit ? "Update Dish" : "Add Dish"
          )}
        </Button>
      </div>
    </Modal>
  )
}

export default MenuList