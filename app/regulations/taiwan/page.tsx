import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

// Taiwan regulations data from the provided JSON
const countryData = {
  name: "Taiwan",
  summary:
    "Taiwan's Labor Standards Act and Dispatched Worker Protection Act provide comprehensive regulations for contingent workers, with strict rules on dispatch worker duration and equal treatment.",
  lastUpdated: "2025-04-07",
  keyConsiderations: [
    "Dispatched Worker Protection Act limits dispatch worker assignments to 4 years",
    "Equal pay and benefits required for dispatched workers",
    "Restrictions on types of positions that can use dispatched workers",
    "Joint liability between staffing agency and client company",
    "Fixed-term contracts limited to specific types of work",
  ],
  laborLawFramework: {
    description:
      "Taiwan's contingent workforce is primarily governed by the Labor Standards Act and the Dispatched Worker Protection Act (effective 2020). The Labor Standards Act provides basic protections for all workers, while the Dispatched Worker Protection Act contains specific provisions for temporary agency workers. Additional regulations include the Employment Service Act, which regulates employment agencies, and various administrative orders issued by the Ministry of Labor.",
    sources: [
      {
        title: "Ministry of Labor - Labor Standards Act",
        url: "https://english.mol.gov.tw/homeinfo/6457/6558/6562",
      },
      {
        title: "Ministry of Labor - Dispatched Worker Protection Act",
        url: "https://english.mol.gov.tw/homeinfo/6457/6558/6564",
      },
    ],
  },
  workerClassification: {
    description:
      "Taiwanese law recognizes several categories of workers, including regular employees (indefinite-term), fixed-term employees, dispatched workers (temporary agency workers), and independent contractors. Fixed-term contracts are limited to specific types of work, including temporary, short-term, seasonal, and project-based work. Dispatched workers are employed by staffing agencies but work at client companies. The distinction between employees and independent contractors is determined by factors such as control, integration into the business, and payment methods. Misclassification can result in significant penalties, including fines and mandatory conversion to direct employment.",
    sources: [
      {
        title: "Taiwan Labor Law Consulting",
        url: "https://law.moj.gov.tw/ENG/LawClass/LawAll.aspx?pcode=N0030001",
      },
    ],
  },
  recentDevelopments: {
    description:
      "The Dispatched Worker Protection Act, which took effect in 2020, introduced significant protections for dispatched workers in Taiwan. Key provisions include: a maximum duration of 4 years for dispatched workers at the same client company; equal pay and benefits compared to direct employees performing similar work; restrictions on the types of positions that can use dispatched workers; and joint liability between the staffing agency and client company for certain labor rights violations. Additionally, amendments to the Labor Standards Act have strengthened protections for fixed-term employees, including limitations on contract duration and renewal.",
    sources: [
      {
        title: "Taiwan Ministry of Labor - News",
        url: "https://english.mol.gov.tw/homeinfo/6457/6558/6559",
      },
    ],
  },
  bestPractices: {
    description:
      "When managing contingent workforce in Taiwan, organizations should ensure compliance with the Dispatched Worker Protection Act by monitoring the duration of dispatched worker assignments and implementing systems to ensure equal pay and benefits compared to direct employees. For fixed-term employees, verify that the positions qualify for fixed-term contracts under the Labor Standards Act and maintain clear documentation of the contract terms. Conduct regular audits of contingent workforce arrangements to identify and address compliance risks. When using staffing agencies, verify that they are properly licensed under the Employment Service Act and have appropriate insurance coverage for their workers.",
    sources: [
      {
        title: "Chinese National Federation of Industries",
        url: "https://www.cnfi.org.tw/front/bin/home.phtml?Nbr=9",
      },
    ],
  },
  monitoringStrategy: {
    description:
      "To stay updated on changes to Taiwan's contingent workforce regulations, regularly monitor the Ministry of Labor website for new laws, regulations, and administrative orders. Subscribe to alerts from industry associations such as the Chinese National Federation of Industries and chambers of commerce. Legal updates from major Taiwanese law firms specializing in employment law are also valuable sources of information on regulatory changes and court decisions that may impact contingent workforce management.",
    sources: [
      {
        title: "Ministry of Labor - Updates",
        url: "https://english.mol.gov.tw/homeinfo/6457/6558/6559",
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
                    <span className="text-sm">Licensed Dispatch Agency</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Currency</span>
                    <span className="text-sm">New Taiwan Dollar (TWD)</span>
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
