import React, { useState, useRef } from "react"
import { ArrowLeft } from "lucide-react"
import Button from "../../components/Button"

const OtpPage = ({ phoneNumber, onVerify, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef([])

  const handleOtpChange = (index, value) => {
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

  const handleKeyDown = (index, e) => {
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
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 flex flex-col">
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
          <p className="text-white text-sm mt-4 opacity-80">{phoneNumber}</p>
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
  )
}

export default OtpPage