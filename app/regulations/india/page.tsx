import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

// India regulations  FileText, ExternalLink } from "lucide-react"
// import Link from "next/link" // Removed duplicate import

// India regulations data from the provided JSON
const countryData = {
  name: "India",
  summary:
    "India regulates contingent workforce primarily through the Contract Labour Act, with additional provisions in the new Labour Codes that are pending implementation.",
  lastUpdated: "2025-04-07",
  keyConsiderations: [
    "Contract Labour Act regulates employment of contract labor",
    "New Labour Codes will replace multiple existing labor laws once implemented",
    "Fixed-term employment introduced across all sectors",
    "Contractors must be properly licensed and registered",
    "Misclassification can result in significant liabilities",
  ],
  laborLawFramework: {
    description:
      "India's contingent workforce is primarily governed by the Contract Labour (Regulation and Abolition) Act, 1970, which regulates the employment of contract labor and provides for its abolition in certain circumstances. Other relevant legislation includes the Industrial Disputes Act, 1947, and the Factories Act, 1948. India is currently transitioning to a new labor code system, with four consolidated Labor Codes that will replace multiple existing labor laws once fully implemented.",
    sources: [
      {
        title: "Ministry of Labour & Employment - Contract Labour Act",
        url: "https://labour.gov.in/acts",
      },
      {
        title: "Ministry of Labour & Employment - Labour Codes",
        url: "https://labour.gov.in/labour-codes",
      },
    ],
  },
  workerClassification: {
    description:
      "Indian law recognizes several categories of workers, including permanent employees, contract workers, fixed-term employees, and independent contractors. Contract workers are employed by a contractor who provides these workers to a principal employer. The distinction between employees and independent contractors is determined by factors such as control, integration into the business, and payment methods. Misclassification can result in significant liabilities, including retroactive payment of benefits and potential penalties under various labor laws.",
    sources: [
      {
        title: "Ministry of Labour & Employment - Worker Classification",
        url: "https://labour.gov.in/",
      },
      {
        title: "Indian Labour Conference Guidelines",
        url: "https://labour.gov.in/ilc",
      },
    ],
  },
  recentDevelopments: {
    description:
      "India has introduced four new Labor Codes that consolidate and replace 29 existing labor laws: the Code on Wages, the Industrial Relations Code, the Social Security Code, and the Occupational Safety, Health and Working Conditions Code. These codes include provisions that will impact contingent workforce management, such as the introduction of fixed-term employment across all sectors, universal social security coverage, and revised thresholds for applicability of contract labor regulations. While these codes have been passed by Parliament, their implementation has been delayed and is expected in phases.",
    sources: [
      {
        title: "Ministry of Labour & Employment - Labour Codes Updates",
        url: "https://labour.gov.in/labour-codes",
      },
      {
        title: "Press Information Bureau - Labour Reforms",
        url: "https://pib.gov.in/",
      },
    ],
  },
  bestPractices: {
    description:
      "When managing contingent workforce in India, organizations should ensure compliance with the Contract Labour Act by verifying that contractors are properly licensed and registered. Maintain clear documentation of the principal employer-contractor relationship and ensure proper facilities and benefits for contract workers as required by law. Monitor the implementation status of the new Labor Codes and prepare for compliance with their provisions. For fixed-term employees, provide clear written contracts specifying duration, terms, and conditions. Conduct regular audits of contingent workforce arrangements to identify and address compliance risks.",
    sources: [
      {
        title: "Federation of Indian Chambers of Commerce & Industry",
        url: "https://ficci.in/",
      },
      {
        title: "Confederation of Indian Industry",
        url: "https://www.cii.in/",
      },
    ],
  },
  monitoringStrategy: {
    description:
      "To stay updated on changes to India's contingent workforce regulations, regularly monitor the Ministry of Labour & Employment website for updates on labor laws and the implementation of the new Labor Codes. Subscribe to alerts from industry associations such as the Federation of Indian Chambers of Commerce & Industry (FICCI) and the Confederation of Indian Industry (CII). Legal updates from major Indian law firms specializing in employment law are also valuable sources of information on regulatory changes.",
    sources: [
      {
        title: "Ministry of Labour & Employment - Updates",
        url: "https://labour.gov.in/",
      },
      {
        title: "Labour Law Reporter",
        url: "https://www.labourlawreporter.in/",
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
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-full text-xs font-medium">
                      Medium
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Contractor Viability</span>
                    <span className="text-sm">Medium</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Required Entity</span>
                    <span className="text-sm">Licensed Contractor</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Currency</span>
                    <span className="text-sm">Indian Rupee (INR)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Time Zone</span>
                    <span className="text-sm">UTC+5:30</span>
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
          </section>

          {/* Recent Developments */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Recent Developments</h2>
            <p className="text-muted-foreground mb-4">{country.recentDevelopments.description}</p>
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
          </section>

          {/* Best Practices */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Best Practices for India</h2>
            <p className="text-muted-foreground mb-4">{country.bestPractices.description}</p>
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
          </section>

          {/* Monitoring Strategy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Monitoring Strategy</h2>
            <p className="text-muted-foreground mb-4">{country.monitoringStrategy.description}</p>
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
