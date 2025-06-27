import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Form from '../../components/Form'
import Button from '../../components/Button'
import { cuisineService } from '../../services/cuisineService'
import { validateCuisine } from '../../utils/validators'

const CuisineForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if (isEdit) {
      loadCuisine()
    }
  }, [id])
  
  const loadCuisine = async () => {
    try {
      const item = await cuisineService.getById(id)
      setFormData(item)
    } catch (error) {
      console.error('Error loading cuisine:', error)
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
    
    const validationErrors = validateCuisine(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setLoading(true)
    try {
      if (isEdit) {
        await cuisineService.update(id, formData)
      } else {
        await cuisineService.create(formData)
      }
      navigate('/cuisines')
    } catch (error) {
      console.error('Error saving cuisine:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 italic">
          {isEdit ? 'Edit Cuisine' : 'Add New Cuisine'}
        </h1>
        <p className="text-gray-600 italic">
          {isEdit ? 'Update the cuisine details' : 'Create a new cuisine category'}
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <Form onSubmit={handleSubmit}>
          <Form.Field label="Cuisine Name" error={errors.name} required>
            <Form.Input
              placeholder="Enter cuisine name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Form.Field>
          
          <Form.Field label="Description" error={errors.description}>
            <Form.Textarea
              placeholder="Enter cuisine description"
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
              onClick={() => navigate('/cuisines')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update Cuisine' : 'Save Cuisine')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default CuisineForm