"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Smartphone, Shield } from "lucide-react"

interface ForgotPasswordFormProps {
  onOTPRequest: (mobile: string, type: string) => void
  onBackToLogin: () => void
}

export default function ForgotPasswordForm({ onOTPRequest, onBackToLogin }: ForgotPasswordFormProps) {
  const [mobile, setMobile] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onOTPRequest(mobile, "forgot")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full">
          <Shield className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
        <p className="text-gray-600 mt-2">Enter your mobile number to receive a password reset OTP</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
            Mobile Number
          </Label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Smartphone className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              id="mobile"
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
              className="pl-10"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit mobile number"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">We'll send a 6-digit OTP to this number</p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Security Notice</p>
              <p>
                For your security, the OTP will be valid for 10 minutes only. Please don't share this OTP with anyone.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending OTP...</span>
            </div>
          ) : (
            "Send Reset OTP"
          )}
        </Button>

        {/* Back to Login */}
        <Button
          type="button"
          variant="ghost"
          onClick={onBackToLogin}
          className="w-full text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Button>
      </form>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Having trouble? Contact support at{" "}
          <a href="tel:+1234567890" className="text-orange-600 hover:underline">
            +91 12345 67890
          </a>
        </p>
      </div>
    </div>
  )
}
