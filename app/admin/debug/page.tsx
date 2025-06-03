"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export default function AdminDebug() {
  const { user, session, isLoading, userRole } = useAuth()
  const [checkingRole, setCheckingRole] = useState(false)
  const [roleStatus, setRoleStatus] = useState<"checking" | "found" | "not-found" | "fixed" | "error" | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const supabase = createClient()

  const checkAndFixRole = async () => {
    if (!user) return

    try {
      setCheckingRole(true)
      setRoleStatus("checking")
      setErrorMessage(null)

      // Check if user has a role
      const { data, error } = await supabase.from("user_roles").select("role").eq("id", user.id).single()

      if (error) {
        if (error.code === "PGRST116") {
          // No role found, let's add one
          setRoleStatus("not-found")

          // Add admin role
          const { error: insertError } = await supabase.from("user_roles").insert([{ id: user.id, role: "admin" }])

          if (insertError) {
            setRoleStatus("error")
            setErrorMessage(`Error adding role: ${insertError.message}`)
          } else {
            setRoleStatus("fixed")
          }
        } else {
          setRoleStatus("error")
          setErrorMessage(`Error checking role: ${error.message}`)
        }
      } else {
        setRoleStatus("found")
      }
    } catch (err) {
      setRoleStatus("error")
      setErrorMessage(`Exception: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setCheckingRole(false)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Status</CardTitle>
            <CardDescription>Current authentication state</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading authentication state...</p>
            ) : user ? (
              <div className="space-y-4">
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Authenticated</AlertTitle>
                  <AlertDescription>You are currently logged in.</AlertDescription>
                </Alert>

                <div className="grid gap-2">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <span className="font-medium">User ID:</span>
                    <code className="bg-muted p-1 rounded text-xs col-span-2 break-all">{user.id}</code>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center">
                    <span className="font-medium">Email:</span>
                    <span className="col-span-2">{user.email}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center">
                    <span className="font-medium">Role:</span>
                    <span className="col-span-2">
                      {userRole ? (
                        <span className="capitalize">{userRole}</span>
                      ) : (
                        <span className="text-red-500">No role assigned</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Not Authenticated</AlertTitle>
                <AlertDescription>You are not currently logged in.</AlertDescription>
              </Alert>
            )}
          </CardContent>
          {user && (
            <CardFooter>
              <Button onClick={checkAndFixRole} disabled={checkingRole}>
                {checkingRole ? "Checking..." : "Check & Fix User Role"}
              </Button>
            </CardFooter>
          )}
        </Card>

        {roleStatus && (
          <Card>
            <CardHeader>
              <CardTitle>Role Check Results</CardTitle>
            </CardHeader>
            <CardContent>
              {roleStatus === "checking" && <p>Checking role status...</p>}

              {roleStatus === "found" && (
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Role Found</AlertTitle>
                  <AlertDescription>
                    Your user already has a role assigned: <span className="font-medium capitalize">{userRole}</span>
                  </AlertDescription>
                </Alert>
              )}

              {roleStatus === "not-found" && (
                <Alert variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>No Role Found</AlertTitle>
                  <AlertDescription>
                    Your user does not have a role assigned. Attempting to add admin role...
                  </AlertDescription>
                </Alert>
              )}

              {roleStatus === "fixed" && (
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Role Added</AlertTitle>
                  <AlertDescription>
                    Successfully added admin role to your user. Please refresh the page or sign out and back in.
                  </AlertDescription>
                </Alert>
              )}

              {roleStatus === "error" && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
