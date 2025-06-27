import React, { useState } from 'react'
import { Camera, Save, Edit, Mail, Smartphone, User } from 'lucide-react'
import Button from '../../components/Button'
import { FormField, Input, Textarea, Select } from '../../components/Form'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    restaurantName: "Spice Garden",
    cuisineTypes: ["Indian", "Arabian", "Mughlai"],
    establishmentYear: "2018",
    phoneNumber: "+91 9876543210",
    emailAddress: "contact@brandname.com",
    website: "contact@brandname.com",
    addressLine1: "123 Main Street",
    addressLine2: "Near City Mall",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    bio: 'Experienced restaurant platform administrator with 5+ years in the food industry.'
  })

  const [editData, setEditData] = useState(profileData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProfileData(editData)
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
    "West Bengal", "Delhi"
  ]

  const cuisines = [
    "Indian", "Chinese", "Italian", "Mexican", "Thai", "Arabian", "Mughlai", "Continental", 
    "Japanese", "Korean"
  ]

  const handleCuisineToggle = (cuisine) => {
    setEditData(prev => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter(c => c !== cuisine)
        : [...prev.cuisineTypes, cuisine]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
          <p className="text-gray-600">Manage your restaurant profile</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header with Logo */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-lg">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <div className="text-white font-bold text-xl text-center">
                  <div>bon</div>
                  <div>ton</div>
                </div>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>
            <div className="text-white">
              <h2 className="text-3xl font-bold">{profileData.restaurantName}</h2>
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Active since {profileData.establishmentYear}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Edit className="w-4 h-4" /> Basic Information
            </h3>
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-gray-700 border-gray-300"
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Restaurant Name">
              {isEditing ? (
                <Input
                  name="restaurantName"
                  value={editData.restaurantName}
                  onChange={handleChange}
                />
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-lg font-semibold text-gray-900">{profileData.restaurantName}</p>
                </div>
              )}
            </FormField>

            <FormField label="Establishment Year">
              {isEditing ? (
                <Input
                  name="establishmentYear"
                  value={editData.establishmentYear}
                  onChange={handleChange}
                  type="number"
                />
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-lg font-semibold text-gray-900">{profileData.establishmentYear}</p>
                </div>
              )}
            </FormField>
          </div>

          <div className="mt-6">
            <FormField label="Cuisine Types">
              {isEditing ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {cuisines.map((cuisine) => (
                    <button
                      key={cuisine}
                      onClick={() => handleCuisineToggle(cuisine)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        editData.cuisineTypes.includes(cuisine)
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                      }`}
                      title={cuisine}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {profileData.cuisineTypes.map((cuisine) => (
                      <span
                        key={cuisine}
                        className="bg-gradient-to-r from-red-100 to-orange-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {cuisine}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </FormField>
          </div>
        </div>

        {/* Contact Details */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
            Contact Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Phone Number">
              {isEditing ? (
                <Input
                  name="phoneNumber"
                  value={editData.phoneNumber}
                  onChange={handleChange}
                />
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">{profileData.phoneNumber}</p>
                  </div>
                </div>
              )}
            </FormField>

            <FormField label="Email Address">
              {isEditing ? (
                <Input
                  name="emailAddress"
                  value={editData.emailAddress}
                  onChange={handleChange}
                  type="email"
                />
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">{profileData.emailAddress}</p>
                  </div>
                </div>
              )}
            </FormField>

            <FormField label="Website">
              {isEditing ? (
                <Input
                  name="website"
                  value={editData.website}
                  onChange={handleChange}
                />
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-lg font-semibold text-gray-900">{profileData.website}</p>
                </div>
              )}
            </FormField>
          </div>
        </div>

        {/* Address */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">📍</span>
            </div>
            Address
          </h3>
          
          <div className="space-y-4">
            <FormField label="Address Line 1">
              {isEditing ? (
                <Input
                  name="addressLine1"
                  value={editData.addressLine1}
                  onChange={handleChange}
                />
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-lg font-semibold text-gray-900">{profileData.addressLine1}</p>
                </div>
              )}
            </FormField>

            <FormField label="Address Line 2">
              {isEditing ? (
                <Input
                  name="addressLine2"
                  value={editData.addressLine2}
                  onChange={handleChange}
                />
              ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-lg font-semibold text-gray-900">{profileData.addressLine2}</p>
                </div>
              )}
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="City">
                {isEditing ? (
                  <Input
                    name="city"
                    value={editData.city}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-lg font-semibold text-gray-900">{profileData.city}</p>
                  </div>
                )}
              </FormField>

              <FormField label="State">
                {isEditing ? (
                  <Select
                    name="state"
                    value={editData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </Select>
                ) : (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-lg font-semibold text-gray-900">{profileData.state}</p>
                  </div>
                )}
              </FormField>

              <FormField label="Pincode">
                {isEditing ? (
                  <Input
                    name="pincode"
                    value={editData.pincode}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <p className="text-lg font-semibold text-gray-900">{profileData.pincode}</p>
                  </div>
                )}
              </FormField>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="flex-1 h-12 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="flex-1 h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-lg rounded-xl shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage