import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

// Singapore regulations data from the provided JSON
const countryData = {
  name: "Singapore",
  summary:
    "Singapore's Employment Act covers both permanent and contingent workers, with specific provisions for term contract employees outlined in the Tripartite Advisory.",
  lastUpdated: "2025-04-07",
  keyConsiderations: [
    "Employment Act covers all employees regardless of salary level",
    "Tripartite Advisory recommends treating contracts renewed within one month as continuous service",
    "Term contract employees entitled to same statutory benefits as permanent employees",
    "Clear distinction between employees and independent contractors based on multiple factors",
    "Progressive Wage Model affects wage levels in certain sectors",
  ],
  regions: [
    {
      name: "National",
      regulations: [
        {
          title: "Employment Act",
          description:
            "The primary legislation governing employment relationships in Singapore, covering contract terms, working hours, leave entitlements, and termination procedures.",
          status: "Compliant",
          lastUpdated: "2023-12-05",
          details:
            "The Employment Act applies to all employees regardless of salary level since the 2019 amendments. It establishes minimum standards for employment terms and conditions, including salary payment, working hours, overtime, rest days, public holidays, annual leave, sick leave, and termination notice periods. Term contract employees are covered by the Act and entitled to the same statutory benefits as permanent employees, subject to qualifying service periods.",
        },
        {
          title: "Tripartite Advisory on Employment of Term Contract Employees",
          description:
            "Advisory guidelines for employers on the treatment of term contract employees, particularly regarding continuous service.",
          status: "Compliant",
          lastUpdated: "2023-11-20",
          details:
            "The Tripartite Advisory recommends that employers treat contracts renewed within one month of the previous contract as continuous service. This affects eligibility for statutory benefits such as annual leave, sick leave, and maternity protection. While not legally binding, the Advisory represents best practice and is generally followed by employers seeking to maintain good labor relations.",
        },
        {
          title: "Central Provident Fund Act",
          description:
            "Mandates CPF contributions for employees, which fund retirement, healthcare, and housing needs.",
          status: "Compliant",
          lastUpdated: "2023-10-15",
          details:
            "Employers and employees must make monthly CPF contributions based on the employee's ordinary wages and additional wages. Contribution rates vary by age group, with higher rates for younger employees. Singapore citizens and permanent residents are covered, while foreigners are generally exempt. Independent contractors are not subject to CPF contributions, making proper classification crucial.",
        },
        {
          title: "Employment of Foreign Manpower Act",
          description: "Regulates the employment of foreign workers in Singapore through various work pass categories.",
          status: "Review Needed",
          lastUpdated: "2023-11-10",
          details:
            "Foreign workers must have valid work passes to work in Singapore. Main categories include Employment Pass (for professionals earning at least SGD 5,000 monthly), S Pass (for mid-skilled workers earning at least SGD 3,000 monthly), and Work Permit (for semi-skilled workers in specific sectors). Each pass has specific eligibility criteria and conditions. Independent contractors who are foreigners generally need an Employment Pass or Entrepreneur Pass.",
        },
      ],
    },
  ],
  resources: [
    {
      title: "Singapore Employment Compliance Guide",
      type: "PDF",
      size: "2.8 MB",
      url: "#",
    },
    {
      title: "CPF Contribution Calculator",
      type: "XLSX",
      size: "1.2 MB",
      url: "#",
    },
    {
      title: "Term Contract Employment Best Practices",
      type: "DOCX",
      size: "1.5 MB",
      url: "#",
    },
    {
      title: "Employee vs. Contractor Classification Guide",
      type: "PDF",
      size: "1.9 MB",
      url: "#",
    },
  ],
  sources: [
    {
      title: "Ministry of Manpower",
      url: "https://www.mom.gov.sg/",
      description: "Official government website for employment regulations and workforce policies in Singapore.",
    },
    {
      title: "Tripartite Alliance for Fair & Progressive Employment Practices",
      url: "https://www.tal.sg/tafep",
      description: "Organization promoting fair and progressive employment practices in Singapore.",
    },
    {
      title: "Central Provident Fund Board",
      url: "https://www.cpf.gov.sg/",
      description: "Official source for CPF contribution requirements and policies.",
    },
    {
      title: "Singapore National Employers Federation",
      url: "https://www.snef.org.sg/",
      description: "Industry association providing guidance on employment practices for employers.",
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
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-xs font-medium">
                      Low
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Contractor Viability</span>
                    <span className="text-sm">High</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Required Entity</span>
                    <span className="text-sm">None for contractors</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Currency</span>
                    <span className="text-sm">Singapore Dollar (SGD)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Time Zone</span>
                    <span className="text-sm">UTC+8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <h2 className="text-xl font-bold">National Regulations</h2>

          {country.regions[0].regulations.map((regulation, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-800">
                <div>
                  <CardTitle>{regulation.title}</CardTitle>
                  <CardDescription>Last updated: {regulation.lastUpdated}</CardDescription>
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
        </div>

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
