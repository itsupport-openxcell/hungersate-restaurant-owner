import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { menuService } from '../../services/menuService'
import { validateMenuItem } from '../../utils/validators'

const MenuForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    cuisine: '',
    price: '',
    description: ''
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (isEdit) {
      loadMenuItem()
    }
  }, [id])
  
  const loadMenuItem = async () => {
    try {
      const item = await menuService.getById(id)
      setFormData(item)
    } catch (error) {
      console.error('Error loading menu item:', error)
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
    
    const validationErrors = validateMenuItem(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setLoading(true)
    try {
      if (isEdit) {
        await menuService.update(id, formData)
      } else {
        await menuService.create(formData)
      }
      navigate('/menu')
    } catch (error) {
      console.error('Error saving menu item:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const typeOptions = [
    { value: 'veg', label: 'Vegetarian' },
    { value: 'non-veg', label: 'Non-Vegetarian' }
  ]
  
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
          {isEdit ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h1>
        <p className="text-gray-600 italic">
          {isEdit ? 'Update the menu item details' : 'Create a new dish for your menu'}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <Form onSubmit={handleSubmit}>
          <Form.Field label="Dish Name" error={errors.name} required>
            <Form.Input
              placeholder="Enter dish name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Type" error={errors.type} required>
            <Form.Select
              placeholder="Select dish type"
              options={typeOptions}
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Cuisine" error={errors.cuisine} required>
            <Form.Select
              placeholder="Select cuisine"
              options={cuisineOptions}
              value={formData.cuisine}
              onChange={(e) => handleChange('cuisine', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Price" error={errors.price} required>
            <Form.Input
              type="number"
              step="0.01"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Description" error={errors.description}>
            <Form.Textarea
              placeholder="Enter dish description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Form.Field>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/menu')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update Dish' : 'Save Dish')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default MenuForm