"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Layout from "./layout"

interface OtpPageProps {
  phoneNumber: string
  onVerify: (otp: string) => void
  onBack: () => void
}

export default function OtpPage({ phoneNumber, onVerify, onBack }: OtpPageProps) {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = () => {
    const otpString = otp.join("")
    if (otpString.length === 4) {
      onVerify(otpString)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12">
          <button onClick={onBack} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-white">HUNGERSATE™</h1>
          <div className="w-6" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-center mb-12">
            <p className="text-white text-lg mb-2">Enter OTP sent to your mobile number for</p>
            <p className="text-white text-lg">verification</p>
          </div>

          {/* OTP Input */}
          <div className="flex gap-4 mb-12">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg text-center text-2xl font-bold text-gray-800 focus:border-red-300 focus:outline-none"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={otp.join("").length !== 4}
            className="w-full max-w-sm h-14 bg-white hover:bg-gray-100 text-red-500 font-bold text-lg rounded-xl disabled:opacity-50"
          >
            Verify & Continue
          </Button>
        </div>
      </div>
    </Layout>
  )
}
