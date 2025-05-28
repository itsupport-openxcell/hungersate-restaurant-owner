"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  restaurantName: string
  email: string
  mobile: string
  profileCompleted: boolean
  isApproved: boolean
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (mobile: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const mockUser: User = {
  id: "1",
  restaurantName: "Spice Garden Restaurant",
  email: "owner@spicegarden.com",
  mobile: "+91 9876543210",
  profileCompleted: true,
  isApproved: true,
  role: "owner",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const login = async (mobile: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock login - accept any credentials
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = async (data: any) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedUser = { ...user, ...data } as User
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
