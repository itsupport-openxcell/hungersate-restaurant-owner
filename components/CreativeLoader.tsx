"use client"

import { ChefHat, Utensils, Coffee, Cookie } from "lucide-react"

export default function CreativeLoader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        {/* Main Logo with Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <ChefHat className="w-10 h-10 text-white" />
          </div>

          {/* Orbiting Food Icons */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
            <Utensils className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 text-orange-500" />
          </div>
          <div
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: "4s", animationDirection: "reverse" }}
          >
            <Coffee className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "5s" }}>
            <Cookie className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-5 text-orange-600" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">HungerSate</h2>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>

        <p className="text-gray-600 animate-pulse">Preparing your dashboard...</p>
      </div>
    </div>
  )
}
