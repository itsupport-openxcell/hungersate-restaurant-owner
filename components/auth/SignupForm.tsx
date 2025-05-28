"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"

interface SignupFormProps {
  onOTPRequest: (mobile: string, type: string) => void
  onSwitchToLogin: () => void
}

export default function SignupForm({ onOTPRequest, onSwitchToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [useOTP, setUseOTP] = useState(false)
  const { signup } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!useOTP && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    if (useOTP) {
      onOTPRequest(formData.mobile, "signup")
    } else {
      await signup(formData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2">Start managing your restaurant today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="restaurantName">Restaurant Name</Label>
          <Input
            id="restaurantName"
            name="restaurantName"
            type="text"
            value={formData.restaurantName}
            onChange={handleChange}
            placeholder="Enter restaurant name"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Enter owner name"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
            className="mt-1"
          />
        </div>

        {!useOTP && (
          <>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                required={!useOTP}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required={!useOTP}
                className="mt-1"
              />
            </div>
          </>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="useOTPSignup"
            checked={useOTP}
            onChange={(e) => setUseOTP(e.target.checked)}
            className="rounded border-gray-300"
          />
          <Label htmlFor="useOTPSignup" className="text-sm">
            Sign up with OTP verification
          </Label>
        </div>

        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
          {useOTP ? "Send OTP" : "Create Account"}
        </Button>
      </form>

      <div className="relative">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">or</span>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin} className="text-orange-600 font-medium hover:underline">
          Sign in
        </button>
      </div>
    </div>
  )
}
