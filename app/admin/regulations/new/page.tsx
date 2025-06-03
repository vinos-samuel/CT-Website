"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function NewCountryPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    summary: "",
    key_considerations: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    setFormData((prev) => ({ ...prev, slug: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from("countries")
        .insert([
          {
            name: formData.name,
            slug: formData.slug,
            summary: formData.summary,
            key_considerations: [],
          },
        ])
        .select()

      if (error) {
        throw error
      }

      toast({
        title: "Country created",
        description: `${formData.name} has been added successfully.`,
      })

      router.push("/admin/regulations")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create country",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Country</CardTitle>
          <CardDescription>Create a new country for regulations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Country Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Japan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleSlugChange}
                required
                placeholder="e.g. japan"
              />
              <p className="text-sm text-gray-500">
                This will be used in the URL: /regulations/{formData.slug || "example"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                placeholder="Provide a brief overview of the country's regulations..."
                rows={5}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Country"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
