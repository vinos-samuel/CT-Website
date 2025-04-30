"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"

interface RequireAuthProps {
  children: React.ReactNode
  requiredRole?: "admin" | "editor" | "viewer"
}

export function RequireAuth({ children, requiredRole = "admin" }: RequireAuthProps) {
  const { user, isLoading, userRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect after loading is complete and we know there's no user
    if (!isLoading && !user) {
      router.push("/admin/login")
    } else if (!isLoading && user && userRole && requiredRole) {
      // Check if user has required role
      const roleHierarchy = { admin: 3, editor: 2, viewer: 1 }
      const userRoleValue = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
      const requiredRoleValue = roleHierarchy[requiredRole] || 0

      if (userRoleValue < requiredRoleValue) {
        router.push("/admin/unauthorized")
      }
    }
  }, [isLoading, user, router, userRole, requiredRole])

  // Show nothing while loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If not loading and we have a user, render children
  if (!isLoading && user) {
    return <>{children}</>
  }

  // Default case - loading or redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}
