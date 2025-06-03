"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { Edit, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

export default function RegulationsPage({ params }: { params: { regionId: string } }) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [regulations, setRegulations] = useState<any[]>([])
  const [region, setRegion] = useState<any>(null)
  const [country, setCountry] = useState<any>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    status: "Compliant",
    last_updated: format(new Date(), "yyyy-MM-dd"),
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch region
        const { data: regionData, error: regionError } = await supabase
          .from("country_regions")
          .select("*, countries(*)")
          .eq("id", params.regionId)
          .single()

        if (regionError) throw regionError
        setRegion(regionData)
        setCountry(regionData.countries)

        // Fetch regulations
        const { data: regulationsData, error: regulationsError } = await supabase
          .from("regulations")
          .select("*")
          .eq("region_id", params.regionId)
          .order("title")

        if (regulationsError) throw regulationsError
        setRegulations(regulationsData || [])
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
  }, [params.regionId, supabase])

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      details: "",
      status: "Compliant",
      last_updated: format(new Date(), "yyyy-MM-dd"),
    })
    setEditingId(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleAddRegulation = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingId) {
        // Update existing regulation
        const { error } = await supabase
          .from("regulations")
          .update({
            title: formData.title,
            description: formData.description,
            details: formData.details,
            status: formData.status,
            last_updated: formData.last_updated,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingId)

        if (error) throw error

        setRegulations(regulations.map((reg) => (reg.id === editingId ? { ...reg, ...formData } : reg)))

        toast({
          title: "Regulation updated",
          description: `${formData.title} has been updated successfully.`,
        })
      } else {
        // Add new regulation
        const { data, error } = await supabase
          .from("regulations")
          .insert([
            {
              region_id: params.regionId,
              title: formData.title,
              description: formData.description,
              details: formData.details,
              status: formData.status,
              last_updated: formData.last_updated,
            },
          ])
          .select()

        if (error) throw error

        setRegulations([...regulations, data[0]])
        toast({
          title: "Regulation added",
          description: `${formData.title} has been added successfully.`,
        })
      }

      resetForm()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save regulation",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (regulation: any) => {
    setFormData({
      title: regulation.title,
      description: regulation.description,
      details: regulation.details,
      status: regulation.status,
      last_updated: format(new Date(regulation.last_updated), "yyyy-MM-dd"),
    })
    setEditingId(regulation.id)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      const { error } = await supabase.from("regulations").delete().eq("id", id)

      if (error) throw error

      setRegulations(regulations.filter((reg) => reg.id !== id))
      toast({
        title: "Regulation deleted",
        description: `${title} has been deleted successfully.`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete regulation",
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
          <h1 className="text-3xl font-bold">Regulations for {region?.name}</h1>
          <p className="text-gray-500">Country: {country?.name}</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back to Regions
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Regulation" : "Add New Regulation"}</CardTitle>
          <CardDescription>
            {editingId ? "Update existing regulation" : `Create a new regulation for ${region?.name}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddRegulation} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Employment Law"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the regulation..."
                required
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Detailed information about the regulation..."
                required
                rows={5}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Compliant">Compliant</SelectItem>
                    <SelectItem value="Review Needed">Review Needed</SelectItem>
                    <SelectItem value="Attention Required">Attention Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_updated">Last Updated</Label>
                <Input
                  id="last_updated"
                  name="last_updated"
                  type="date"
                  value={formData.last_updated}
                  onChange={handleChange}
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
                {saving ? "Saving..." : editingId ? "Update Regulation" : "Add Regulation"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {regulations.map((regulation) => (
          <Card key={regulation.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{regulation.title}</CardTitle>
                  <CardDescription>Last updated: {format(new Date(regulation.last_updated), "PPP")}</CardDescription>
                </div>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    regulation.status === "Compliant"
                      ? "bg-green-100 text-green-800"
                      : regulation.status === "Review Needed"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {regulation.status}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-2">{regulation.description}</p>
              <p className="text-sm text-gray-600 whitespace-pre-line">{regulation.details}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(regulation)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(regulation.id, regulation.title)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}

        {regulations.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No regulations found. Add your first regulation to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
