export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      user_roles: {
        Row: {
          id: string
          role: "admin" | "editor" | "viewer"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: "admin" | "editor" | "viewer"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: "admin" | "editor" | "viewer"
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type UserRole = Database["public"]["Tables"]["user_roles"]["Row"]
