import React, { useState } from 'react'
import { Camera, Save } from 'lucide-react'
import Button from '../../components/Button'
import { FormField, Input, Textarea } from '../../components/Form'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@hungersate.com',
    phone: '+91 9876543210',
    role: 'Super Admin',
    bio: 'Experienced restaurant platform administrator with 5+ years in the food industry.',
    avatar: '/images/user.jpg'
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header with Avatar */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-lg">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
                onError={(e) => {
                  e.target.src = "/images/user.jpg"
                }}
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-red-100">{profileData.role}</p>
              <p className="text-red-100 text-sm">{profileData.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Full Name">
              {isEditing ? (
                <Input
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.name}</p>
              )}
            </FormField>

            <FormField label="Email Address">
              {isEditing ? (
                <Input
                  name="email"
                  type="email"
                  value={editData.email}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.email}</p>
              )}
            </FormField>

            <FormField label="Phone Number">
              {isEditing ? (
                <Input
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.phone}</p>
              )}
            </FormField>

            <FormField label="Role">
              <p className="text-gray-900 py-2">{profileData.role}</p>
            </FormField>
          </div>

          <div className="mt-6">
            <FormField label="Bio">
              {isEditing ? (
                <Textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleChange}
                  rows={4}
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.bio}</p>
              )}
            </FormField>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? (
                  'Saving...'
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Additional Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-900">Download Data</h4>
              <p className="text-sm text-gray-500">Export your account data</p>
            </div>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage