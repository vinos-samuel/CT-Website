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

// Cache for user roles to reduce API calls
const userRoleCache = new Map<string, { role: string | null; timestamp: number }>()

// Cache expiration time (10 minutes)
const CACHE_EXPIRATION = 10 * 60 * 1000

// Default role to use when role fetching fails
const DEFAULT_ROLE = "viewer"

// Maximum number of retries for network failures
const MAX_RETRIES = 2

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  // Create the Supabase client only once
  const supabase = createClient()

  // Fetch user role function with error handling, caching, and retries
  const fetchUserRole = async (userId: string, retryCount = 0): Promise<string | null> => {
    try {
      // Check cache first
      const cachedData = userRoleCache.get(userId)
      const now = Date.now()

      if (cachedData && now - cachedData.timestamp < CACHE_EXPIRATION) {
        console.log("Using cached role for user", userId)
        return cachedData.role
      }

      // If not in cache or expired, fetch from API
      console.log("Fetching role for user", userId)

      // Use maybeSingle() instead of single() to handle the case where no row is found
      const { data, error, status } = await supabase.from("user_roles").select("role").eq("id", userId).maybeSingle()

      // Handle rate limiting explicitly
      if (status === 429) {
        console.warn("Rate limited when fetching user role. Using default role.")
        return DEFAULT_ROLE
      }

      if (error) {
        console.error("Error fetching user role:", error)
        // If the error is that no rows were found, return a default role
        if (error.message.includes("no rows")) {
          console.warn("No role found for user. Using default role.")
          return DEFAULT_ROLE
        }

        // For other errors, try to retry if we haven't exceeded the max retries
        if (retryCount < MAX_RETRIES) {
          console.warn(`Retrying role fetch (${retryCount + 1}/${MAX_RETRIES})...`)
          // Exponential backoff: wait longer between each retry
          await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retryCount)))
          return fetchUserRole(userId, retryCount + 1)
        }

        return DEFAULT_ROLE
      }

      const role = data?.role || DEFAULT_ROLE

      // Cache the result
      userRoleCache.set(userId, { role, timestamp: now })

      return role
    } catch (err) {
      console.error("Exception when fetching user role:", err)

      // For network errors, try to retry if we haven't exceeded the max retries
      if (
        err instanceof Error &&
        (err.message.includes("Failed to fetch") ||
          err.message.includes("Network") ||
          err.message.includes("ECONNREFUSED")) &&
        retryCount < MAX_RETRIES
      ) {
        console.warn(`Network error, retrying role fetch (${retryCount + 1}/${MAX_RETRIES})...`)
        // Exponential backoff: wait longer between each retry
        await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, retryCount)))
        return fetchUserRole(userId, retryCount + 1)
      }

      // If we get a "Too Many Requests" error, use a default role
      if (err instanceof Error && err.message.includes("Too Many R")) {
        console.warn("Rate limited. Using default role.")
        return DEFAULT_ROLE
      }

      // For any other error or if we've exceeded retries, return the default role
      return DEFAULT_ROLE
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

    // Set up auth state change listener with debouncing
    let authChangeTimeout: NodeJS.Timeout | null = null

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      console.log("Auth state change:", event, session?.user?.email)

      // Clear any pending timeout
      if (authChangeTimeout) {
        clearTimeout(authChangeTimeout)
      }

      // Debounce auth state changes
      authChangeTimeout = setTimeout(async () => {
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
      }, 300) // 300ms debounce
    })

    return () => {
      mounted = false
      subscription.unsubscribe()

      // Clear any pending timeout on cleanup
      if (authChangeTimeout) {
        clearTimeout(authChangeTimeout)
      }
    }
  }, [router, supabase])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("Sign in result:", { data, error })

      return { error }
    } catch (err) {
      console.error("Exception during sign in:", err)
      return { error: err }
    }
  }

  const signOut = async () => {
    try {
      // Clear the role cache on sign out
      if (user?.id) {
        userRoleCache.delete(user.id)
      }

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
