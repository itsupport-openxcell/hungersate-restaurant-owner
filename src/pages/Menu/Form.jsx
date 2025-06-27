import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Upload, Camera } from 'lucide-react'
import Button from '../../components/Button'
import { FormField, Input, Textarea, Select } from '../../components/Form'
import toast from 'react-hot-toast'

const MenuForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    dishType: '',
    cuisine: '',
    status: 'Available',
    spiceLevel: '',
    image: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Mock data for edit mode
  useEffect(() => {
    if (isEdit) {
      // In real app, fetch data from API
      const mockData = {
        name: "Paneer Tikka",
        description: "Marinated cottage cheese cubes grilled to perfection",
        price: "320",
        dishType: "Veg",
        cuisine: "Indian",
        status: "Available",
        spiceLevel: "medium",
        image: "/images/paneer-tikka.png"
      }
      setFormData(mockData)
    }
  }, [isEdit])

  const cuisines = ["Indian", "Chinese", "Italian", "Mexican", "Thai", "Continental"]
  const dishTypes = ["Veg", "Non-Veg"]
  const statuses = ["Available", "Unavailable", "Pending"]
  const spiceLevels = [
    { value: "mild", label: "Mild" },
    { value: "medium", label: "Medium" },
    { value: "spicy", label: "Spicy" },
    { value: "very-spicy", label: "Very Spicy" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required'
    }

    if (!formData.dishType) {
      newErrors.dishType = 'Dish type is required'
    }

    if (!formData.cuisine) {
      newErrors.cuisine = 'Cuisine is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(isEdit ? 'Menu item updated successfully' : 'Menu item created successfully')
      navigate('/menu')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/menu')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update menu item details' : 'Create a new menu item for your restaurant'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dish Image */}
          <div>
            <FormField label="Dish Image">
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
                      <Camera className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">Upload dish image</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </FormField>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Dish Name" error={errors.name} required>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter dish name"
                />
              </FormField>

              <FormField label="Price (₹)" error={errors.price} required>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
              </FormField>
            </div>

            <FormField label="Description" error={errors.description} required className="mt-4">
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter dish description"
                rows={4}
              />
            </FormField>
          </div>

          {/* DishType & Classification */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">DishType & Classification</h3>
            <div className="grid grid-cols-2 gap-6">
              <FormField label="Dish Type" error={errors.dishType} required>
                <Select
                  name="dishType"
                  value={formData.dishType}
                  onChange={handleChange}
                >
                  <option value="">Select Dish Type</option>
                  {dishTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Cuisine" error={errors.cuisine} required>
                <Select
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                >
                  <option value="">Select Cuisine</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Status">
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </Select>
              </FormField>

              <FormField label="Spice Level">
                <Select
                  name="spiceLevel"
                  value={formData.spiceLevel}
                  onChange={handleChange}
                >
                  <option value="">Select Spice Level</option>
                  {spiceLevels.map((level) => (
                    <option key={level.value} value={level.value}>{level.label}</option>
                  ))}
                </Select>
              </FormField>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/menu')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Item' : 'Create Item')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MenuForm