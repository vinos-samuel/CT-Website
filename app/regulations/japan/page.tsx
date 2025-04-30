import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

// Japan regulations data from the provided JSON
const countryData = {
  name: "Japan",
  summary:
    "Japan has implemented significant regulations for contingent workers, including the Worker Dispatch Law and the recent Freelance Act, with strict rules on dispatch worker duration and equal treatment.",
  lastUpdated: "2025-04-07",
  keyConsiderations: [
    "Strict worker classification rules with significant penalties for misclassification",
    "Worker dispatching (haken) is heavily regulated with specific licensing requirements",
    "Fixed-term contracts convert to indefinite-term after repeated renewals (typically 5 years)",
    "Equal pay for equal work provisions for dispatched workers",
    "New Freelance Act (2024) provides protections for independent contractors",
  ],
  regions: [
    {
      name: "National",
      regulations: [
        {
          title: "Worker Dispatch Law",
          description:
            "The Worker Dispatch Law regulates temporary staffing arrangements, with specific provisions for dispatch worker duration and equal treatment.",
          status: "Attention Required",
          lastUpdated: "2024-01-15",
          details:
            "The Worker Dispatch Law requires temporary employment agencies to have a license and limits assignments to specific durations. Recent amendments have eliminated the previous 3-year limit on using dispatched workers for the same position, provided that the staffing agency implements a career advancement program for the worker. Equal pay for equal work provisions now require that dispatched workers receive compensation and benefits comparable to directly employed workers performing similar duties.",
        },
        {
          title: "Labor Contract Act",
          description:
            "The Labor Contract Act contains provisions specific to fixed-term employees, including conversion rights after 5 years.",
          status: "Attention Required",
          lastUpdated: "2023-11-20",
          details:
            "Under Article 18 of the Labor Contract Act, fixed-term employees who have had their contracts renewed repeatedly for over 5 years have the right to convert to indefinite-term employment upon request. This provision aims to prevent the abuse of fixed-term contracts and provide greater job security for long-term contingent workers. Companies must carefully track contract durations and renewals to manage conversion rights.",
        },
        {
          title: "Freelance Act",
          description:
            "The recently implemented Freelance Act provides protections for independent contractors and freelancers.",
          status: "Review Needed",
          lastUpdated: "2024-03-01",
          details:
            "The Freelance Act, which took effect in 2024, provides protections for freelancers and independent contractors, including requirements for written contracts and prohibitions against unfair treatment. The Act aims to address the growing gig economy and ensure basic protections for workers outside traditional employment relationships. Companies engaging freelancers must ensure compliance with the new documentation and fair treatment requirements.",
        },
        {
          title: "Equal Pay for Equal Work Provisions",
          description: "Legal requirements for equal treatment of contingent workers compared to regular employees.",
          status: "Attention Required",
          lastUpdated: "2023-12-10",
          details:
            "Japan's equal pay for equal work provisions require that dispatched workers and fixed-term employees receive treatment comparable to regular employees performing similar work. This includes not only base wages but also various allowances, bonuses, and benefits. Companies must conduct comprehensive reviews of compensation structures to ensure compliance and mitigate the risk of discrimination claims.",
        },
      ],
    },
  ],
  resources: [
    {
      title: "Japan Contingent Workforce Compliance Guide",
      type: "PDF",
      size: "3.2 MB",
      url: "#",
    },
    {
      title: "Worker Dispatch Law Implementation Guide",
      type: "DOCX",
      size: "1.8 MB",
      url: "#",
    },
    {
      title: "Fixed-Term Employment Conversion Calculator",
      type: "XLSX",
      size: "1.5 MB",
      url: "#",
    },
    {
      title: "Freelance Act Compliance Checklist",
      type: "PDF",
      size: "2.1 MB",
      url: "#",
    },
  ],
  sources: [
    {
      title: "Ministry of Health, Labour and Welfare",
      url: "https://www.mhlw.go.jp/english/",
      description: "Official government website for labor regulations and policies in Japan.",
    },
    {
      title: "Japan External Trade Organization - Labor Regulations",
      url: "https://www.jetro.go.jp/en/invest/setting_up/laws/section4/",
      description: "Information on Japanese labor laws for foreign businesses.",
    },
    {
      title: "Japan Institute for Labour Policy and Training",
      url: "https://www.jil.go.jp/english/",
      description: "Research institute providing analysis of Japanese labor market and policies.",
    },
    {
      title: "Japan Staffing Services Association",
      url: "https://www.jassa.or.jp/",
      description: "Industry association for staffing agencies in Japan.",
    },
  ],
}

export default function CountryRegulationPage() {
  const country = countryData

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/regulations" className="text-sm text-muted-foreground hover:text-primary flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Regulations
            </Link>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{country.name}</h1>
            <p className="text-muted-foreground">Contingent Workforce Regulations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Country Overview</CardTitle>
                <CardDescription>
                  Key information about contingent workforce regulations in {country.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Summary</h3>
                    <p className="text-sm text-muted-foreground">{country.summary}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Key Considerations</h3>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      {country.keyConsiderations.map((consideration, index) => (
                        <li key={index}>{consideration}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Risk Level</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-full text-xs font-medium">
                      Medium
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Contractor Viability</span>
                    <span className="text-sm">Limited</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Required Entity</span>
                    <span className="text-sm">Local Entity or Dispatch Agency</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Currency</span>
                    <span className="text-sm">Japanese Yen (JPY)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Time Zone</span>
                    <span className="text-sm">UTC+9</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue={country.regions[0].name.toLowerCase()} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-1">
            {country.regions.map((region) => (
              <TabsTrigger key={region.name} value={region.name.toLowerCase()}>
                {region.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {country.regions.map((region) => (
            <TabsContent key={region.name} value={region.name.toLowerCase()} className="mt-4 space-y-4">
              <h2 className="text-xl font-bold">{region.name} Regulations</h2>

              {region.regulations.map((regulation, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{regulation.title}</CardTitle>
                        <CardDescription>Last updated: {regulation.lastUpdated}</CardDescription>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          regulation.status === "Compliant"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : regulation.status === "Review Needed"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        }`}
                      >
                        {regulation.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1">Description</h3>
                        <p className="text-sm text-muted-foreground">{regulation.description}</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Details</h3>
                        <p className="text-sm text-muted-foreground">{regulation.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription>Downloadable resources for {country.name} contingent workforce management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {country.resources.map((resource, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {resource.type} • {resource.size}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sources Section */}
        <Card>
          <CardHeader>
            <CardTitle>Sources</CardTitle>
            <CardDescription>Official references and resources for {country.name} regulations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {country.sources.map((source, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="bg-primary/10 p-2 rounded-md mt-0.5">
                    <ExternalLink className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      {source.title}
                    </a>
                    <p className="text-sm text-muted-foreground">{source.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
