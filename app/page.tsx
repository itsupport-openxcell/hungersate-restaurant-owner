"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import AuthPage from "@/components/auth/AuthPage"
import CreativeLoader from "@/components/CreativeLoader"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      if (user.profileCompleted) {
        router.push("/dashboard")
      } else {
        router.push("/profile-setup")
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <CreativeLoader />
  }

  if (!user) {
    return <AuthPage />
  }

  return <CreativeLoader />
}
