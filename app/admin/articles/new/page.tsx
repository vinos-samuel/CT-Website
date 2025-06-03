"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArticleStorage } from "@/lib/article-storage"
import { RichTextEditor } from "@/components/rich-text-editor"

// Add this function after the imports
function cleanUploadedContent(content: string): string {
  let cleanContent = content

  // Remove CSS styling patterns
  cleanContent = cleanContent.replace(/p\.p\d+\s*\{[^}]*\}/g, "")
  cleanContent = cleanContent.replace(/li\.li\d+\s*\{[^}]*\}/g, "")
  cleanContent = cleanContent.replace(/span\.s\d+\s*\{[^}]*\}/g, "")
  cleanContent = cleanContent.replace(/\w+\.\w+\d*\s*\{[^}]*\}/g, "")

  // Remove CSS properties
  cleanContent = cleanContent.replace(/margin:\s*[^;]+;?/g, "")
  cleanContent = cleanContent.replace(/font:\s*[^;]+;?/g, "")
  cleanContent = cleanContent.replace(/color:\s*[^;]+;?/g, "")
  cleanContent = cleanContent.replace(/font-family:\s*[^;]+;?/g, "")
  cleanContent = cleanContent.replace(/font-size:\s*[^;]+;?/g, "")

  // Remove any remaining CSS blocks
  cleanContent = cleanContent.replace(/\{[^}]*\}/g, "")

  // Clean up extra whitespace
  cleanContent = cleanContent.replace(/\s+/g, " ")
  cleanContent = cleanContent.replace(/>\s+</g, "><")

  return cleanContent.trim()
}

