import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
    throw new Error("Supabase URL is not configured")
  }

  if (!supabaseAnonKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
    throw new Error("Supabase anonymous key is not configured")
  }

  try {
    return createBrowserClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error("Failed to create Supabase client:", error)
    throw new Error("Failed to initialize Supabase client")
  }
}
