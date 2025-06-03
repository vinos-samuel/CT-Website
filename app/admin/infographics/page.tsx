"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { RequireAuth } from "@/components/auth/require-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"
import type { Infographic, Category } from "@/lib/supabase/database.types"
import { ChevronDown, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { format } from "date-fns"

export default function InfographicsPage() {
  const [infographics, setInfographics] = useState<Infographic[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [infographicToDelete, setInfographicToDelete] = useState<string | null>(null)

  const router = useRouter()
  const { user } = useAuth()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    async function fetchInfographics() {
      setLoading(true)
      try {
        // Fetch categories first
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories")
          .select("*")
          .order("name")

        if (categoriesError) throw categoriesError
        setCategories(categoriesData || [])

        // Then fetch infographics with filters if any
        let query = supabase
          .from("infographics")
          .select(`
            *,
            categories(name)
          `)
          .order("updated_at", { ascending: false })

        if (searchQuery) {
          query = query.ilike("title", `%${searchQuery}%`)
        }

        if (selectedCategory) {
          query = query.eq("category_id", selectedCategory)
        }

        const { data, error } = await query

        if (error) throw error
        setInfographics(data || [])
      } catch (error) {
        console.error("Error fetching infographics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInfographics()
  }, [supabase, searchQuery, selectedCategory])

  const handleCreateInfographic = () => {
    router.push("/admin/infographics/new")
  }

  const handleEditInfographic = (id: string) => {
    router.push(`/admin/infographics/edit/${id}`)
  }

  const handleViewInfographic = (slug: string) => {
    router.push(`/infographics/${slug}`)
  }

  const handleDeleteClick = (id: string) => {
    setInfographicToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!infographicToDelete) return

    try {
      const { error } = await supabase.from("infographics").delete().eq("id", infographicToDelete)

      if (error) throw error

      // Remove the deleted infographic from the state
      setInfographics(infographics.filter((infographic) => infographic.id !== infographicToDelete))
    } catch (error) {
      console.error("Error deleting infographic:", error)
    } finally {
      setDeleteDialogOpen(false)
      setInfographicToDelete(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "archived":
        return <Badge variant="secondary">Archived</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    return format(new Date(dateString), "MMM d, yyyy")
  }

  return (
    <RequireAuth>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Infographics</h1>
            <p className="text-muted-foreground">Manage your infographics</p>
          </div>
          <Button onClick={handleCreateInfographic}>
            <Plus className="mr-2 h-4 w-4" />
            New Infographic
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Infographics</CardTitle>
            <CardDescription>
              A list of all your infographics. You can create, edit, and delete infographics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search infographics..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter by Category
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => setSelectedCategory(null)}
                    className={!selectedCategory ? "bg-accent" : ""}
                  >
                    All Categories
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={selectedCategory === category.id ? "bg-accent" : ""}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : infographics.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No infographics found</p>
                <Button variant="outline" className="mt-4" onClick={handleCreateInfographic}>
                  Create your first infographic
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Preview</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {infographics.map((infographic) => (
                      <TableRow key={infographic.id}>
                        <TableCell>
                          <div className="w-16 h-16 relative rounded overflow-hidden">
                            <img
                              src={infographic.image_url || "/placeholder.svg"}
                              alt={infographic.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{infographic.title}</TableCell>
                        <TableCell>
                          {infographic.categories ? (infographic.categories as any).name : "Uncategorized"}
                        </TableCell>
                        <TableCell>{getStatusBadge(infographic.status)}</TableCell>
                        <TableCell>{formatDate(infographic.updated_at)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditInfographic(infographic.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleViewInfographic(infographic.slug)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(infographic.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the infographic.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </RequireAuth>
  )
}