export default function NewArticlePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadMethod, setUploadMethod] = useState<"type" | "upload">("type")
  const [saving, setSaving] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const adminUser = localStorage.getItem("admin_user")
    setUser(adminUser)
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadError("")
    setUploadedFile(file)

    // Check file type and handle accordingly
    const fileExtension = file.name.toLowerCase().split(".").pop()

    if (fileExtension === "txt" || fileExtension === "md") {
      // Handle plain text files
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        // Convert plain text to HTML with line breaks
        const htmlContent = text.replace(/\n/g, "<br>")
        setContent(cleanUploadedContent(htmlContent))

        // Auto-generate title from filename if not set
        if (!title) {
          const filename = file.name.replace(/\.[^/.]+$/, "") // Remove extension
          setTitle(filename.replace(/[-_]/g, " ")) // Replace dashes/underscores with spaces
        }
      }
      reader.onerror = () => {
        setUploadError("Error reading file. Please try again.")
      }
      reader.readAsText(file)
    } else if (fileExtension === "html" || fileExtension === "htm") {
      // Handle HTML files
      const reader = new FileReader()
      reader.onload = (e) => {
        const htmlContent = e.target?.result as string
        setContent(cleanUploadedContent(htmlContent))

        if (!title) {
          const filename = file.name.replace(/\.[^/.]+$/, "")
          setTitle(filename.replace(/[-_]/g, " "))
        }
      }
      reader.readAsText(file)
    } else {
      setUploadError(
        "For best formatting preservation: 1) Copy your formatted text from Word, 2) Paste directly into the rich text editor below, or 3) Save your document as HTML and upload that file.",
      )
      setUploadedFile(null)
    }
  }

  const handleSave = async (status: "draft" | "published" = "published") => {
    if (!title || !content || !category) {
      alert("Please fill in title, content, and category")
      return
    }

    setSaving(true)

    try {
      // Create plain text excerpt from HTML content
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = content
      const plainText = tempDiv.textContent || tempDiv.innerText || ""

      // Actually save the article with cleaned HTML content
      const savedArticle = ArticleStorage.saveArticle({
        title,
        content: cleanUploadedContent(content), // Clean content before saving
        category,
        status,
        author: user || "Admin",
        excerpt: plainText.substring(0, 200) + "...", // Plain text excerpt
      })

      alert(`Article ${status === "published" ? "published" : "saved as draft"} successfully!`)
      router.push("/admin/articles")
    } catch (error) {
      alert("Error saving article. Please try again.")
      console.error("Save error:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2>Create New Article</h2>
        <button
          onClick={() => router.back()}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>
      </div>

      <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "8px" }}>
        {/* Upload Method Selection */}
        <div style={{ marginBottom: "2rem", padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
          <h3 style={{ marginBottom: "1rem" }}>How would you like to add content?</h3>
          <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <input
                type="radio"
                name="uploadMethod"
                value="type"
                checked={uploadMethod === "type"}
                onChange={(e) => setUploadMethod(e.target.value as "type" | "upload")}
                style={{ marginRight: "0.5rem" }}
              />
              <strong>Type or paste content with formatting</strong> (Recommended)
            </label>
            <p style={{ marginLeft: "1.5rem", fontSize: "0.875rem", color: "#666" }}>
              Copy formatted text from Word/Google Docs and paste directly into the rich text editor below. Formatting,
              colors, and fonts will be preserved.
            </p>

            <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <input
                type="radio"
                name="uploadMethod"
                value="upload"
                checked={uploadMethod === "upload"}
                onChange={(e) => setUploadMethod(e.target.value as "type" | "upload")}
                style={{ marginRight: "0.5rem" }}
              />
              <strong>Upload file</strong>
            </label>
            <p style={{ marginLeft: "1.5rem", fontSize: "0.875rem", color: "#666" }}>
              Upload .txt, .md, or .html files. For Word documents, save as HTML first.
            </p>
          </div>
        </div>

        {/* File Upload Section */}
        {uploadMethod === "upload" && (
          <div style={{ marginBottom: "2rem", padding: "1rem", border: "2px dashed #ddd", borderRadius: "4px" }}>
            <h4 style={{ marginBottom: "1rem" }}>Upload Article File</h4>
            <input
              type="file"
              accept=".txt,.md,.html,.htm"
              onChange={handleFileUpload}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "white",
              }}
            />
            <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>
              <strong>Supported formats:</strong> .txt, .md, .html
            </p>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              <strong>For Word documents:</strong> Save as "Web Page, Filtered (*.html)" to preserve formatting
            </p>

            {uploadError && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem",
                  backgroundColor: "#fff3cd",
                  color: "#856404",
                  borderRadius: "4px",
                  border: "1px solid #ffeaa7",
                }}
              >
                💡 {uploadError}
              </div>
            )}

            {uploadedFile && !uploadError && (
              <div style={{ marginTop: "1rem", padding: "0.5rem", backgroundColor: "#d4edda", borderRadius: "4px" }}>
                ✅ File uploaded: <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024).toFixed(1)} KB)
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
            }}
          >
            <option value="">Select a category</option>
            <option value="worker-classification">Worker Classification</option>
            <option value="contracting-best-practices">Contracting Best Practices</option>
            <option value="risk-management">Risk Management</option>
            <option value="operations-management">Operations Management</option>
            <option value="workforce-planning">Workforce Planning</option>
            <option value="tools-technology">Tools & Technology</option>
            <option value="sow">SOW</option>
            <option value="total-talent">Total Talent</option>
          </select>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
            Content *{uploadedFile && !uploadError && <span style={{ color: "#28a745" }}>(Loaded from file)</span>}
          </label>
          <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem" }}>
            💡 <strong>Tip:</strong> Copy formatted text from Word/Google Docs and paste here to preserve formatting,
            colors, and fonts.
          </p>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Paste your formatted content here or start typing..."
          />
          <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.5rem" }}>
            Content length: {content.replace(/<[^>]*>/g, "").length} characters
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: saving ? "#ccc" : "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: saving ? "not-allowed" : "pointer",
              fontSize: "1rem",
            }}
          >
            {saving ? "Saving..." : "Save as Draft"}
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: saving ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: saving ? "not-allowed" : "pointer",
              fontSize: "1rem",
            }}
          >
            {saving ? "Publishing..." : "Publish Article"}
          </button>
          <button
            onClick={() => router.push("/admin/articles")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
