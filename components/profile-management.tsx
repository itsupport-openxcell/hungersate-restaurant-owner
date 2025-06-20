"use client"

import { useState } from "react"
import { ArrowLeft, Save, Edit, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProfileManagementProps {
  isOpen: boolean
  onClose: () => void
}

interface ProfileData {
  restaurantName: string
  cuisineTypes: string[]
  establishmentYear: string
  phoneNumber: string
  emailAddress: string
  website: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pincode: string
}

const availableCuisines = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "Arabian",
  "Mughlai",
  "Continental",
  "Japanese",
  "Korean",
]

export default function ProfileManagement({ isOpen, onClose }: ProfileManagementProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
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
  })

  const [editData, setEditData] = useState<ProfileData>(profileData)

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCuisineToggle = (cuisine: string) => {
    setEditData((prev) => ({
      ...prev,
      cuisineTypes: prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter((c) => c !== cuisine)
        : [...prev.cuisineTypes, cuisine],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProfileData(editData)
    setIsEditing(false)
    setIsSaving(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  if (!isOpen) return null

  const renderField = (
    label: string,
    id: keyof ProfileData,
    icon?: React.ReactNode,
    inputType: string = "text"
  ) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <Label htmlFor={id} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        {icon}
        {label}
      </Label>
      {isEditing ? (
        <Input
          id={id}
          type={inputType}
          value={editData[id] as string}
          onChange={(e) => handleInputChange(id, e.target.value)}
          className="mt-2 h-12 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
        />
      ) : (
        <p className="mt-2 text-lg font-semibold text-gray-900">{profileData[id]}</p>
      )}
    </div>
  )

  return (
    <div className="fixed left-80 top-0 right-0 bottom-0 bg-white z-50 shadow-xl border-l border-gray-200 flex flex-col">
      <div className="bg-white shadow-sm p-4 pt-12 flex-shrink-0 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            title="Close"
            aria-label="Close"
            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Profile Management</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 mx-4">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <div className="text-white font-bold text-xl text-center">
                  <div>bon</div>
                  <div>ton</div>
                </div>
              </div>
              {isEditing && (
                <button
                  className="absolute bottom-2 right-2 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700"
                  title="Upload Image"
                  aria-label="Upload Image"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{profileData.restaurantName}</h2>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Active since {profileData.establishmentYear}</span>
            </div>
          </div>

          {/* Basic Info */}
          <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Basic Information
                </CardTitle>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {renderField("Restaurant Name", "restaurantName", <div className="w-2 h-2 bg-red-500 rounded-full"></div>)}

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Cuisine Types
                </Label>
                {isEditing ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {availableCuisines.map((cuisine) => (
                      <button
                        key={cuisine}
                        onClick={() => handleCuisineToggle(cuisine)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${editData.cuisineTypes.includes(cuisine)
                          ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md transform scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"}`}
                        title={cuisine}
                      >
                        {cuisine}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profileData.cuisineTypes.map((cuisine) => (
                      <Badge
                        key={cuisine}
                        className="bg-gradient-to-r from-red-100 to-orange-100 text-red-800 px-3 py-1 text-sm font-medium"
                      >
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {renderField("Establishment Year", "establishmentYear", <div className="w-2 h-2 bg-blue-500 rounded-full"></div>, "number")}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {renderField("Phone Number", "phoneNumber", <span className="text-lg">📱</span>)}
              {renderField("Email Address", "emailAddress", <span className="text-lg">✉️</span>, "email")}
              {renderField("Website", "website", <span className="text-lg">🌐</span>)}
            </CardContent>
          </Card>

          {/* Address Info */}
          <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="pb-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📍</span>
                </div>
                Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {renderField("Address Line 1", "addressLine1", <div className="w-2 h-2 bg-green-500 rounded-full"></div>)}
              {renderField("Address Line 2", "addressLine2", <div className="w-2 h-2 bg-green-400 rounded-full"></div>)}
              <div className="grid grid-cols-2 gap-4">
                {renderField("City", "city", <span className="text-sm">🏙️</span>)}
                {renderField("State", "state", <span className="text-sm">🗺️</span>)}
              </div>
              {renderField("Pincode", "pincode", <span className="text-sm">📮</span>)}
            </CardContent>
          </Card>

          <div className="pb-20" />
        </div>
      </div>

      {isEditing && (
        <div className="bg-gradient-to-r from-white to-gray-50 border-t border-gray-200 p-4 flex-shrink-0 shadow-lg">
          <div className="flex gap-3">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 h-14 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-lg rounded-xl shadow-lg"
            >
              {isSaving ? (
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
        </div>
      )}
    </div>
  )
}
