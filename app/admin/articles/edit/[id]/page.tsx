"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"

// Mock article data
const mockArticle = {
  id: "1",
  title: "Best Practices for Contractor Onboarding",
  slug: "contractor-onboarding-best-practices",
  excerpt: "Learn the essential steps for successfully onboarding contractors to your organization.",
  content:
    "Contractor onboarding is a critical process that sets the foundation for successful working relationships...",
  category: "hiring-onboarding",
  status: "published",
}

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("draft")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // Simulate loading article data
    setTimeout(() => {
      setTitle(mockArticle.title)
      setSlug(mockArticle.slug)
      setExcerpt(mockArticle.excerpt)
      setContent(mockArticle.content)
      setCategory(mockArticle.category)
      setStatus(mockArticle.status)
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleSave = async (publishStatus: "draft" | "published" = status as any) => {
    if (!title || !content) {
      alert("Please fill in title and content")
      return
    }

    setSaving(true)

    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert(`Article ${publishStatus === "published" ? "published" : "saved"} successfully!`)
    router.push("/admin/articles")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
          <p className="text-muted-foreground">Edit your article content and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Edit your article content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Article title"
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="article-slug" />
                <p className="text-xs text-muted-foreground mt-1">
                  This will be used in the URL: /best-practices/{slug}
                </p>
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of the article"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here..."
                  rows={15}
                  className="min-h-[400px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure article settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hiring-onboarding">Hiring & Onboarding</SelectItem>
                    <SelectItem value="management-retention">Management & Retention</SelectItem>
                    <SelectItem value="compliance-risk">Compliance & Risk Management</SelectItem>
                    <SelectItem value="financial-management">Financial Management</SelectItem>
                    <SelectItem value="legal-contracts">Legal & Contracts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Changes
              </Button>
              <Button onClick={() => handleSave("published")} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Publish
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
