"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChefHat, Utensils, Star, Coffee } from "lucide-react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import ForgotPasswordForm from "./ForgotPasswordForm"
import OTPVerification from "./OTPVerification"

interface AuthPageProps {
  initialMode?: "login" | "signup"
}

export default function AuthPage({ initialMode = "login" }: AuthPageProps) {
  const [activeMode, setActiveMode] = useState<"login" | "signup" | "forgot">(initialMode)
  const [showOTP, setShowOTP] = useState(false)
  const [otpData, setOTPData] = useState({ mobile: "", type: "" })

  const handleOTPRequest = (mobile: string, type: string) => {
    setOTPData({ mobile, type })
    setShowOTP(true)
  }

  const handleBackToLogin = () => {
    setActiveMode("login")
  }

  if (showOTP) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
        <OTPVerification mobile={otpData.mobile} type={otpData.type} onBack={() => setShowOTP(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Half - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-8 w-96 h-96 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-1/3 w-80 h-80 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Food Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Utensils className="absolute top-20 left-20 w-8 h-8 text-white/20 animate-bounce delay-300" />
          <Star className="absolute top-32 right-32 w-6 h-6 text-white/30 animate-pulse delay-700" />
          <ChefHat className="absolute bottom-32 left-32 w-10 h-10 text-white/20 animate-bounce delay-1000" />
          <Coffee className="absolute bottom-20 right-20 w-7 h-7 text-white/25 animate-pulse delay-500" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center text-white p-12">
          <div className="mb-8">
            <div className="relative mb-6">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-2xl">
                <ChefHat className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Star className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-3 tracking-tight">
              Hunger<span className="text-yellow-300">Sate</span>
            </h1>
            <p className="text-xl font-medium mb-2">Restaurant Management</p>
            <p className="text-white/80 text-lg">Streamline your restaurant operations</p>
          </div>

          <div className="space-y-4 text-white/90">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Manage orders efficiently</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Track real-time analytics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Handle payments seamlessly</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
              <span>Manage your team effectively</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Half - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-bold">
                Hunger<span className="text-orange-500">Sate</span>
              </h1>
            </div>
            <p className="text-gray-600">Restaurant Management System</p>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              {/* Mode Toggle - Only show for login/signup */}
              {activeMode !== "forgot" && (
                <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
                  <Button
                    variant={activeMode === "login" ? "default" : "ghost"}
                    className="flex-1"
                    onClick={() => setActiveMode("login")}
                  >
                    Login
                  </Button>
                  <Button
                    variant={activeMode === "signup" ? "default" : "ghost"}
                    className="flex-1"
                    onClick={() => setActiveMode("signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Forms */}
              {activeMode === "login" && (
                <LoginForm
                  onOTPRequest={handleOTPRequest}
                  onForgotPassword={() => setActiveMode("forgot")}
                  onSwitchToSignup={() => setActiveMode("signup")}
                />
              )}
              {activeMode === "signup" && (
                <SignupForm onOTPRequest={handleOTPRequest} onSwitchToLogin={() => setActiveMode("login")} />
              )}
              {activeMode === "forgot" && (
                <ForgotPasswordForm onOTPRequest={handleOTPRequest} onBackToLogin={handleBackToLogin} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
