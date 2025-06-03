"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { RequireAuth } from "@/components/auth/require-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"
import type { Infographic, Category } from "@/lib/supabase/database.types"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function EditInfographicPage({ params }: { params: { id: string } }) {
  const [infographic, setInfographic] = useState<Infographic | null>(null)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])
  const [status, setStatus] = useState<"draft" | "published" | "archived">("draft")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const router = useRouter()
  const { user } = useAuth()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // Fetch infographic
        const { data: infographicData, error: infographicError } = await supabase
          .from("infographics")
          .select("*")
          .eq("id", params.id)
          .single()

        if (infographicError) throw infographicError

        if (infographicData) {
          setInfographic(infographicData)
          setTitle(infographicData.title)
          setSlug(infographicData.slug)
          setDescription(infographicData.description || "")
          setImageUrl(infographicData.image_url)
          setCategoryId(infographicData.category_id || "")
          setStatus(infographicData.status as "draft" | "published" | "archived")
          setPreviewImage(infographicData.image_url)
        }

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("*")
          .order("name")

        if (categoriesError) throw categoriesError
        setCategories(categoriesData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase, params.id])

  // Update preview when image URL changes
  useEffect(() => {
    if (imageUrl) {
      setPreviewImage(imageUrl)
    } else {
      setPreviewImage(null)
    }
  }, [imageUrl])

  const handleSave = async (publishStatus?: "draft" | "published" | "archived") => {
    if (!title || !imageUrl) return

    setSaving(true)
    try {
      const updatedInfographic = {
        title,
        slug,
        description: description || null,
        image_url: imageUrl,
        category_id: categoryId || null,
        status: publishStatus || status,
        updated_at: new Date().toISOString(),
        published_at:
          publishStatus === "published" && status !== "published"
            ? new Date().toISOString()
            : infographic?.published_at,
      }

      const { error } = await supabase.from("infographics").update(updatedInfographic).eq("id", params.id)

      if (error) throw error

      router.push("/admin/infographics")
    } catch (error) {
      console.error("Error updating infographic:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <RequireAuth>
        <div className="container py-8 flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </RequireAuth>
    )
  }

  return (
    <RequireAuth>
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Infographic</h1>
            <p className="text-muted-foreground">Edit your infographic</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Infographic Details</CardTitle>
                <CardDescription>Edit the details for your infographic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Infographic title"
                      className="mb-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="infographic-slug"
                      className="mb-2"
                    />
                    <p className="text-xs text-muted-foreground">This will be used in the URL: /infographics/{slug}</p>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of the infographic"
                      className="mb-2"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/infographic.jpg"
                      className="mb-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the URL of your infographic image. For best results, use a high-resolution image.
                    </p>
                  </div>
                  {previewImage && (
                    <div className="mt-4">
                      <Label>Preview</Label>
                      <div className="mt-2 border rounded-md overflow-hidden">
                        <img src={previewImage || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure infographic settings and metadata</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={(value: any) => setStatus(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handleSave("draft")} disabled={saving}>
                  {saving && status === "draft" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save as Draft
                </Button>
                <Button onClick={() => handleSave("published")} disabled={saving}>
                  {saving && status === "published" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Publish
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
