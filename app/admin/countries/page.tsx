"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Globe, Filter } from "lucide-react"
import Link from "next/link"
import type { Country } from "@/lib/database/types"

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    loadCountries()
  }, [searchTerm, statusFilter])

  const loadCountries = async () => {
    try {
      setLoading(true)
      // In real implementation, this would be an API call
      const mockCountries: Country[] = [
        {
          id: "1",
          name: "Singapore",
          slug: "singapore",
          summary: "Comprehensive employment regulations for Singapore",
          key_considerations: ["Work permits", "CPF contributions", "Employment Act"],
          metadata: {},
          status: "active",
          sort_order: 1,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          created_by: "admin-id",
        },
        {
          id: "2",
          name: "Australia",
          slug: "australia",
          summary: "Employment and contractor regulations for Australia",
          key_considerations: ["Fair Work Act", "Superannuation", "Visa requirements"],
          metadata: {},
          status: "active",
          sort_order: 2,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
          created_by: "admin-id",
        },
      ]
      setCountries(mockCountries)
    } catch (error) {
      console.error("Failed to load countries:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this country?")) {
      try {
        // API call to delete country
        await fetch(`/api/admin/countries/${id}`, { method: "DELETE" })
        loadCountries()
      } catch (error) {
        console.error("Failed to delete country:", error)
      }
    }
  }

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || country.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Countries Management</h1>
          <p className="text-gray-600 mt-1">Manage countries and their regulations</p>
        </div>
        <Button asChild>
          <Link href="/admin/countries/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Country
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Inactive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Countries Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Countries ({filteredCountries.length})
          </CardTitle>
          <CardDescription>Manage country information and access regulations</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Summary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCountries.map((country) => (
                  <TableRow key={country.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{country.name}</div>
                        <div className="text-sm text-gray-500">/{country.slug}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-md">
                        <p className="text-sm truncate">{country.summary}</p>
                        {country.key_considerations && country.key_considerations.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {country.key_considerations.slice(0, 2).map((consideration, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {consideration}
                              </Badge>
                            ))}
                            {country.key_considerations.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{country.key_considerations.length - 2} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={country.status === "active" ? "default" : "secondary"}
                        className={country.status === "active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {country.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">{new Date(country.updated_at).toLocaleDateString()}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/regulations/${country.slug}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Public Page
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/countries/edit/${country.id}`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/regulations/regions/${country.id}`}>
                              <Globe className="h-4 w-4 mr-2" />
                              Manage Regions
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(country.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
