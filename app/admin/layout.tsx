"use client"

import type React from "react"

import { AuthProvider } from "@/components/auth/auth-provider"
import { Suspense } from "react"

function AdminLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <Suspense fallback={<AdminLoadingFallback />}>
        <div className="min-h-screen bg-background">{children}</div>
      </Suspense>
    </AuthProvider>
  )
}
