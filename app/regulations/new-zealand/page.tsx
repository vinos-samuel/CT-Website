import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

// New Zealand regulations data from the provided JSON
const countryData = {
  name: "New Zealand",
  summary:
    "New Zealand's Employment Relations Act provides the framework for contingent workforce regulations, with recent amendments strengthening protections for contractors and temporary workers.",
  lastUpdated: "2025-04-07",
  keyConsiderations: [
    "Employment Relations Act is the primary legislation governing employment relationships",
    "Triangular Employment Amendment Act enhances protections for temporary agency workers",
    "Fixed-term contracts must have genuine reasons based on reasonable grounds",
    "Multi-factor test used to determine employment status",
    "Proposed amendments to better protect vulnerable contractors",
  ],
  laborLawFramework: {
    description:
      "New Zealand's contingent workforce is primarily governed by the Employment Relations Act 2000 and its amendments, the Holidays Act 2003, and the Employment Relations (Triangular Employment) Amendment Act 2019. The Employment Relations Act provides the basic framework for employment relationships, while the Triangular Employment Amendment Act specifically addresses temporary agency work arrangements. These laws aim to balance flexibility for businesses with protections for workers in various employment arrangements.",
    sources: [
      {
        title: "Ministry of Business, Innovation and Employment - Employment Relations Act",
        url: "https://www.employment.govt.nz/laws-and-regulations/acts/employment-relations-act/",
      },
      {
        title: "New Zealand Legislation - Employment Relations Act 2000",
        url: "https://www.legislation.govt.nz/act/public/2000/0024/latest/whole.html",
      },
    ],
  },
  workerClassification: {
    description:
      "New Zealand law distinguishes primarily between employees and independent contractors, with significant differences in legal protections and entitlements between these categories. The determination of employment status is based on the 'real nature of the relationship' rather than how the parties describe it, considering factors such as control, integration, fundamental/economic reality, and intention tests. Fixed-term employees are considered employees but with contracts that end on a specified date or when a specific event occurs. Temporary agency workers (labor hire) involve triangular employment relationships where workers are employed by an agency but perform work for a client business.",
    sources: [
      {
        title: "Employment New Zealand - Employee or Contractor",
        url: "https://www.employment.govt.nz/starting-employment/who-is-an-employee/",
      },
    ],
  },
  recentDevelopments: {
    description:
      "New Zealand has introduced several significant changes to contingent workforce regulations in recent years. The Employment Relations (Triangular Employment) Amendment Act 2019 enhanced protections for temporary agency workers by allowing them to raise personal grievances against the client business where they perform work. The government has also proposed amendments to better protect vulnerable contractors, including a new statutory test to determine employment status and a process for contractors to challenge their classification. Additionally, there has been increased enforcement of existing regulations to prevent misclassification of employees as contractors.",
    sources: [
      {
        title: "Ministry of Business, Innovation and Employment - Employment Law Changes",
        url: "https://www.employment.govt.nz/about/employment-law/employment-law-changes/",
      },
    ],
  },
  bestPractices: {
    description:
      "When managing contingent workforce in New Zealand, organizations should carefully assess worker classification using the multi-factor tests established by courts and the Employment Relations Authority. For fixed-term employees, ensure there is a genuine reason based on reasonable grounds for the fixed term and clearly communicate this in writing. For temporary agency arrangements, be aware of the joint liability provisions under the Triangular Employment Amendment Act and establish clear communication channels between the agency and client business. Regularly review contractor arrangements to ensure they reflect the true nature of the relationship and are not disguised employment relationships. Maintain comprehensive documentation of all contingent workforce arrangements, including written agreements that clearly define the terms and expectations.",
    sources: [
      {
        title: "Business New Zealand",
        url: "https://www.businessnz.org.nz/resources/employment-and-skills",
      },
    ],
  },
  monitoringStrategy: {
    description:
      "To stay updated on changes to New Zealand's contingent workforce regulations, regularly monitor the Ministry of Business, Innovation and Employment (MBIE) website and the Employment New Zealand portal for updates to relevant laws and guidance. Subscribe to alerts from industry associations such as Business New Zealand and the Employers and Manufacturers Association. Legal updates from major New Zealand law firms specializing in employment law are also valuable sources of information on regulatory changes and Employment Court decisions that may impact contingent workforce management.",
    sources: [
      {
        title: "Employment New Zealand - Updates and News",
        url: "https://www.employment.govt.nz/about/news/",
      },
    ],
  },
}

export default function CountryRegulationPage() {
  const country = countryData

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        {/* Header with back button and title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/regulations" className="text-sm text-muted-foreground hover:text-primary flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Regulations
            </Link>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{country.name}</h1>
            <p className="text-muted-foreground">Last updated: {country.lastUpdated}</p>
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

        {/* Summary and Quick Facts in card format */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Country Overview</CardTitle>
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
                    <span className="text-sm">New Zealand Dollar (NZD)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Time Zone</span>
                    <span className="text-sm">UTC+12/+13</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Content sections in simpler format */}
        <div className="space-y-8 mt-4">
          {/* Labor Law Framework */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Labor Law Framework</h2>
            <p className="text-muted-foreground mb-4">{country.laborLawFramework.description}</p>
            <div className="mt-2">
              <h3 className="text-sm font-medium mb-2">Sources:</h3>
              <ul className="space-y-2">
                {country.laborLawFramework.sources.map((source, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ExternalLink className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Worker Classification */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Worker Classification</h2>
            <p className="text-muted-foreground mb-4">{country.workerClassification.description}</p>
            {country.workerClassification.sources && country.workerClassification.sources.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-2">Sources:</h3>
                <ul className="space-y-2">
                  {country.workerClassification.sources.map((source, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ExternalLink className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Recent Developments */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Recent Developments</h2>
            <p className="text-muted-foreground mb-4">{country.recentDevelopments.description}</p>
            {country.recentDevelopments.sources && country.recentDevelopments.sources.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-2">Sources:</h3>
                <ul className="space-y-2">
                  {country.recentDevelopments.sources.map((source, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ExternalLink className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Best Practices */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Best Practices for {country.name}</h2>
            <p className="text-muted-foreground mb-4">{country.bestPractices.description}</p>
            {country.bestPractices.sources && country.bestPractices.sources.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-2">Sources:</h3>
                <ul className="space-y-2">
                  {country.bestPractices.sources.map((source, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ExternalLink className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Monitoring Strategy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Monitoring Strategy</h2>
            <p className="text-muted-foreground mb-4">{country.monitoringStrategy.description}</p>
            {country.monitoringStrategy.sources && country.monitoringStrategy.sources.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-medium mb-2">Sources:</h3>
                <ul className="space-y-2">
                  {country.monitoringStrategy.sources.map((source, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ExternalLink className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t">
          <Link href="/regulations">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Countries
            </Button>
          </Link>
          <Link href="/regulations/countries">
            <Button variant="outline">View Comparison Table</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
