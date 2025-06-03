import type React from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {children}
    </div>
  )
}
