import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

// Philippines regulations data from the provided JSON
const countryData = {
  name: "Philippines",
  summary:
    "The Philippines regulates contingent workforce through the Labor Code and Department of Labor and Employment (DOLE) orders, with strict rules against labor-only contracting.",
  lastUpdated: "2025-04-07",
  keyConsiderations: [
    "Labor-only contracting is prohibited under Philippine law",
    "Department Order No. 174 regulates contracting and subcontracting arrangements",
    "Contractors must have substantial capital or investment",
    "Anti-'endo' (end of contract) measures restrict repeated short-term contracts",
    "Misclassification can result in mandatory regularization of workers",
  ],
  laborLawFramework: {
    description:
      "The Philippines' contingent workforce is primarily governed by the Labor Code of the Philippines (Presidential Decree No. 442) and various Department of Labor and Employment (DOLE) Orders, particularly Department Order No. 174, Series of 2017, which provides regulations for contracting and subcontracting arrangements. These regulations aim to protect workers from exploitative practices while allowing legitimate contracting arrangements.",
    sources: [
      {
        title: "Department of Labor and Employment - Labor Code",
        url: "https://www.dole.gov.ph/labor-code-of-the-philippines/",
      },
      {
        title: "Department of Labor and Employment - DO 174-17",
        url: "https://www.dole.gov.ph/department-order-no-174-17-rules-implementing-articles-106-to-109-of-the-labor-code-as-amended/",
      },
    ],
  },
  workerClassification: {
    description:
      "Philippine law recognizes several categories of workers, including regular employees, project-based employees, seasonal employees, casual employees, fixed-term employees, and independent contractors. The Labor Code distinguishes between legitimate contracting/subcontracting and 'labor-only contracting,' which is prohibited. Labor-only contracting occurs when the contractor merely supplies workers to a client, does not have substantial capital or investment, and the workers perform activities directly related to the principal business of the client. Misclassification can result in significant liabilities, including the requirement to regularize workers and provide back pay and benefits.",
    sources: [
      {
        title: "Supreme Court of the Philippines - Jurisprudence on Employment Status",
        url: "https://sc.judiciary.gov.ph/jurisprudence/",
      },
    ],
  },
  recentDevelopments: {
    description:
      "The Philippines has increased enforcement against 'endo' practices (end of contract schemes) where workers are repeatedly hired on short-term contracts to avoid regularization. Department Order No. 174 strengthened regulations against labor-only contracting and increased penalties for violations. There have been ongoing legislative efforts to further restrict contractualization, though comprehensive reform has not yet been enacted. The COVID-19 pandemic led to temporary measures affecting employment relationships, but the fundamental protections under the Labor Code remain in place.",
    sources: [
      {
        title: "Department of Labor and Employment - Updates on Labor Policies",
        url: "https://www.dole.gov.ph/category/latest-news/",
      },
    ],
  },
  bestPractices: {
    description:
      "When managing contingent workforce in the Philippines, organizations should ensure that contracting arrangements comply with Department Order No. 174 requirements, including verification that contractors have substantial capital or investment and provide services independent from the client. Avoid practices that could be considered 'labor-only contracting' or 'endo' schemes. For project-based or fixed-term employees, maintain clear documentation of the specific project or term, including start and end dates. Regularly audit contingent workforce arrangements to identify and address compliance risks. Consider implementing pathways to regularization for long-term contingent workers to mitigate legal risks.",
    sources: [
      {
        title: "Employers Confederation of the Philippines",
        url: "https://ecop.org.ph/about-ecop/",
      },
    ],
  },
  monitoringStrategy: {
    description:
      "To stay updated on changes to the Philippines' contingent workforce regulations, regularly monitor the Department of Labor and Employment website for new Department Orders and advisories. Subscribe to alerts from industry associations such as the Employers Confederation of the Philippines and chambers of commerce. Legal updates from major Philippine law firms specializing in employment law are also valuable sources of information on regulatory changes and court decisions that may impact contingent workforce management.",
    sources: [
      {
        title: "Department of Labor and Employment - News and Updates",
        url: "https://www.dole.gov.ph/category/latest-news/",
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
                    <span className="text-sm">Limited</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Required Entity</span>
                    <span className="text-sm">Licensed Contractor</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Currency</span>
                    <span className="text-sm">Philippine Peso (PHP)</span>
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
