import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'
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
    cuisine: '',
    category: '',
    status: 'Available',
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
        cuisine: "Indian",
        category: "Veg",
        status: "Available",
        image: "/images/paneer-tikka.png"
      }
      setFormData(mockData)
    }
  }, [isEdit])

  const cuisines = ["Indian", "Chinese", "Italian", "Mexican", "Thai", "Continental"]
  const categories = ["Veg", "Non-Veg", "Vegan", "Jain"]
  const statuses = ["Available", "Unavailable"]

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

    if (!formData.cuisine) {
      newErrors.cuisine = 'Cuisine is required'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <FormField label="Item Name" error={errors.name} required>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
              />
            </FormField>

            {/* Price */}
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

            {/* Cuisine */}
            <FormField label="Cuisine" error={errors.cuisine} required>
              <Select
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
              >
                <option value="">Select cuisine</option>
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </Select>
            </FormField>

            {/* Category */}
            <FormField label="Category" error={errors.category} required>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>
            </FormField>

            {/* Status */}
            <FormField label="Status" required>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
            </FormField>
          </div>

          {/* Description */}
          <FormField label="Description" error={errors.description} required>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
              rows={4}
            />
          </FormField>

          {/* Image Upload */}
          <FormField label="Image">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Upload an image
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => {
                      // Handle file upload
                      console.log('File selected:', e.target.files[0])
                    }}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </FormField>

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