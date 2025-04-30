"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

export default function DebugPage() {
  const { user, session, userRole, isLoading } = useAuth()
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const checkUserRole = async () => {
    setIsChecking(true)
    setErrorMessage(null)

    try {
      const supabase = createClient()

      // Check if user exists in auth.users
      if (!user?.id) {
        setErrorMessage("No user ID found")
        setIsChecking(false)
        return
      }

      // Check if user has a role in user_roles table
      const { data: roleData, error: roleError } = await supabase.from("user_roles").select("*").eq("id", user.id)

      if (roleError) {
        setErrorMessage(`Error fetching role: ${roleError.message}`)
        setIsChecking(false)
        return
      }

      // Assign admin role if no role exists
      if (!roleData || roleData.length === 0) {
        const { error: insertError } = await supabase.from("user_roles").insert([{ id: user.id, role: "admin" }])

        if (insertError) {
          setErrorMessage(`Error assigning admin role: ${insertError.message}`)
          setIsChecking(false)
          return
        }

        setDebugInfo({
          message: "Admin role assigned successfully",
          userId: user.id,
          email: user.email,
          roleAssigned: "admin",
        })
      } else {
        setDebugInfo({
          message: "User role found",
          userId: user.id,
          email: user.email,
          existingRole: roleData[0].role,
          roleData,
        })
      }
    } catch (error: any) {
      setErrorMessage(`Exception: ${error.message}`)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Debug</CardTitle>
          <CardDescription>Check and fix authentication issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Current Auth State</h3>
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
              <p>
                <strong>Loading:</strong> {isLoading ? "Yes" : "No"}
              </p>
              <p>
                <strong>Authenticated:</strong> {user ? "Yes" : "No"}
              </p>
              <p>
                <strong>User ID:</strong> {user?.id || "None"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "None"}
              </p>
              <p>
                <strong>Role:</strong> {userRole || "None"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={checkUserRole} disabled={isChecking || !user}>
              {isChecking ? "Checking..." : "Check & Fix User Role"}
            </Button>

            {errorMessage && (
              <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 p-4 rounded-md">
                {errorMessage}
              </div>
            )}

            {debugInfo && (
              <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 p-4 rounded-md">
                <p>
                  <strong>Status:</strong> {debugInfo.message}
                </p>
                {debugInfo.roleData && (
                  <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(debugInfo.roleData, null, 2)}</pre>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-2">Next Steps</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Check if your user has a role assigned</li>
              <li>If no role is found, click the button above to assign the admin role</li>
              <li>
                After fixing the role, try accessing the{" "}
                <a href="/admin/dashboard" className="text-blue-600 dark:text-blue-400 underline">
                  dashboard
                </a>{" "}
                again
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
