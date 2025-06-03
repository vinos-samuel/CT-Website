"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { RequireAuth } from "@/components/auth/require-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Download, Edit, Eye, FileText, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface Template {
  id: string
  title: string
  description: string
  file_url: string
  format: string
  size: string
  downloads: number
  category_id: string
  status: string
  created_at: string
  updated_at: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchTemplates()
  }, [])

  async function fetchTemplates() {
    setLoading(true)
    try {
      // For now, we'll use mock data since we haven't created the templates table yet
      // In a real implementation, you would fetch from the database
      const mockTemplates = [
        {
          id: "1",
          title: "Independent Contractor Agreement",
          description: "A comprehensive agreement template for engaging independent contractors.",
          file_url: "/templates/independent-contractor-agreement.docx",
          format: "DOCX",
          size: "245 KB",
          downloads: 1245,
          category_id: "contracts",
          status: "published",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Statement of Work (SOW) Template",
          description: "A detailed SOW template for project-based engagements.",
          file_url: "/templates/statement-of-work.docx",
          format: "DOCX",
          size: "320 KB",
          downloads: 987,
          category_id: "contracts",
          status: "published",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Contingent Worker Policy",
          description: "A comprehensive policy for managing contingent workers.",
          file_url: "/templates/contingent-worker-policy.pdf",
          format: "PDF",
          size: "420 KB",
          downloads: 1532,
          category_id: "policies",
          status: "published",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]

      setTemplates(mockTemplates)
    } catch (error) {
      console.error("Error fetching templates:", error)
      toast({
        title: "Error",
        description: "Failed to load templates. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    // In a real implementation, you would delete from the database
    setTemplates(templates.filter((template) => template.id !== id))
    toast({
      title: "Template deleted",
      description: "The template has been successfully deleted.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
  }

  return (
    <RequireAuth>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
            <p className="text-muted-foreground">Manage your downloadable templates and resources</p>
          </div>
          <Button onClick={() => router.push("/admin/templates/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Template
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : templates.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                You haven't created any templates yet. Add your first template to get started.
              </p>
              <Button onClick={() => router.push("/admin/templates/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Template
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{template.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{template.format}</span>
                          <span>•</span>
                          <span>{template.size}</span>
                          <span>•</span>
                          <span>{template.downloads} downloads</span>
                          <span>•</span>
                          <span>Updated {formatDate(template.updated_at)}</span>
                          <span>•</span>
                          <span>{getStatusBadge(template.status)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/templates/edit/${template.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={template.file_url} download>
                          <Download className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/templates#${template.category_id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(template.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </RequireAuth>
  )
}
