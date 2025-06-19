"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smartphone, ArrowRight } from "lucide-react"
import Layout from "./layout"

interface WelcomePageProps {
  onLogin: (phoneNumber: string) => void
}

export default function WelcomePage({ onLogin }: WelcomePageProps) {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleLogin = () => {
    if (phoneNumber.trim()) {
      onLogin(phoneNumber)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 mb-6 mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
              <path d="M50 10 L70 30 L90 50 L70 70 L50 90 L30 70 L10 50 L30 30 Z M50 25 L60 35 L75 50 L60 65 L50 75 L40 65 L25 50 L40 35 Z" />
              <circle cx="65" cy="35" r="8" />
            </svg>
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
        <div className="w-full max-w-sm space-y-6">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Smartphone className="w-5 h-5 text-gray-400" />
            </div>
            <Input
              type="tel"
              placeholder="Mobile Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-12 h-14 bg-white border-0 rounded-xl text-gray-700 placeholder-gray-400 text-base"
            />
          </div>

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
    </Layout>
  )
}
