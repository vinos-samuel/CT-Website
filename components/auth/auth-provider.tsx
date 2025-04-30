"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  userRole: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  // Create the Supabase client only once
  const supabase = createClient()

  // Fetch user role function with error handling
  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("user_roles").select("role").eq("id", userId).single()

      if (error) {
        console.error("Error fetching user role:", error)
        return null
      }

      return data?.role || null
    } catch (err) {
      console.error("Exception when fetching user role:", err)
      return null
    }
  }

  useEffect(() => {
    let mounted = true

    const getSession = async () => {
      try {
        setIsLoading(true)

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          if (mounted) {
            setIsLoading(false)
          }
          return
        }

        if (session && mounted) {
          setSession(session)
          setUser(session.user)

          // Fetch user role
          const role = await fetchUserRole(session.user.id)
          if (mounted) {
            setUserRole(role)
          }
        }

        if (mounted) {
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Exception in getSession:", err)
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          // Fetch user role when auth state changes
          const role = await fetchUserRole(session.user.id)
          if (mounted) {
            setUserRole(role)
          }
        } else if (mounted) {
          setUserRole(null)
        }

        router.refresh()
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router, supabase])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { error }
    } catch (err) {
      console.error("Exception during sign in:", err)
      return { error: err }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/admin/login")
    } catch (err) {
      console.error("Exception during sign out:", err)
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signOut,
    userRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
