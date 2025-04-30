import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, Download, FileText, Filter, Search } from "lucide-react"
import Link from "next/link"

// Mock data for templates
const categories = [
  {
    id: "contracts",
    name: "Contracts & Agreements",
    description: "Standardized contracts and agreements for contingent workforce management",
    templates: [
      {
        id: "independent-contractor",
        title: "Independent Contractor Agreement",
        description:
          "A comprehensive agreement template for engaging independent contractors while minimizing misclassification risks.",
        format: "DOCX",
        size: "245 KB",
        downloads: 1245,
        lastUpdated: "December 1, 2023",
      },
      {
        id: "statement-of-work",
        title: "Statement of Work (SOW) Template",
        description: "A detailed SOW template for project-based engagements with clear deliverables and milestones.",
        format: "DOCX",
        size: "320 KB",
        downloads: 987,
        lastUpdated: "November 15, 2023",
      },
      {
        id: "confidentiality-agreement",
        title: "Confidentiality & IP Agreement",
        description:
          "Protect your intellectual property and confidential information when working with contingent workers.",
        format: "DOCX",
        size: "198 KB",
        downloads: 756,
        lastUpdated: "October 28, 2023",
      },
      {
        id: "consulting-agreement",
        title: "Consulting Services Agreement",
        description: "A template for engaging consultants with clear terms, scope, and payment structures.",
        format: "DOCX",
        size: "275 KB",
        downloads: 623,
        lastUpdated: "November 5, 2023",
      },
    ],
  },
  {
    id: "policies",
    name: "Policies & Procedures",
    description: "HR policies and procedures for managing contingent workers",
    templates: [
      {
        id: "contingent-worker-policy",
        title: "Contingent Worker Policy",
        description:
          "A comprehensive policy outlining the engagement and management of all types of contingent workers.",
        format: "PDF",
        size: "420 KB",
        downloads: 1532,
        lastUpdated: "December 5, 2023",
      },
      {
        id: "onboarding-checklist",
        title: "Contingent Worker Onboarding Checklist",
        description:
          "A step-by-step checklist to ensure proper onboarding of contingent workers while maintaining compliance.",
        format: "XLSX",
        size: "185 KB",
        downloads: 1089,
        lastUpdated: "November 20, 2023",
      },
      {
        id: "offboarding-procedure",
        title: "Contingent Worker Offboarding Procedure",
        description:
          "Ensure a smooth transition when contingent engagements end, including access revocation and knowledge transfer.",
        format: "PDF",
        size: "310 KB",
        downloads: 876,
        lastUpdated: "October 15, 2023",
      },
      {
        id: "remote-work-policy",
        title: "Remote Work Policy for Contingent Workers",
        description:
          "Guidelines for managing remote contingent workers, including communication, security, and performance expectations.",
        format: "PDF",
        size: "290 KB",
        downloads: 745,
        lastUpdated: "November 10, 2023",
      },
    ],
  },
  {
    id: "compliance",
    name: "Compliance & Auditing",
    description: "Tools for ensuring compliance and conducting audits",
    templates: [
      {
        id: "classification-checklist",
        title: "Worker Classification Checklist",
        description:
          "A comprehensive checklist to help determine proper worker classification across different jurisdictions.",
        format: "PDF",
        size: "350 KB",
        downloads: 1876,
        lastUpdated: "December 3, 2023",
      },
      {
        id: "audit-template",
        title: "Contingent Workforce Audit Template",
        description: "A structured template for conducting internal audits of your contingent workforce program.",
        format: "XLSX",
        size: "420 KB",
        downloads: 1245,
        lastUpdated: "November 25, 2023",
      },
      {
        id: "risk-assessment",
        title: "Contingent Workforce Risk Assessment Tool",
        description:
          "Identify and evaluate potential risks in your contingent workforce program with this comprehensive assessment tool.",
        format: "XLSX",
        size: "375 KB",
        downloads: 932,
        lastUpdated: "October 30, 2023",
      },
      {
        id: "compliance-tracker",
        title: "Global Compliance Tracker",
        description:
          "Track compliance requirements across multiple countries with this easy-to-use spreadsheet template.",
        format: "XLSX",
        size: "520 KB",
        downloads: 1087,
        lastUpdated: "November 15, 2023",
      },
    ],
  },
]

export default function TemplatesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Downloadable Templates</h1>
          <p className="text-muted-foreground max-w-3xl">
            Access our library of professionally crafted templates and resources to streamline your contingent workforce
            management. All templates are regularly updated to reflect current best practices and regulatory
            requirements.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <ArrowDown className="mr-2 h-4 w-4" />
              Sort by: Latest
            </Button>
          </div>
        </div>

        <Tabs defaultValue={categories[0].id} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {category.templates.map((template) => (
                  <Card key={template.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{template.title}</CardTitle>
                          <CardDescription>
                            {template.format} • {template.size} • {template.downloads} downloads
                          </CardDescription>
                        </div>
                        <div className="bg-primary/10 p-2 rounded-md">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Last updated: {template.lastUpdated}</span>
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="bg-slate-50 dark:bg-slate-800 border-none mt-8">
          <CardHeader>
            <CardTitle>Need a Custom Template?</CardTitle>
            <CardDescription>
              We can help you develop customized templates tailored to your specific business needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Our team of experts can create bespoke templates that address your unique contingent workforce challenges,
              ensuring compliance with relevant regulations while optimizing your processes.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/contact">
              <Button>Contact Us for Custom Templates</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
