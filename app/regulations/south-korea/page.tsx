"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { generateCountryPDF } from "@/lib/pdf-utils"

// South Korea regulations data from the provided JSON
const countryData = {
  name: "South Korea",
  summary:
    "South Korea strictly regulates temporary agency work through the Act on the Protection of Temporary Agency Workers, limiting contract duration to 2 years and requiring equal treatment.",
  lastUpdated: "2025-04-07",
  keyConsiderations: [
    "Strict 2-year limit on temporary agency work",
    "Equal treatment principle for dispatched workers",
    "Prohibited job categories for dispatched workers",
    "Mandatory conversion to regular employment if rules violated",
    "Fixed-term contracts limited to 2 years before conversion",
  ],
  laborLawFramework: {
    description:
      "South Korea's contingent workforce is primarily governed by the Labor Standards Act, the Act on the Protection of Fixed-Term and Part-Time Workers, and the Act on the Protection of Temporary Agency Workers. The Labor Standards Act provides basic protections for all workers, while the other two acts contain specific provisions for different types of contingent workers. These laws aim to prevent the abuse of non-regular employment arrangements and ensure proper worker protections.",
    sources: [
      {
        title: "Ministry of Employment and Labor",
        url: "https://www.moel.go.kr/english/main.jsp",
      },
      {
        title: "Korea Legislation Research Institute - Act on the Protection of Temporary Agency Workers",
        url: "https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=46242&type=sogan&key=4",
      },
    ],
  },
  workerClassification: {
    description:
      "South Korean law recognizes several categories of workers, including regular employees (permanent), fixed-term employees, part-time workers, dispatched workers (temporary agency workers), and independent contractors. Dispatched workers are employed by staffing agencies but work at client companies. Fixed-term employees have direct employment relationships with companies but for limited periods. The distinction between employees and independent contractors is determined by factors such as control, integration into the business, and payment methods. Misclassification can result in significant penalties, including mandatory conversion to regular employment status.",
    sources: [
      {
        title: "Ministry of Employment and Labor - Worker Classification Guidelines",
        url: "https://www.moel.go.kr/english/poli/poliNewsnews_list.jsp",
      },
      {
        title: "Korea Labor Institute",
        url: "https://www.kli.re.kr/kli_eng/selectBbsNttList.do?bbsNo=6",
      },
    ],
  },
  recentDevelopments: {
    description:
      "South Korea has strengthened protections for dispatched workers in recent years, with stricter enforcement of the 2-year limit on temporary agency work and the equal treatment principle. The Supreme Court has issued several rulings that expand the scope of the equal treatment principle and clarify the criteria for determining employee status. Additionally, there have been increased penalties for illegal dispatch arrangements, including mandatory conversion of dispatched workers to regular employees if they are used for more than two years or in prohibited job categories.",
    sources: [
      {
        title: "Supreme Court of Korea - Recent Rulings",
        url: "https://eng.scourt.go.kr/eng/supreme/decisions.jsp",
      },
      {
        title: "Korea Employment Information Service",
        url: "https://www.keis.or.kr/eng/main.do",
      },
    ],
  },
  bestPractices: {
    description:
      "When managing contingent workforce in South Korea, organizations should carefully monitor the 2-year limit on dispatched workers and ensure they are not used in prohibited job categories such as manufacturing production lines, hazardous work, or jobs requiring professional licenses. Implement systems to track the duration of temporary agency work assignments to prevent exceeding the 2-year limit. Ensure equal treatment of dispatched workers compared to regular employees performing similar work, including wages, bonuses, and benefits. For fixed-term employees, be aware that contracts exceeding 2 years may result in conversion to indefinite-term status. When using independent contractors, maintain clear documentation of the relationship to mitigate misclassification risks.",
    sources: [
      {
        title: "Korea Employers' Federation",
        url: "http://www.kef.or.kr/eng/",
      },
      {
        title: "Ministry of Employment and Labor - Compliance Guidelines",
        url: "https://www.moel.go.kr/english/poli/poliLaw_list.jsp",
      },
    ],
  },
  monitoringStrategy: {
    description:
      "To stay updated on changes to South Korea's contingent workforce regulations, regularly monitor the Ministry of Employment and Labor website for updates to relevant laws and ordinances. Subscribe to alerts from the Korea Labor Institute and industry associations such as the Korea Employers' Federation. Legal updates from major Korean law firms specializing in employment law are also valuable sources of information on regulatory changes and court decisions that may impact contingent workforce management.",
    sources: [
      {
        title: "Ministry of Employment and Labor - News and Updates",
        url: "https://www.moel.go.kr/english/news/news_list.jsp",
      },
      {
        title: "Korea Labor Institute - Research Publications",
        url: "https://www.kli.re.kr/kli_eng/selectBbsNttList.do?key=42",
      },
    ],
  },
}

export default function CountryRegulationPage() {
  const country = countryData
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    toast({
      title: "Preparing PDF",
      description: "Please wait while we generate your professional report...",
    })

    try {
      const success = await generateCountryPDF(country)

      if (success) {
        toast({
          title: "PDF Generated",
          description: "Your professional report has been downloaded successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to generate PDF. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8" id="country-content">
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
          <div className="flex gap-2 export-btn-container">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleGeneratePDF} disabled={isGenerating}>
              <FileText className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Download Report"}
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
                    <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 rounded-full text-xs font-medium">
                      High
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
                    <span className="text-sm">Korean Won (KRW)</span>
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
            <h2 className="text-2xl font-bold mb-4">Best Practices for South Korea</h2>
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
