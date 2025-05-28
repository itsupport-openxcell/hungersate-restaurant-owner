"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface OTPVerificationProps {
  mobile: string
  type: string
  onBack: () => void
}

export default function OTPVerification({ mobile, type, onBack }: OTPVerificationProps) {
  const [otp, setOTP] = useState("")
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock OTP verification
    if (otp === "1234") {
      alert("OTP verified successfully!")
      // Handle successful verification based on type
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  const handleResend = () => {
    setTimer(60)
    setCanResend(false)
    alert("OTP resent successfully!")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle>OTP Verification</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">Enter the OTP sent to {mobile}</p>
          </div>

          <div>
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter 4-digit OTP"
              maxLength={4}
              required
            />
          </div>

          <div className="text-center">
            {!canResend ? (
              <p className="text-sm text-gray-600">Resend OTP in {timer}s</p>
            ) : (
              <Button variant="link" onClick={handleResend}>
                Resend OTP
              </Button>
            )}
          </div>

          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
