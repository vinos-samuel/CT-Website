"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Spinner } from "@/components/ui/spinner"
import { RichTextEditor } from "@/components/rich-text-editor"
import { useToast } from "@/components/ui/use-toast"
import {
  Save,
  Eye,
  ArrowLeft,
  FileText,
  AlertTriangle,
  Users,
  Calendar,
  CheckCircle,
  BarChart3,
  Info,
  Table,
} from "lucide-react"

interface ContentSection {
  title: string
  content: string
  order: number
}

interface CountryData {
  id: string
  name: string
  slug: string
  summary: string
  content_sections: Record<string, ContentSection>
}

export default function EditCountryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const [countryData, setCountryData] = useState<CountryData>({
    id: "",
    name: "",
    slug: "",
    summary: "",
    content_sections: {
      overview: { title: "Overview", content: "", order: 1 },
      key_considerations: { title: "Key Considerations", content: "", order: 2 },
      labor_law_framework: { title: "Labor Law Framework", content: "", order: 3 },
      worker_classification: { title: "Worker Classification", content: "", order: 4 },
      recent_developments: { title: "Recent Developments", content: "", order: 5 },
      best_practices: { title: "Best Practices", content: "", order: 6 },
      monitoring_strategy: { title: "Monitoring Strategy", content: "", order: 7 },
      quick_facts: { title: "Quick Facts", content: "", order: 8 },
      comparison_data: { title: "Comparison Data", content: "", order: 9 },
    },
  })

  useEffect(() => {
    loadCountryData()
  }, [params.id])

  const loadCountryData = async () => {
    try {
      setLoading(true)

      // Mock data for now - in real implementation, this would fetch from API
      const mockData: CountryData = {
        id: params.id,
        name: getCountryName(params.id),
        slug: getCountrySlug(params.id),
        summary: `${getCountryName(params.id)} employment regulations and compliance requirements`,
        content_sections: {
          overview: {
            title: "Overview",
            content: `<p>${getCountryName(params.id)} has a comprehensive regulatory framework governing employment relationships...</p>`,
            order: 1,
          },
          key_considerations: {
            title: "Key Considerations",
            content: `<ul>
              <li>Compliance with local labor laws is mandatory</li>
              <li>Worker classification affects tax and benefit obligations</li>
              <li>Regular monitoring of regulatory changes is essential</li>
              <li>Documentation requirements vary by worker type</li>
            </ul>`,
            order: 2,
          },
          labor_law_framework: {
            title: "Labor Law Framework",
            content: `<h3>Primary Legislation</h3>
            <p>The main employment laws in ${getCountryName(params.id)} include...</p>
            <h3>Regulatory Bodies</h3>
            <p>Key regulatory authorities responsible for enforcement...</p>`,
            order: 3,
          },
          worker_classification: {
            title: "Worker Classification",
            content: `<h3>Employee vs Independent Contractor</h3>
            <p>The distinction between employees and independent contractors is crucial...</p>
            <h3>Classification Criteria</h3>
            <ul>
              <li>Control over work performance</li>
              <li>Financial arrangements</li>
              <li>Integration into business</li>
            </ul>`,
            order: 4,
          },
          recent_developments: {
            title: "Recent Developments",
            content: `<h3>2024 Updates</h3>
            <p>Recent changes to employment regulations include...</p>
            <h3>Upcoming Changes</h3>
            <p>Proposed legislation expected to take effect...</p>`,
            order: 5,
          },
          best_practices: {
            title: `Best Practices for ${getCountryName(params.id)}`,
            content: `<h3>Compliance Recommendations</h3>
            <ul>
              <li>Establish clear employment contracts</li>
              <li>Maintain accurate records</li>
              <li>Regular compliance audits</li>
              <li>Stay updated on regulatory changes</li>
            </ul>`,
            order: 6,
          },
          monitoring_strategy: {
            title: "Monitoring Strategy",
            content: `<h3>Compliance Monitoring</h3>
            <p>Effective monitoring strategies include...</p>
            <h3>Key Performance Indicators</h3>
            <ul>
              <li>Compliance audit results</li>
              <li>Worker classification accuracy</li>
              <li>Regulatory update implementation</li>
            </ul>`,
            order: 7,
          },
          quick_facts: {
            title: "Quick Facts",
            content: `<table border="1" style="width: 100%; border-collapse: collapse;">
              <tr><td><strong>Minimum Wage</strong></td><td>Varies by region</td></tr>
              <tr><td><strong>Standard Work Week</strong></td><td>40 hours</td></tr>
              <tr><td><strong>Overtime Rate</strong></td><td>1.5x regular rate</td></tr>
              <tr><td><strong>Annual Leave</strong></td><td>Minimum 4 weeks</td></tr>
            </table>`,
            order: 8,
          },
          comparison_data: {
            title: "Comparison Data",
            content: `<p>This section contains data used for cross-country comparisons...</p>
            <h3>Key Metrics</h3>
            <ul>
              <li>Regulatory complexity score</li>
              <li>Compliance cost index</li>
              <li>Processing time for permits</li>
            </ul>`,
            order: 9,
          },
        },
      }

      setCountryData(mockData)
    } catch (error) {
      console.error("Error loading country data:", error)
      toast({
        title: "Error",
        description: "Failed to load country data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getCountryName = (id: string): string => {
    const countryMap: Record<string, string> = {
      "1": "Singapore",
      "2": "Australia",
      "3": "Japan",
      "4": "China",
      "5": "India",
      "6": "South Korea",
      "7": "Taiwan",
      "8": "New Zealand",
    }
    return countryMap[id] || "Unknown Country"
  }

  const getCountrySlug = (id: string): string => {
    const slugMap: Record<string, string> = {
      "1": "singapore",
      "2": "australia",
      "3": "japan",
      "4": "china",
      "5": "india",
      "6": "south-korea",
      "7": "taiwan",
      "8": "new-zealand",
    }
    return slugMap[id] || "unknown"
  }

  const handleBasicInfoChange = (field: string, value: string) => {
    setCountryData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSectionContentChange = (sectionKey: string, content: string) => {
    setCountryData((prev) => ({
      ...prev,
      content_sections: {
        ...prev.content_sections,
        [sectionKey]: {
          ...prev.content_sections[sectionKey],
          content,
        },
      },
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      // In real implementation, this would save to API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Changes Saved",
        description: `${countryData.name} regulations have been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Save Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const getSectionIcon = (sectionKey: string) => {
    const iconMap: Record<string, any> = {
      overview: Info,
      key_considerations: AlertTriangle,
      labor_law_framework: FileText,
      worker_classification: Users,
      recent_developments: Calendar,
      best_practices: CheckCircle,
      monitoring_strategy: BarChart3,
      quick_facts: Table,
      comparison_data: Table,
    }
    const IconComponent = iconMap[sectionKey] || FileText
    return <IconComponent className="h-4 w-4" />
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Loading country data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit {countryData.name} Regulations</h1>
            <p className="text-gray-600">Manage all content sections for this country</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open(`/regulations/${countryData.slug}`, "_blank")}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Public Page
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Basic Info Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Country name, URL slug, and summary</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Country Name</Label>
              <Input
                id="name"
                value={countryData.name}
                onChange={(e) => handleBasicInfoChange("name", e.target.value)}
                placeholder="e.g. New Zealand"
              />
            </div>
            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={countryData.slug}
                onChange={(e) => handleBasicInfoChange("slug", e.target.value)}
                placeholder="e.g. new-zealand"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={countryData.summary}
              onChange={(e) => handleBasicInfoChange("summary", e.target.value)}
              placeholder="Brief overview of the country's regulations..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Sections */}
      <Card>
        <CardHeader>
          <CardTitle>Content Sections</CardTitle>
          <CardDescription>Edit all sections of the regulations page</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-1 h-auto p-1">
              {Object.entries(countryData.content_sections).map(([key, section]) => (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2 text-xs p-2 h-auto flex-col">
                  {getSectionIcon(key)}
                  <span className="hidden sm:inline">{section.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(countryData.content_sections).map(([key, section]) => (
              <TabsContent key={key} value={key} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getSectionIcon(key)}
                      {section.title}
                    </CardTitle>
                    <CardDescription>
                      Edit the content for this section. Changes will be reflected on the public page.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RichTextEditor
                      value={section.content}
                      onChange={(content) => handleSectionContentChange(key, content)}
                      placeholder={`Enter content for ${section.title}...`}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Saving Changes..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  )
}
