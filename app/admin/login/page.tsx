"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === "admin@cthub.com" && password === "admin123") {
      // Store login status
      localStorage.setItem("admin_logged_in", "true")
      // Redirect to dashboard
      router.push("/admin/dashboard")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          padding: "1rem",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "#0070f3",
            textDecoration: "none",
            fontWeight: 500,
            marginBottom: "1rem",
          }}
        >
          <ArrowLeft style={{ marginRight: "0.5rem" }} size={16} />
          Back to Website
        </Link>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            width: "400px",
          }}
        >
          <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>Admin Login</h1>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cthub.com"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                required
              />
            </div>

            {error && (
              <div
                style={{
                  color: "red",
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  backgroundColor: "#fee",
                  borderRadius: "4px",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>

          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#e7f3ff",
              borderRadius: "4px",
              fontSize: "0.9rem",
            }}
          >
            <strong>Demo Credentials:</strong>
            <br />
            Email: admin@cthub.com
            <br />
            Password: admin123
          </div>
        </div>
      </div>
    </div>
  )
}
