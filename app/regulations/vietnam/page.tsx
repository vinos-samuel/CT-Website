import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"

// Vietnam regulations data from the provided JSON
const countryData = {
  name: "Vietnam",
  summary:
    "Vietnam's Labor Code of 2019 introduced significant changes to contingent workforce regulations, including stricter rules for fixed-term contracts and labor outsourcing.",
  lastUpdated: "2025-04-07",
  keyConsiderations: [
    "Fixed-term contracts limited to one renewal before conversion to indefinite-term",
    "Labor outsourcing strictly limited to 17 specific job positions",
    "Equal treatment principle for outsourced workers",
    "Maximum 36-month duration for fixed-term contracts",
    "Increased minimum capital requirements for labor outsourcing enterprises",
  ],
  laborLawFramework: {
    description:
      "Vietnam's contingent workforce is primarily governed by the Labor Code of 2019 (effective January 1, 2021) and its implementing decrees, particularly Decree No. 145/2020/ND-CP on labor conditions and labor relations. The Labor Code provides comprehensive regulations on various forms of employment, including fixed-term contracts and labor outsourcing. Decree No. 29/2019/ND-CP specifically regulates labor outsourcing activities, including licensing requirements and permitted job positions.",
    sources: [
      {
        title: "Ministry of Labour, Invalids and Social Affairs",
        url: "http://english.molisa.gov.vn/",
      },
      {
        title: "Vietnam Chamber of Commerce and Industry",
        url: "https://en.vcci.com.vn/",
      },
    ],
  },
  workerClassification: {
    description:
      "Vietnamese law recognizes several categories of workers, including indefinite-term employees, fixed-term employees (maximum 36 months), seasonal or specific job employees (less than 12 months), and outsourced workers. The Labor Code of 2019 limits the use of fixed-term contracts, allowing only one renewal before requiring conversion to an indefinite-term contract. Labor outsourcing is strictly regulated and limited to 17 specific job positions. The distinction between employees and independent contractors is not clearly defined in Vietnamese labor law, creating potential classification risks. Misclassification can result in significant liabilities, including the requirement to convert fixed-term employees to indefinite-term status and provide severance payments.",
    sources: [
      {
        title: "Vietnam Labor Law Consulting",
        url: "https://www.vietnam-briefing.com/news/category/human-resources-payroll/",
      },
    ],
  },
  recentDevelopments: {
    description:
      "The Labor Code of 2019, which took effect on January 1, 2021, introduced significant changes to Vietnam's labor regulations, including those governing contingent workforce. Key changes include: stricter limitations on fixed-term contracts, allowing only one renewal before requiring conversion to an indefinite-term contract; expanded protections for outsourced workers, including equal working conditions and wages; and revised regulations on labor outsourcing, with Decree No. 145/2020/ND-CP providing detailed implementation guidelines. Additionally, Decree No. 145/2020/ND-CP introduced new requirements for labor outsourcing enterprises, including increased minimum capital requirements and deposit amounts.",
    sources: [
      {
        title: "Vietnam Legal Forum",
        url: "https://vietnamlawmagazine.vn/labor-code-2019-new-approach-to-employment-relations-27003.html",
      },
    ],
  },
  bestPractices: {
    description:
      "When managing contingent workforce in Vietnam, organizations should ensure that fixed-term contracts comply with the limitations under the Labor Code of 2019, including the one-renewal limit before conversion to indefinite-term status. For labor outsourcing, verify that the positions fall within the 17 permitted job categories and that the outsourcing provider has the required license. Implement systems to ensure equal treatment of outsourced workers compared to direct employees in terms of working conditions and wages. Maintain clear documentation of all employment relationships, including written labor contracts as required by law. Regularly audit contingent workforce arrangements to identify and address compliance risks, particularly in light of the significant changes introduced by the Labor Code of 2019.",
    sources: [
      {
        title: "Vietnam Business Forum",
        url: "http://www.vbf.org.vn/en/",
      },
    ],
  },
  monitoringStrategy: {
    description:
      "To stay updated on changes to Vietnam's contingent workforce regulations, regularly monitor the Ministry of Labour, Invalids and Social Affairs website for new decrees and circulars implementing the Labor Code. Subscribe to alerts from industry associations such as the Vietnam Chamber of Commerce and Industry and the Vietnam Business Forum. Legal updates from major Vietnamese law firms specializing in employment law are also valuable sources of information on regulatory changes and enforcement trends that may impact contingent workforce management.",
    sources: [
      {
        title: "Ministry of Labour, Invalids and Social Affairs - News",
        url: "http://english.molisa.gov.vn/Pages/News/List.aspx?Cat=24",
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
                    <span className="text-sm">Local Entity or Licensed Agency</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm font-medium">Currency</span>
                    <span className="text-sm">Vietnamese Dong (VND)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Time Zone</span>
                    <span className="text-sm">UTC+7</span>
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
