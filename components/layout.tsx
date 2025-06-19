"use client"

import type { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
  className?: string
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return <div className={`min-h-screen bg-red-500 ${className}`}>{children}</div>
}
