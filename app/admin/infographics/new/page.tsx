"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { RequireAuth } from "@/components/auth/require-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"
import type { Category } from "@/lib/supabase/database.types"
import { ArrowLeft, ExternalLink, Loader2, Upload } from "lucide-react"
import { slugify } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function NewInfographicPage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const { user } = useAuth()
  const supabase = createClientComponentClient<Database>()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true)
      try {
        const { data, error } = await supabase.from("categories").select("*").order("name")

        if (error) throw error
        setCategories(data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [supabase])

  useEffect(() => {
    // Auto-generate slug from title
    if (title) {
      setSlug(slugify(title))
    }
  }, [title])

  // Update preview when image URL changes or file is selected
  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else if (imageUrl) {
      setPreviewImage(imageUrl)
    } else {
      setPreviewImage(null)
    }
  }, [imageUrl, file])

  const handleSave = async (publishStatus: "draft" | "published" = "draft") => {
    if (!title) {
      toast({
        title: "Missing title",
        description: "Please provide a title for the infographic",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      let finalImageUrl = imageUrl

      // If a file is selected, upload it
      if (file) {
        setIsUploading(true)

        try {
          // Create a unique file path
          const fileExt = file.name.split(".").pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
          const filePath = `infographics/${fileName}`

          // Upload the file to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("public")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
              onUploadProgress: (progress) => {
                setUploadProgress((progress.loaded / progress.total) * 100)
              },
            })

          if (uploadError) {
            console.error("Upload error details:", uploadError)
            throw new Error(`Upload failed: ${uploadError.message}`)
          }

          // Get the public URL
          const { data: urlData } = supabase.storage.from("public").getPublicUrl(filePath)

          finalImageUrl = urlData.publicUrl
        } catch (uploadErr: any) {
          console.error("Detailed upload error:", uploadErr)
          toast({
            title: "Upload failed",
            description: uploadErr.message || "Failed to upload image. Please try using an image URL instead.",
            variant: "destructive",
          })
          setIsUploading(false)
          setSaving(false)
          return
        }

        setIsUploading(false)
      }

      if (!finalImageUrl) {
        toast({
          title: "Missing image",
          description: "Please provide an image URL or upload a file",
          variant: "destructive",
        })
        setSaving(false)
        return
      }

      const newInfographic = {
        title,
        slug,
        description: description || null,
        image_url: finalImageUrl,
        category_id: categoryId || null,
        status: publishStatus,
        published_at: publishStatus === "published" ? new Date().toISOString() : null,
      }

      const { data, error } = await supabase.from("infographics").insert(newInfographic).select()

      if (error) throw error

      toast({
        title: "Success!",
        description: `Infographic ${publishStatus === "published" ? "published" : "saved as draft"} successfully`,
      })

      router.push("/admin/infographics")
    } catch (error: any) {
      console.error("Error saving infographic:", error)
      toast({
        title: "Error saving infographic",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
      setIsUploading(false)
    }
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
            <h1 className="text-3xl font-bold tracking-tight">New Infographic</h1>
            <p className="text-muted-foreground">Create a new infographic</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Infographic Details</CardTitle>
                <CardDescription>Enter the details for your infographic</CardDescription>
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
                    <Label>Infographic Image</Label>
                    <Tabs defaultValue="upload" className="mt-2">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload File</TabsTrigger>
                        <TabsTrigger value="url">Image URL</TabsTrigger>
                      </TabsList>
                      <TabsContent value="upload" className="space-y-4">
                        <div className="mt-2">
                          <div className="flex items-center justify-center w-full">
                            <label
                              htmlFor="file-upload"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 10MB)</p>
                              </div>
                              <input
                                id="file-upload"
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const selectedFile = e.target.files?.[0] || null
                                  setFile(selectedFile)
                                }}
                              />
                            </label>
                          </div>
                          {file && (
                            <div className="mt-2 text-sm">
                              Selected file: <span className="font-medium">{file.name}</span> (
                              {(file.size / 1024 / 1024).toFixed(2)} MB)
                            </div>
                          )}
                          {isUploading && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                              <div
                                className="bg-primary h-2.5 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                      <TabsContent value="url">
                        <div className="flex gap-2">
                          <Input
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/infographic.jpg"
                            className="mb-2 flex-1"
                          />
                          {imageUrl && (
                            <Button
                              variant="outline"
                              size="icon"
                              type="button"
                              onClick={() => window.open(imageUrl, "_blank")}
                              className="mb-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Enter the URL of your infographic image. For best results, use a high-resolution image.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </div>
                  {previewImage && (
                    <div className="mt-4">
                      <Label>Preview</Label>
                      <div className="mt-2 border rounded-md overflow-hidden">
                        <img
                          src={previewImage || "/placeholder.svg"}
                          alt="Preview"
                          className="max-w-full h-auto"
                          onError={() => {
                            toast({
                              title: "Image preview failed",
                              description: "The image URL may be invalid or inaccessible",
                              variant: "destructive",
                            })
                            setPreviewImage(null)
                          }}
                        />
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
                        {categories
                          .filter(
                            (category) =>
                              category.name !== "Hiring & Onboarding" &&
                              category.name !== "Management & Retention" &&
                              category.name !== "Compliance & Risk Management",
                          )
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-2">
                      Select a category that matches one of the sections in the Best Practices page.
                    </p>
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
