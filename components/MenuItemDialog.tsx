"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/ImageUpload"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, DollarSign, Percent, Calendar, Info, Tag, Utensils } from "lucide-react"

interface MenuItemDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
  editingItem?: any
  mode: "add" | "edit"
}

export function MenuItemDialog({ isOpen, onClose, onSubmit, editingItem, mode }: MenuItemDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    price: "",
    discount: "",
    category: "",
    cuisine: "",
    dishType: "",
    expiryDate: "",
    packagingDetails: "",
    image: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editingItem && mode === "edit") {
      setFormData({
        name: editingItem.name || "",
        description: editingItem.description || "",
        ingredients: editingItem.ingredients || "",
        price: editingItem.price?.toString() || "",
        discount: editingItem.discount?.toString() || "",
        category: editingItem.category || "",
        cuisine: editingItem.cuisine || "",
        dishType: editingItem.dishType || "",
        expiryDate: editingItem.expiryDate || "",
        packagingDetails: editingItem.packagingDetails || "",
        image: editingItem.image || "",
      })
    } else {
      setFormData({
        name: "",
        description: "",
        ingredients: "",
        price: "",
        discount: "",
        category: "",
        cuisine: "",
        dishType: "",
        expiryDate: "",
        packagingDetails: "",
        image: "",
      })
    }
    setErrors({})
  }, [editingItem, mode, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Dish name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.ingredients.trim()) newErrors.ingredients = "Ingredients are required"
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.cuisine) newErrors.cuisine = "Cuisine is required"
    if (!formData.dishType) newErrors.dishType = "Dish type is required"
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"
    if (!formData.packagingDetails.trim()) newErrors.packagingDetails = "Packaging details are required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        ...formData,
        price: Number.parseFloat(formData.price),
        discount: Number.parseFloat(formData.discount) || 0,
      })
      onClose()
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span>{mode === "add" ? "Add New Menu Item" : "Edit Menu Item"}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Upload Section */}
            <div className="lg:col-span-1">
              <Label className="text-base font-semibold mb-3 block">Dish Image</Label>
              <ImageUpload
                value={formData.image}
                onChange={(value) => handleInputChange("image", value)}
                placeholder="Upload HD Image"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                Upload a high-quality image (recommended: 800x600px or higher)
              </p>
            </div>

            {/* Form Fields Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Dish Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-red-500" : ""}
                      placeholder="e.g., Butter Chicken"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="price" className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Price (₹) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className={errors.price ? "border-red-500" : ""}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className={errors.description ? "border-red-500" : ""}
                    placeholder="Describe your dish in detail..."
                    rows={3}
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="mt-4">
                  <Label htmlFor="ingredients">Ingredients *</Label>
                  <Textarea
                    id="ingredients"
                    value={formData.ingredients}
                    onChange={(e) => handleInputChange("ingredients", e.target.value)}
                    className={errors.ingredients ? "border-red-500" : ""}
                    placeholder="List all ingredients separated by commas..."
                    rows={2}
                  />
                  {errors.ingredients && <p className="text-red-500 text-xs mt-1">{errors.ingredients}</p>}
                </div>
              </div>

              {/* Category & Classification */}
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Category & Classification
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="North Indian">North Indian</SelectItem>
                        <SelectItem value="South Indian">South Indian</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Continental">Continental</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="Mexican">Mexican</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>
                  <div>
                    <Label htmlFor="cuisine">Cuisine *</Label>
                    <Select value={formData.cuisine} onValueChange={(value) => handleInputChange("cuisine", value)}>
                      <SelectTrigger className={errors.cuisine ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Indian">Indian</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="Mexican">Mexican</SelectItem>
                        <SelectItem value="Thai">Thai</SelectItem>
                        <SelectItem value="Continental">Continental</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.cuisine && <p className="text-red-500 text-xs mt-1">{errors.cuisine}</p>}
                  </div>
                  <div>
                    <Label htmlFor="dishType">Dish Type *</Label>
                    <Select value={formData.dishType} onValueChange={(value) => handleInputChange("dishType", value)}>
                      <SelectTrigger className={errors.dishType ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Appetizer">Appetizer</SelectItem>
                        <SelectItem value="Main Course">Main Course</SelectItem>
                        <SelectItem value="Dessert">Dessert</SelectItem>
                        <SelectItem value="Beverage">Beverage</SelectItem>
                        <SelectItem value="Snack">Snack</SelectItem>
                        <SelectItem value="Soup">Soup</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.dishType && <p className="text-red-500 text-xs mt-1">{errors.dishType}</p>}
                  </div>
                </div>
              </div>

              {/* Pricing & Details */}
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Pricing & Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discount" className="flex items-center">
                      <Percent className="w-4 h-4 mr-1" />
                      Discount (%)
                    </Label>
                    <Input
                      id="discount"
                      type="number"
                      value={formData.discount}
                      onChange={(e) => handleInputChange("discount", e.target.value)}
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate" className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Expiry Date *
                    </Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      className={errors.expiryDate ? "border-red-500" : ""}
                    />
                    {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="packagingDetails">Packaging Details *</Label>
                  <Input
                    id="packagingDetails"
                    value={formData.packagingDetails}
                    onChange={(e) => handleInputChange("packagingDetails", e.target.value)}
                    className={errors.packagingDetails ? "border-red-500" : ""}
                    placeholder="e.g., Microwave-safe container, Eco-friendly packaging"
                  />
                  {errors.packagingDetails && <p className="text-red-500 text-xs mt-1">{errors.packagingDetails}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {(formData.name || formData.price || formData.image) && (
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
              <div className="flex items-start space-x-4">
                {formData.image && (
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{formData.name || "Dish Name"}</h4>
                  <p className="text-gray-600 text-sm mt-1">{formData.description || "Description will appear here"}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {formData.price && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        ₹{formData.price}
                      </Badge>
                    )}
                    {formData.discount && Number.parseFloat(formData.discount) > 0 && (
                      <Badge variant="destructive">{formData.discount}% OFF</Badge>
                    )}
                    {formData.category && <Badge variant="outline">{formData.category}</Badge>}
                    {formData.dishType && <Badge variant="outline">{formData.dishType}</Badge>}
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
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              {mode === "add" ? "Add Menu Item" : "Update Menu Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
