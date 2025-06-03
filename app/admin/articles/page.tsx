"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArticleStorage, type StoredArticle } from "@/lib/article-storage"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<StoredArticle[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Load articles from storage
    const loadArticles = () => {
      const storedArticles = ArticleStorage.getArticles()
      setArticles(storedArticles)
      setLoading(false)
    }

    loadArticles()
  }, [])

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      ArticleStorage.deleteArticle(id)
      setArticles(articles.filter((a) => a.id !== id))
      alert("Article deleted successfully!")
    }
  }

  const handleToggleStatus = (id: string) => {
    const article = articles.find((a) => a.id === id)
    if (!article) return

    const newStatus = article.status === "published" ? "draft" : "published"
    const updated = ArticleStorage.updateArticle(id, { status: newStatus })

    if (updated) {
      setArticles(articles.map((a) => (a.id === id ? updated : a)))
      alert(`Article ${newStatus === "published" ? "published" : "unpublished"} successfully!`)
    }
  }

  const handleExportArticles = () => {
    const exportData = ArticleStorage.exportArticles()
    const blob = new Blob([exportData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `articles-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    alert("Articles exported successfully!")
  }

  const handleImportArticles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (ArticleStorage.importArticles(content)) {
        setArticles(ArticleStorage.getArticles())
        alert("Articles imported successfully!")
      } else {
        alert("Error importing articles. Please check the file format.")
      }
    }
    reader.readAsText(file)

    // Reset the input
    event.target.value = ""
  }

  if (loading) {
    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ textAlign: "center" }}>Loading articles...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2>Manage Articles ({articles.length})</h2>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={handleExportArticles}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
            title="Download all articles as JSON backup file"
          >
            📥 Export Backup
          </button>
          <label
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#17a2b8",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
            title="Upload JSON backup file to restore articles"
          >
            📤 Import Backup
            <input type="file" accept=".json" onChange={handleImportArticles} style={{ display: "none" }} />
          </label>
          <button
            onClick={() => router.push("/admin/articles/bulk-upload")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#6f42c1",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
            title="Upload multiple articles at once"
          >
            📚 Bulk Upload
          </button>
          <button
            onClick={() => router.push("/admin/articles/new")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            + Create New Article
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#e7f3ff",
          border: "1px solid #b3d9ff",
          borderRadius: "4px",
          marginBottom: "2rem",
          fontSize: "0.875rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#0066cc" }}>📋 Backup & Upload Options:</h4>
        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>
            <strong>Export Backup:</strong> Downloads all your articles as a JSON file for safekeeping
          </li>
          <li>
            <strong>Import Backup:</strong> Restores articles from a previously exported JSON file
          </li>
          <li>
            <strong>Bulk Upload:</strong> Upload multiple text files at once and assign categories
          </li>
        </ul>
      </div>

      {articles.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "2px dashed #ddd",
          }}
        >
          <h3>No articles yet</h3>
          <p style={{ color: "#666", marginBottom: "1rem" }}>Create your first article to get started!</p>
          <button
            onClick={() => router.push("/admin/articles/new")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Create First Article
          </button>
        </div>
      ) : (
        <div style={{ backgroundColor: "white", borderRadius: "8px", overflow: "auto", maxWidth: "100%" }}>
          <div style={{ minWidth: "800px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa" }}>
                  <th style={{ padding: "1rem", textAlign: "left", borderBottom: "1px solid #ddd", minWidth: "200px" }}>
                    Title
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", borderBottom: "1px solid #ddd", minWidth: "150px" }}>
                    Category
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", borderBottom: "1px solid #ddd", minWidth: "100px" }}>
                    Status
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", borderBottom: "1px solid #ddd", minWidth: "120px" }}>
                    Created
                  </th>
                  <th style={{ padding: "1rem", textAlign: "left", borderBottom: "1px solid #ddd", minWidth: "200px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "1rem" }}>
                      <div>
                        <strong>{article.title}</strong>
                        {article.excerpt && (
                          <div style={{ fontSize: "0.875rem", color: "#666", marginTop: "0.25rem" }}>
                            {article.excerpt.substring(0, 80)}...
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          backgroundColor: "#e9ecef",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {article.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          backgroundColor: article.status === "published" ? "#d4edda" : "#fff3cd",
                          color: article.status === "published" ? "#155724" : "#856404",
                          borderRadius: "4px",
                          fontSize: "0.875rem",
                        }}
                      >
                        {article.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.875rem", color: "#666" }}>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <button
                          onClick={() => window.open(`/best-practices/${article.slug}`, "_blank")}
                          style={{
                            padding: "0.25rem 0.5rem",
                            backgroundColor: "#17a2b8",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleToggleStatus(article.id)}
                          style={{
                            padding: "0.25rem 0.5rem",
                            backgroundColor: article.status === "published" ? "#ffc107" : "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                          }}
                        >
                          {article.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          style={{
                            padding: "0.25rem 0.5rem",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
