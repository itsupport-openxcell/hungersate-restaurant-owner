"use client"

import { useState, useEffect } from "react"
import WelcomePage from "@/components/welcome-page"
import OtpPage from "@/components/otp-page"
import DashboardPage from "@/components/dashboard-page"

type AppState = "welcome" | "otp" | "dashboard"

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppState>("welcome")
  const [phoneNumber, setPhoneNumber] = useState("")

  // Add useEffect to handle logout event
  useEffect(() => {
    const handleRedirectToLogin = () => {
      setCurrentPage("welcome")
      setPhoneNumber("")
    }

    window.addEventListener("redirectToLogin", handleRedirectToLogin)

    return () => {
      window.removeEventListener("redirectToLogin", handleRedirectToLogin)
    }
  }, [])

  const handleLogin = (phone: string) => {
    setPhoneNumber(phone)
    setCurrentPage("otp")
  }

  const handleOtpVerify = (otp: string) => {
    // In a real app, you would verify the OTP with your backend
    console.log("OTP verified:", otp)
    setCurrentPage("dashboard")
  }

  const handleBack = () => {
    setCurrentPage("welcome")
  }

  switch (currentPage) {
    case "welcome":
      return <WelcomePage onLogin={handleLogin} />
    case "otp":
      return <OtpPage phoneNumber={phoneNumber} onVerify={handleOtpVerify} onBack={handleBack} />
    case "dashboard":
      return <DashboardPage />
    default:
      return <WelcomePage onLogin={handleLogin} />
  }
}
