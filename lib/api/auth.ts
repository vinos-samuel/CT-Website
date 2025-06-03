import type { NextRequest } from "next/server"
import type { User } from "../database/types"

export interface AuthContext {
  user: User | null
  isAuthenticated: boolean
  hasRole: (role: string | string[]) => boolean
}

export async function getAuthContext(request: NextRequest): Promise<AuthContext> {
  try {
    // For now, use simple localStorage-based auth
    // In production, you'd implement proper JWT validation
    const authHeader = request.headers.get("authorization")

    if (!authHeader?.startsWith("Bearer ")) {
      return {
        user: null,
        isAuthenticated: false,
        hasRole: () => false,
      }
    }

    // Simple auth check - in production, validate JWT token
    const token = authHeader.substring(7)

    // Mock user for now - replace with actual token validation
    const user: User = {
      id: "admin-user-id",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
      status: "active",
      preferences: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    return {
      user,
      isAuthenticated: true,
      hasRole: (roles: string | string[]) => {
        const roleArray = Array.isArray(roles) ? roles : [roles]
        return roleArray.includes(user.role)
      },
    }
  } catch (error) {
    console.error("Auth context error:", error)
    return {
      user: null,
      isAuthenticated: false,
      hasRole: () => false,
    }
  }
}

export function requireAuth(roles?: string | string[]) {
  return async (request: NextRequest) => {
    const auth = await getAuthContext(request)

    if (!auth.isAuthenticated) {
      throw new Error("Authentication required")
    }

    if (roles && !auth.hasRole(roles)) {
      throw new Error("Insufficient permissions")
    }

    return auth
  }
}
