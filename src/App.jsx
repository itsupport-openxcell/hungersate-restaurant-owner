import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AdminLayout from './layouts/AdminLayout'
import WelcomePage from './pages/Auth/WelcomePage'
import OtpPage from './pages/Auth/OtpPage'
import Dashboard from './pages/Dashboard'
import MenuList from './pages/Menu/List'
import MenuForm from './pages/Menu/Form'
import RestaurantList from './pages/Restaurants/List'
import RestaurantForm from './pages/Restaurants/Form'
import OrdersList from './pages/Orders/List'
import PaymentsList from './pages/Payments/List'
import SubUsersList from './pages/SubUsers/List'
import ProfilePage from './pages/Profile/Profile'
import PickupManagement from './pages/Pickup/Management'
import HelpSupport from './pages/Help/Support'
import AccountSettings from './pages/Account/Settings'

function App() {
  const [currentPage, setCurrentPage] = useState("welcome")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication status on app load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      setCurrentPage("dashboard")
    }
  }, [])

  // Handle logout event
  useEffect(() => {
    const handleLogout = () => {
      setIsAuthenticated(false)
      setCurrentPage("welcome")
      setPhoneNumber("")
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userPhone')
    }

    window.addEventListener("logout", handleLogout)
    window.addEventListener("redirectToLogin", handleLogout)

    return () => {
      window.removeEventListener("logout", handleLogout)
      window.removeEventListener("redirectToLogin", handleLogout)
    }
  }, [])

  const handleLogin = (phone) => {
    setPhoneNumber(phone)
    setCurrentPage("otp")
  }

  const handleOtpVerify = (otp) => {
    console.log("OTP verified:", otp)
    setIsAuthenticated(true)
    setCurrentPage("dashboard")
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userPhone', phoneNumber)
  }

  const handleBack = () => {
    setCurrentPage("welcome")
  }

  // If not authenticated, show auth flow
  if (!isAuthenticated) {
    switch (currentPage) {
      case "welcome":
        return <WelcomePage onLogin={handleLogin} />
      case "otp":
        return <OtpPage phoneNumber={phoneNumber} onVerify={handleOtpVerify} onBack={handleBack} />
      default:
        return <WelcomePage onLogin={handleLogin} />
    }
  }

  // If authenticated, show admin panel
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          
          {/* Menu Management */}
          <Route path="/menu" element={<AdminLayout><MenuList /></AdminLayout>} />
          <Route path="/menu/add" element={<AdminLayout><MenuForm /></AdminLayout>} />
          <Route path="/menu/edit/:id" element={<AdminLayout><MenuForm /></AdminLayout>} />
          
          {/* Restaurant Management */}
          <Route path="/restaurants" element={<AdminLayout><RestaurantList /></AdminLayout>} />
          <Route path="/restaurants/add" element={<AdminLayout><RestaurantForm /></AdminLayout>} />
          <Route path="/restaurants/edit/:id" element={<AdminLayout><RestaurantForm /></AdminLayout>} />
          
          {/* Orders */}
          <Route path="/orders" element={<AdminLayout><OrdersList /></AdminLayout>} />
          
          {/* Payments */}
          <Route path="/payments" element={<AdminLayout><PaymentsList /></AdminLayout>} />
          
          {/* Sub Users */}
          <Route path="/sub-users" element={<AdminLayout><SubUsersList /></AdminLayout>} />
          
          {/* Profile */}
          <Route path="/profile" element={<AdminLayout><ProfilePage /></AdminLayout>} />
          
          {/* Pickup Management */}
          <Route path="/pickup" element={<AdminLayout><PickupManagement /></AdminLayout>} />
          
          {/* Help & Support */}
          <Route path="/help" element={<AdminLayout><HelpSupport /></AdminLayout>} />
          
          {/* Account Settings */}
          <Route path="/settings" element={<AdminLayout><AccountSettings /></AdminLayout>} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App