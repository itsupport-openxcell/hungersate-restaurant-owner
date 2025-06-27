import React, { useState } from "react"
import { Smartphone, ArrowRight } from "lucide-react"
import Button from "../../components/Button"
import { Input } from "../../components/Form"

const WelcomePage = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    const trimmedPhone = phoneNumber.trim()

    if (!trimmedPhone) {
      setError("Please enter your mobile number.")
      return
    }

    setError("")
    onLogin(trimmedPhone)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 flex flex-col items-center justify-center px-6 py-8">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-20 h-20 mb-6 mx-auto">
          <img
            src="/images/Logo-icon.png"
            alt="Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      </div>

      {/* Brand Name */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider">HUNGERSATE</h1>
        <p className="text-white text-sm md:text-base font-medium tracking-wide">
          CURATED GOURMET INDULGENCE, DELIVERED
        </p>
        <p className="text-white text-lg md:text-xl font-semibold mt-2">RESTAURANT</p>
      </div>

      {/* Welcome Message */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">WELCOME!!</h2>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Smartphone className="w-5 h-5 text-gray-400" />
          </div>
          <Input
            type="tel"
            placeholder="Enter your mobile number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="pl-12 h-14 bg-white border-0 rounded-xl text-gray-700 placeholder-gray-400 text-base"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleLogin}
          className="w-full h-14 bg-white hover:bg-gray-100 text-red-500 font-bold text-lg rounded-xl flex items-center justify-center gap-2"
        >
          LOGIN
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Footer Links */}
      <div className="mt-16 flex gap-8 text-white text-sm">
        <button className="hover:underline">Privacy Policy</button>
        <button className="hover:underline">Terms & Conditions</button>
      </div>
    </div>
  )
}

export default WelcomePage