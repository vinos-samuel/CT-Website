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
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Create the Supabase client only once
  const supabase = createClient()

  // Simple role fetching without retries to avoid SSR issues
  const fetchUserRole = async (userId: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase.from("user_roles").select("role").eq("id", userId).maybeSingle()

      if (error || !data) {
        return "viewer" // Default role
      }

      return data.role || "viewer"
    } catch (err) {
      console.error("Error fetching user role:", err)
      return "viewer" // Default role
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let isMounted = true

    const getSession = async () => {
      try {
        setIsLoading(true)

        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          if (isMounted) {
            setIsLoading(false)
          }
          return
        }

        if (session && isMounted) {
          setSession(session)
          setUser(session.user)

          // Fetch user role
          const role = await fetchUserRole(session.user.id)
          if (isMounted) {
            setUserRole(role)
          }
        }

        if (isMounted) {
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Exception in getSession:", err)
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        const role = await fetchUserRole(session.user.id)
        if (isMounted) {
          setUserRole(role)
        }
      } else if (isMounted) {
        setUserRole(null)
      }

      router.refresh()
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [mounted, router, supabase])

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

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
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
