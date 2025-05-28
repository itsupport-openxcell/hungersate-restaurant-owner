"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"

interface LoginFormProps {
  onOTPRequest: (mobile: string, type: string) => void
  onForgotPassword: () => void
  onSwitchToSignup: () => void
}

export default function LoginForm({ onOTPRequest, onForgotPassword, onSwitchToSignup }: LoginFormProps) {
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [useOTP, setUseOTP] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (useOTP) {
      onOTPRequest(mobile, "login")
    } else {
      await login(mobile, password)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-gray-600 mt-2">Sign in to your restaurant dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            required
            className="mt-1"
          />
        </div>

        {!useOTP && (
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                type="button"
                variant="link"
                className="text-sm text-orange-600 hover:text-orange-700 p-0 h-auto"
                onClick={onForgotPassword}
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required={!useOTP}
              className="mt-1"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="useOTP"
            checked={useOTP}
            onChange={(e) => setUseOTP(e.target.checked)}
            className="rounded border-gray-300"
          />
          <Label htmlFor="useOTP" className="text-sm">
            Login with OTP instead
          </Label>
        </div>

        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
          {useOTP ? "Send OTP" : "Sign In"}
        </Button>
      </form>

      <div className="relative">
        <Separator />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white px-2 text-sm text-gray-500">or</span>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        New to HungerSate?{" "}
        <button type="button" onClick={onSwitchToSignup} className="text-orange-600 font-medium hover:underline">
          Create an account
        </button>
      </div>
    </div>
  )
}
