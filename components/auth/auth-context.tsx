"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { SimpleAuth, type User } from "@/lib/auth/simple-auth"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      if (SimpleAuth.isAuthenticated()) {
        const currentUser = SimpleAuth.getCurrentUser()
        setUser(currentUser)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const result = await SimpleAuth.login(email, password)
    if (result.success && result.user) {
      setUser(result.user)
    }
    return result
  }

  const logout = () => {
    SimpleAuth.logout()
    setUser(null)
    router.push("/admin/login")
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
