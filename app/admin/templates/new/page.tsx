"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RequireAuth } from "@/components/auth/require-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, FileUp, Loader2 } from "lucide-react"

export default function NewTemplatePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [format, setFormat] = useState("DOCX")
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !category || !file) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields and upload a file.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real implementation, you would:
      // 1. Upload the file to storage
      // 2. Create a database record for the template

      // For now, we'll just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Template created",
        description: "Your template has been successfully created.",
      })

      router.push("/admin/templates")
    } catch (error) {
      console.error("Error creating template:", error)
      toast({
        title: "Error",
        description: "Failed to create template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RequireAuth>
      <div className="container py-8">
        <div className="mb-8">
          <Button variant="outline" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add New Template</h1>
          <p className="text-muted-foreground">Create a new downloadable template for your users</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
              <CardDescription>Provide information about your template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Independent Contractor Agreement"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief description of this template"
                  required
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contracts">Contracts & Agreements</SelectItem>
                      <SelectItem value="policies">Policies & Procedures</SelectItem>
                      <SelectItem value="compliance">Compliance & Auditing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select value={format} onValueChange={setFormat} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DOCX">DOCX</SelectItem>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="XLSX">XLSX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="max-w-sm"
                    accept=".docx,.pdf,.xlsx"
                  />
                  {file && (
                    <p className="text-sm mt-2">
                      Selected file: {file.name} ({(file.size / 1024).toFixed(1)} KB)
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/admin/templates")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Template"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </RequireAuth>
  )
}
