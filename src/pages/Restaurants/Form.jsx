import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { restaurantService } from '../../services/restaurantService'
import { validateRestaurant } from '../../utils/validators'

const RestaurantForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    location: '',
    phone: '',
    email: '',
    description: '',
    isActive: true
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (isEdit) {
      loadRestaurant()
    }
  }, [id])
  
  const loadRestaurant = async () => {
    try {
      const item = await restaurantService.getById(id)
      setFormData(item)
    } catch (error) {
      console.error('Error loading restaurant:', error)
    }
  }
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validationErrors = validateRestaurant(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setLoading(true)
    try {
      if (isEdit) {
        await restaurantService.update(id, formData)
      } else {
        await restaurantService.create(formData)
      }
      navigate('/restaurants')
    } catch (error) {
      console.error('Error saving restaurant:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const cuisineOptions = [
    { value: 'italian', label: 'Italian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'indian', label: 'Indian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'american', label: 'American' }
  ]
  
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 italic">
          {isEdit ? 'Edit Restaurant' : 'Add New Restaurant'}
        </h1>
        <p className="text-gray-600 italic">
          {isEdit ? 'Update the restaurant details' : 'Register a new restaurant'}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <Form onSubmit={handleSubmit}>
          <Form.Field label="Restaurant Name" error={errors.name} required>
            <Form.Input
              placeholder="Enter restaurant name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Cuisine Type" error={errors.cuisine} required>
            <Form.Select
              placeholder="Select cuisine type"
              options={cuisineOptions}
              value={formData.cuisine}
              onChange={(e) => handleChange('cuisine', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Location" error={errors.location} required>
            <Form.Input
              placeholder="Enter restaurant location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Phone" error={errors.phone} required>
            <Form.Input
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Email" error={errors.email} required>
            <Form.Input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Description" error={errors.description}>
            <Form.Textarea
              placeholder="Enter restaurant description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Status">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleChange('isActive', e.target.checked)}
                className="h-4 w-4 text-[#FF0000] focus:ring-[#FF0000] border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700 italic">Active</label>
            </div>
          </Form.Field>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/restaurants')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update Restaurant' : 'Save Restaurant')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default RestaurantForm