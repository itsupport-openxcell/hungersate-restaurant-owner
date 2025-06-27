import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../../components/Button'
import { FormField, Input, Textarea, Select } from '../../components/Form'
import toast from 'react-hot-toast'

const RestaurantForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cuisine: '',
    description: '',
    status: 'Pending'
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      const mockData = {
        name: "Spice Garden",
        owner: "John Doe",
        email: "john@spicegarden.com",
        phone: "+91 9876543210",
        address: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        cuisine: "Indian, Chinese",
        description: "Authentic Indian and Chinese cuisine",
        status: "Active"
      }
      setFormData(mockData)
    }
  }, [isEdit])

  const statuses = ["Active", "Pending", "Inactive"]
  const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Restaurant name is required'
    if (!formData.owner.trim()) newErrors.owner = 'Owner name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'

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
      
      toast.success(isEdit ? 'Restaurant updated successfully' : 'Restaurant created successfully')
      navigate('/restaurants')
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
          onClick={() => navigate('/restaurants')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Restaurant' : 'Add New Restaurant'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update restaurant details' : 'Register a new restaurant on your platform'}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Restaurant Name" error={errors.name} required>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter restaurant name"
                />
              </FormField>

              <FormField label="Owner Name" error={errors.owner} required>
                <Input
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  placeholder="Enter owner name"
                />
              </FormField>

              <FormField label="Email" error={errors.email} required>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </FormField>

              <FormField label="Phone" error={errors.phone} required>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </FormField>

              <FormField label="Cuisine Types">
                <Input
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  placeholder="e.g., Indian, Chinese, Italian"
                />
              </FormField>

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
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
            <div className="space-y-4">
              <FormField label="Address" error={errors.address} required>
                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  rows={3}
                />
              </FormField>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField label="City" error={errors.city} required>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                  />
                </FormField>

                <FormField label="State" error={errors.state} required>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select state</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </Select>
                </FormField>

                <FormField label="Pincode" error={errors.pincode} required>
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Description */}
          <FormField label="Description">
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter restaurant description"
              rows={4}
            />
          </FormField>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/restaurants')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Restaurant' : 'Create Restaurant')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RestaurantForm