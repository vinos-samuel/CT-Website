"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-provider"

export default function UnauthorizedPage() {
  const { signOut } = useAuth()

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <CardTitle className="text-2xl text-center">Access Denied</CardTitle>
          <CardDescription className="text-center">You don't have permission to access this page</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Your account doesn't have the required permissions to view this admin section. Please contact the
            administrator if you believe this is an error.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={signOut}>
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
