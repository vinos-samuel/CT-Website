"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminIndexPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect users landing on /admin directly to the dashboard
    router.replace("/admin/dashboard")
  }, [router])

  return null
}
