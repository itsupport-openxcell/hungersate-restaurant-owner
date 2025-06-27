import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../../components/Button'
import { FormField, Input, Textarea, Select } from '../../components/Form'
import toast from 'react-hot-toast'

const CuisineForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active'
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      const mockData = {
        name: "Indian",
        description: "Traditional Indian cuisine with rich spices and flavors",
        status: "Active"
      }
      setFormData(mockData)
    }
  }, [isEdit])

  const statuses = ["Active", "Inactive"]

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
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(isEdit ? 'Cuisine updated successfully' : 'Cuisine created successfully')
      navigate('/cuisine')
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
          onClick={() => navigate('/cuisine')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Cuisine' : 'Add New Cuisine'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update cuisine details' : 'Create a new cuisine type'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <FormField label="Cuisine Name" error={errors.name} required>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter cuisine name"
            />
          </FormField>

          {/* Description */}
          <FormField label="Description" error={errors.description} required>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter cuisine description"
              rows={4}
            />
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

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/cuisine')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Cuisine' : 'Create Cuisine')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CuisineForm