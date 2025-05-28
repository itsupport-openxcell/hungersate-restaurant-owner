"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/ImageUpload"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Shield, UserCheck } from "lucide-react"

interface SubUserDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  editingUser?: any
  mode: "add" | "edit"
}

export function SubUserDialog({ isOpen, onClose, onSubmit, editingUser, mode }: SubUserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    photo: "",
    permissions: {
      orderManagement: false,
      menuManagement: false,
      userManagement: false,
      paymentAccess: false,
      fullAccess: false,
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editingUser && mode === "edit") {
      setFormData({
        name: editingUser.name || "",
        email: editingUser.email || "",
        mobile: editingUser.mobile || "",
        role: editingUser.role || "",
        photo: editingUser.photo || "",
        permissions: { ...editingUser.permissions },
      })
    } else {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        role: "",
        photo: "",
        permissions: {
          orderManagement: false,
          menuManagement: false,
          userManagement: false,
          paymentAccess: false,
          fullAccess: false,
        },
      })
    }
    setErrors({})
  }, [editingUser, mode, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
    else if (!/^\+?[\d\s-()]+$/.test(formData.mobile)) newErrors.mobile = "Mobile number is invalid"
    if (!formData.role) newErrors.role = "Role is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
      onClose()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handlePermissionChange = (permission: string, value: boolean) => {
    if (permission === "fullAccess" && value) {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          orderManagement: true,
          menuManagement: true,
          userManagement: true,
          paymentAccess: true,
          fullAccess: true,
        },
      }))
    } else if (permission === "fullAccess" && !value) {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          orderManagement: false,
          menuManagement: false,
          userManagement: false,
          paymentAccess: false,
          fullAccess: false,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [permission]: value,
          fullAccess: false,
        },
      }))
    }
  }

  const getPermissionCount = () => {
    const { fullAccess, ...otherPermissions } = formData.permissions
    if (fullAccess) return 4
    return Object.values(otherPermissions).filter(Boolean).length
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <span>{mode === "add" ? "Add New Sub-User" : "Edit Sub-User"}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Photo Upload Section */}
            <div className="lg:col-span-1">
              <Label className="text-base font-semibold mb-3 block">Profile Photo</Label>
              <ImageUpload
                value={formData.photo}
                onChange={(value) => handleInputChange("photo", value)}
                placeholder="Upload Photo"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-2">Upload a professional profile photo (recommended: 400x400px)</p>
            </div>

            {/* Form Fields Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                      placeholder="Enter full name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Owner">Owner</SelectItem>
                        <SelectItem value="Shift Manager">Shift Manager</SelectItem>
                        <SelectItem value="Chef">Chef</SelectItem>
                        <SelectItem value="Cashier">Cashier</SelectItem>
                        <SelectItem value="Delivery Manager">Delivery Manager</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                      placeholder="user@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="mobile" className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      Mobile Number *
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      className={errors.mobile ? "border-red-500" : ""}
                      placeholder="+91 9876543210"
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions Section */}
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-purple-800 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Access Permissions
              </h3>
              <Badge variant="outline" className="bg-white">
                {getPermissionCount()}/4 Permissions
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <Label htmlFor="fullAccess" className="font-medium">
                      Full Master Control
                    </Label>
                    <p className="text-sm text-gray-600">Complete access to all features</p>
                  </div>
                  <Switch
                    id="fullAccess"
                    checked={formData.permissions.fullAccess}
                    onCheckedChange={(checked) => handlePermissionChange("fullAccess", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <Label htmlFor="orderManagement" className="font-medium">
                      Order Management
                    </Label>
                    <p className="text-sm text-gray-600">View and manage orders</p>
                  </div>
                  <Switch
                    id="orderManagement"
                    checked={formData.permissions.orderManagement}
                    onCheckedChange={(checked) => handlePermissionChange("orderManagement", checked)}
                    disabled={formData.permissions.fullAccess}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <Label htmlFor="menuManagement" className="font-medium">
                      Menu Management
                    </Label>
                    <p className="text-sm text-gray-600">Add and edit menu items</p>
                  </div>
                  <Switch
                    id="menuManagement"
                    checked={formData.permissions.menuManagement}
                    onCheckedChange={(checked) => handlePermissionChange("menuManagement", checked)}
                    disabled={formData.permissions.fullAccess}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <Label htmlFor="userManagement" className="font-medium">
                      User Management
                    </Label>
                    <p className="text-sm text-gray-600">Manage sub-users</p>
                  </div>
                  <Switch
                    id="userManagement"
                    checked={formData.permissions.userManagement}
                    onCheckedChange={(checked) => handlePermissionChange("userManagement", checked)}
                    disabled={formData.permissions.fullAccess}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <Label htmlFor="paymentAccess" className="font-medium">
                    Payment Access
                  </Label>
                  <p className="text-sm text-gray-600">View payment and transaction data</p>
                </div>
                <Switch
                  id="paymentAccess"
                  checked={formData.permissions.paymentAccess}
                  onCheckedChange={(checked) => handlePermissionChange("paymentAccess", checked)}
                  disabled={formData.permissions.fullAccess}
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {(formData.name || formData.email || formData.photo) && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
              <div className="flex items-start space-x-4">
                {formData.photo ? (
                  <img
                    src={formData.photo || "/placeholder.svg"}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{formData.name || "User Name"}</h4>
                  <p className="text-gray-600 text-sm">{formData.email || "email@example.com"}</p>
                  <p className="text-gray-600 text-sm">{formData.mobile || "Phone number"}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {formData.role && <Badge variant="outline">{formData.role}</Badge>}
                    <Badge variant="default" className="bg-purple-100 text-purple-800">
                      {getPermissionCount()} Permissions
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === "add" ? "Add Sub-User" : "Update Sub-User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
