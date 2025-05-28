"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Camera, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function ImageUpload({ value, onChange, placeholder = "Upload Image", className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange("")
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileSelect(file)
        }}
        className="hidden"
      />

      {value ? (
        <Card className="relative group cursor-pointer" onClick={handleClick}>
          <CardContent className="p-0">
            <div className="relative">
              <img src={value || "/placeholder.svg"} alt="Uploaded" className="w-full h-48 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <Button variant="secondary" size="sm" onClick={handleClick} className="bg-white/90 hover:bg-white">
                    <Camera className="w-4 h-4 mr-1" />
                    Change
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemove}
                    className="bg-red-500/90 hover:bg-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed cursor-pointer transition-all duration-200 ${
            isDragging ? "border-orange-500 bg-orange-50" : "border-gray-300 hover:border-orange-400 hover:bg-orange-50"
          }`}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700">{placeholder}</p>
                <p className="text-sm text-gray-500 mt-1">Drag and drop an image here, or click to browse</p>
                <p className="text-xs text-gray-400 mt-2">Supports: JPG, PNG, GIF (Max 5MB)</p>
              </div>
              <Button variant="outline" className="mt-4">
                <ImageIcon className="w-4 h-4 mr-2" />
                Choose Image
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
