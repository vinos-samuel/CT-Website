export interface User {
  id: string
  email: string
  role: string
  loginTime: string
}

export class SimpleAuth {
  private static readonly SESSION_KEY = "admin_session"
  private static readonly USER_KEY = "admin_user"
  private static readonly ADMIN_CREDENTIALS = {
    email: "admin@cthub.com",
    password: "admin123",
  }

  static async login(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User }> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email.trim() === this.ADMIN_CREDENTIALS.email && password === this.ADMIN_CREDENTIALS.password) {
      const user: User = {
        id: "admin-1",
        email: email.trim(),
        role: "admin",
        loginTime: new Date().toISOString(),
      }

      localStorage.setItem(this.SESSION_KEY, "true")
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))

      return { success: true, user }
    }

    return { success: false, error: "Invalid credentials. Use admin@cthub.com / admin123" }
  }

  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static isAuthenticated(): boolean {
    if (typeof window === "undefined") return false
    return localStorage.getItem(this.SESSION_KEY) === "true"
  }

  static getCurrentUser(): User | null {
    if (typeof window === "undefined") return null
    const userStr = localStorage.getItem(this.USER_KEY)
    if (!userStr) return null

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }
}
