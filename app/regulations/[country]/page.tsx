import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileText } from "lucide-react"
import Link from "next/link"

// Mock data for country regulations
const countryData = {
  us: {
    name: "United States",
    summary:
      "The United States has complex regulations for contingent workers that vary by state. Federal regulations include IRS guidelines for worker classification and FLSA requirements for minimum wage and overtime.",
    keyConsiderations: [
      "Worker classification is strictly enforced by the IRS and DOL",
      "Different states have varying requirements, with California being the most stringent",
      "Benefits eligibility must be carefully managed to avoid co-employment risks",
      "Regular audits of contingent workforce programs are recommended",
    ],
    regions: [
      {
        name: "Federal",
        regulations: [
          {
            title: "IRS Guidelines",
            description:
              "The IRS uses a 20-factor test to determine worker classification. Misclassification can result in back taxes, penalties, and interest.",
            status: "Compliant",
            lastUpdated: "2023-12-01",
            details:
              "The IRS guidelines focus on behavioral control, financial control, and the relationship between the parties. Companies must carefully document these aspects when engaging independent contractors.",
          },
          {
            title: "FLSA Requirements",
            description:
              "The Fair Labor Standards Act establishes minimum wage, overtime pay, and recordkeeping standards affecting full-time and part-time workers.",
            status: "Compliant",
            lastUpdated: "2023-11-15",
            details:
              "FLSA requirements apply to employees but not to independent contractors. However, misclassified workers may be entitled to FLSA protections retroactively.",
          },
          {
            title: "DOL Contractor Classification",
            description: "The Department of Labor provides guidance on worker classification under the FLSA.",
            status: "Review Needed",
            lastUpdated: "2023-10-20",
            details:
              "The DOL's guidance focuses on economic realities and considers factors such as the nature and degree of control, the worker's opportunity for profit or loss, and the permanency of the relationship.",
          },
        ],
      },
      {
        name: "California",
        regulations: [
          {
            title: "AB5 Compliance",
            description: "Assembly Bill 5 codifies the 'ABC test' for determining worker classification in California.",
            status: "Attention Required",
            lastUpdated: "2023-12-05",
            details:
              "Under AB5, a worker is considered an employee unless the hiring entity can prove that: (A) the worker is free from control and direction, (B) the worker performs work outside the usual course of the hiring entity's business, and (C) the worker is customarily engaged in an independently established trade, occupation, or business.",
          },
          {
            title: "State Tax Withholding",
            description:
              "California has specific tax withholding requirements for both employees and independent contractors.",
            status: "Compliant",
            lastUpdated: "2023-11-10",
            details:
              "California requires employers to withhold state income tax from employee wages. For independent contractors, businesses may need to withhold 7% of payments exceeding $1,500 in a calendar year unless the contractor has a waiver.",
          },
        ],
      },
    ],
    resources: [
      {
        title: "US Contingent Workforce Compliance Guide",
        type: "PDF",
        size: "2.4 MB",
        url: "#",
      },
      {
        title: "California AB5 Checklist",
        type: "DOCX",
        size: "1.1 MB",
        url: "#",
      },
      {
        title: "IRS Worker Classification Questionnaire",
        type: "PDF",
        size: "1.8 MB",
        url: "#",
      },
    ],
  },
  uk: {
    name: "United Kingdom",
    summary:
      "The United Kingdom has established regulations for contingent workers, with a particular focus on IR35 legislation that addresses tax avoidance through 'disguised employment'.",
    keyConsiderations: [
      "IR35 legislation places the responsibility for determining employment status on the end client",
      "Agency Workers Regulations provide equal treatment for agency workers after 12 weeks",
      "Brexit has impacted cross-border contingent workforce arrangements",
      "Regular reviews of contractor arrangements are essential for compliance",
    ],
    regions: [
      {
        name: "National",
        regulations: [
          {
            title: "IR35 Compliance",
            description:
              "IR35 (off-payroll working rules) is designed to assess whether a contractor is a genuine contractor rather than a 'disguised employee' for tax purposes.",
            status: "Compliant",
            lastUpdated: "2023-12-03",
            details:
              "Since April 2021, medium and large-sized private sector clients are responsible for determining the employment status of contractors. This includes assessing factors such as supervision, direction, control, substitution, and mutuality of obligation.",
          },
          {
            title: "Agency Workers Regulations",
            description:
              "The Agency Workers Regulations (AWR) give agency workers the right to the same basic employment conditions as direct employees after 12 weeks in the same role.",
            status: "Compliant",
            lastUpdated: "2023-11-22",
            details:
              "After 12 weeks, agency workers are entitled to the same pay, working time, rest periods, and annual leave as permanent employees. This does not include occupational benefits such as sick pay, pension contributions, or maternity/paternity pay.",
          },
          {
            title: "HMRC Requirements",
            description:
              "HM Revenue & Customs enforces tax compliance for all workers, including specific requirements for contingent workers.",
            status: "Review Needed",
            lastUpdated: "2023-10-15",
            details:
              "HMRC requires proper documentation of all contractor arrangements and can conduct compliance checks. Penalties for non-compliance can include unpaid taxes, interest, and additional penalties.",
          },
        ],
      },
    ],
    resources: [
      {
        title: "UK IR35 Compliance Guide",
        type: "PDF",
        size: "3.1 MB",
        url: "#",
      },
      {
        title: "Agency Workers Regulations Checklist",
        type: "DOCX",
        size: "1.3 MB",
        url: "#",
      },
      {
        title: "HMRC Employment Status Tool Guide",
        type: "PDF",
        size: "1.5 MB",
        url: "#",
      },
    ],
  },
  germany: {
    name: "Germany",
    summary:
      "Germany has strict regulations governing temporary work and independent contractors, with a focus on preventing 'false self-employment' (Scheinselbstständigkeit).",
    keyConsiderations: [
      "The German Temporary Employment Act (AÜG) regulates temporary agency work",
      "Strict penalties for false self-employment including retroactive social security contributions",
      "Maximum assignment duration of 18 months for temporary workers",
      "Works council involvement may be required for contingent workforce decisions",
    ],
    regions: [
      {
        name: "National",
        regulations: [
          {
            title: "AÜG Compliance",
            description:
              "The Arbeitnehmerüberlassungsgesetz (AÜG) or Temporary Employment Act regulates the supply of temporary workers by agencies to client companies.",
            status: "Compliant",
            lastUpdated: "2023-12-02",
            details:
              "The AÜG requires temporary employment agencies to have a license, limits assignments to 18 months, and mandates equal pay for temporary workers after 9 months. Violations can result in fines up to €30,000.",
          },
          {
            title: "Social Security Requirements",
            description:
              "Germany has comprehensive social security requirements that apply to all workers, with specific provisions for contingent workers.",
            status: "Compliant",
            lastUpdated: "2023-11-18",
            details:
              "Employers must contribute to social security for employees, including health insurance, pension insurance, unemployment insurance, and long-term care insurance. Independent contractors are responsible for their own social security contributions.",
          },
          {
            title: "Tax Classification",
            description:
              "German tax authorities closely scrutinize worker classification to prevent tax avoidance through false self-employment.",
            status: "Compliant",
            lastUpdated: "2023-10-25",
            details:
              "The German authorities use multiple criteria to determine employment status, including integration into the organization, ability to set working hours, and entrepreneurial risk. Misclassification can result in retroactive tax payments and penalties.",
          },
        ],
      },
    ],
    resources: [
      {
        title: "German Contingent Workforce Guide",
        type: "PDF",
        size: "2.8 MB",
        url: "#",
      },
      {
        title: "AÜG Compliance Checklist",
        type: "DOCX",
        size: "1.2 MB",
        url: "#",
      },
      {
        title: "False Self-Employment Risk Assessment",
        type: "PDF",
        size: "1.7 MB",
        url: "#",
      },
    ],
  },
}

export default function CountryRegulationPage({ params }: { params: { country: string } }) {
  const country = countryData[params.country as keyof typeof countryData]

  if (!country) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-bold">Country Not Found</h1>
          <p className="text-muted-foreground">The country you're looking for is not in our database yet.</p>
          <Link href="/regulations">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Regulations
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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

        <Card>
          <CardHeader>
            <CardTitle>Country Overview</CardTitle>
            <CardDescription>Key information about contingent workforce regulations in {country.name}</CardDescription>
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

        <Tabs defaultValue={country.regions[0].name.toLowerCase()} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
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
      </div>
    </div>
  )
}
