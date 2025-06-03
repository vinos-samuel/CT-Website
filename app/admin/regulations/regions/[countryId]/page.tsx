"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Spinner } from "@/components/ui/spinner"
import { Trash2, PlusCircle, FileText } from "lucide-react"
import Link from "next/link"

export default function RegionsPage({ params }: { params: { countryId: string } }) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [regions, setRegions] = useState<any[]>([])
  const [country, setCountry] = useState<any>(null)
  const [newRegionName, setNewRegionName] = useState("")

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

        // Fetch regions
        const { data: regionsData, error: regionsError } = await supabase
          .from("country_regions")
          .select("*")
          .eq("country_id", params.countryId)
          .order("name")

        if (regionsError) throw regionsError
        setRegions(regionsData || [])
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

  const handleAddRegion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRegionName.trim()) return

    setSaving(true)
    try {
      const { data, error } = await supabase
        .from("country_regions")
        .insert([
          {
            country_id: params.countryId,
            name: newRegionName.trim(),
          },
        ])
        .select()

      if (error) throw error

      setRegions([...regions, data[0]])
      setNewRegionName("")
      toast({
        title: "Region added",
        description: `${newRegionName} has been added successfully.`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add region",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteRegion = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This will also delete all associated regulations.`)) {
      return
    }

    try {
      const { error } = await supabase.from("country_regions").delete().eq("id", id)

      if (error) throw error

      setRegions(regions.filter((region) => region.id !== id))
      toast({
        title: "Region deleted",
        description: `${name} has been deleted successfully.`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete region",
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
          <h1 className="text-3xl font-bold">{country?.name} Regions</h1>
          <p className="text-gray-500">Manage regions for {country?.name}</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          Back to Countries
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Region</CardTitle>
          <CardDescription>Create a new region for {country?.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddRegion} className="flex items-end gap-4">
            <div className="flex-1">
              <Label htmlFor="regionName">Region Name</Label>
              <Input
                id="regionName"
                value={newRegionName}
                onChange={(e) => setNewRegionName(e.target.value)}
                placeholder="e.g. Tokyo"
                required
              />
            </div>
            <Button type="submit" disabled={saving}>
              <PlusCircle className="mr-2 h-4 w-4" />
              {saving ? "Adding..." : "Add Region"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region) => (
          <Card key={region.id}>
            <CardHeader>
              <CardTitle>{region.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/regulations/regulations/${region.id}`}>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Regulations
                  </Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteRegion(region.id, region.name)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {regions.length === 0 && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No regions found. Add your first region to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}
