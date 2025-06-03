"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ResourcesPage({ params }: { params: { countryId: string } }) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [resources, setResources] = useState<any[]>([])
  const [country, setCountry] = useState<any>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    type: "PDF",
    size: "1MB",
    url: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch country
        const { data: countryData, error: countryError } = await supabase
          .from("countries")
          .select("*")
          .eq("id", params.countryId)
          .single()

        if (countryError) throw countryError
        setCountry(countryData)

        // Fetch resources
        const { data: resourcesData, error: resourcesError } = await supabase
          .from("country_resources")
          .select("*")
          .eq("country_id", params.countryId)
          .order("title")

        if (resourcesError) throw resourcesError
        setResources(resourcesData || [])
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.countryId, supabase])

  const resetForm = () => {
    setFormData({
      title: "",
      type: "PDF",
      size: "1MB",
      url: "",
    })
    setEditingId(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingId) {
        // Update existing resource
        const { error } = await supabase
          .from("country_resources")
          .update({
            title: formData.title,
            type: formData.type,
            size: formData.size,
            url: formData.url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId)

        if (error) throw error

        setResources(resources.map((res) => (res.id === editingId ? { ...res, ...formData } : res)))

        toast({
          title: "Resource updated",
          description: `${formData.title} has been updated successfully.`,
        })
      } else {
        // Add new resource
        const { data, error } = await supabase
          .from("country_resources")
          .insert([
            {
              country_id: params.countryId,
              title: formData.title,
              type: formData.type,
              size: formData.size,
              url: formData.url,
            },
          ])
          .select()

        if (error) throw error

        setResources([...resources, data[0]])
        toast({
          title: "Resource added",
          description: `${formData.title} has been added successfully.`,
        })
      }

      resetForm()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save resource",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (resource: any) => {
    setFormData({
      title: resource.title,
      type: resource.type,
      size: resource.size,
      url: resource.url,
    })
    setEditingId(resource.id)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      const { error } = await supabase.from("country_resources").delete().eq("id", id)

      if (error) throw error

      setResources(resources.filter((res) => res.id !== id))
      toast({
        title: "Resource deleted",
        description: `${title} has been deleted successfully.`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete resource",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Resources for {country?.name}</h1>
          <p className="text-gray-500">Manage downloadable resources</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back to Countries
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Resource" : "Add New Resource"}</CardTitle>
          <CardDescription>
            {editingId ? "Update existing resource" : `Add a new downloadable resource for ${country?.name}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddResource} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Employment Law Guide"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={handleTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="DOCX">DOCX</SelectItem>
                    <SelectItem value="XLSX">XLSX</SelectItem>
                    <SelectItem value="PPTX">PPTX</SelectItem>
                    <SelectItem value="ZIP">ZIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. 1.2MB"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com/file.pdf"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm} disabled={saving}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Resource" : "Add Resource"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
              <CardDescription>
                {resource.type} • {resource.size}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Resource
              </a>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(resource)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(resource.id, resource.title)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}

        {resources.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No resources found. Add your first resource to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
