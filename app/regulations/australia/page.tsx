"use client"

// Create the Australia regulations page with proper links
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { generateCountryPDF } from "@/lib/pdf-utils"

// Australia regulations data from the provided JSON
const countryData = {
  name: "Australia",
  summary:
    "Australia has implemented 'same job, same pay' legislation that significantly impacts contingent workforce arrangements.",
  lastUpdated: "2025-04-07",
  keyConsiderations: [
    "'Same job, same pay' legislation requires equal pay for labor hire workers",
    "Multi-factor test used to determine employee vs contractor status",
    "Casual employees entitled to 25% loading in lieu of certain benefits",
    "Casual conversion rights after 12 months of regular work",
    "Significant penalties for misclassification of workers",
  ],
  laborLawFramework: {
    description:
      "The main sources of employment and labor laws in Australia that govern contingent workforce are the Fair Work Act 2009, Independent Contractors Act 2006, and various state-specific legislation. The Fair Work Act is the primary legislation governing employment relationships, while the Independent Contractors Act regulates independent contractor arrangements.",
    sources: [
      {
        title: "Fair Work Commission",
        url: "https://www.fwc.gov.au/",
      },
      {
        title: "Fair Work Ombudsman",
        url: "https://www.fairwork.gov.au/",
      },
    ],
  },
  workerClassification: {
    description:
      "Australian law distinguishes between employees and independent contractors based on multiple factors including control, integration, and economic reality. The courts apply a 'multi-factor test' to determine the true nature of the relationship. Misclassification can result in significant penalties, including back pay for entitlements, superannuation contributions, and potential fines. Casual employees are a significant part of the contingent workforce in Australia and are entitled to a casual loading (typically 25%) in lieu of certain benefits.",
    sources: [
      {
        title: "Australian Taxation Office - Employee or Contractor",
        url: "https://www.ato.gov.au/business/employee-or-contractor/",
      },
      {
        title: "Fair Work Ombudsman - Independent Contractors",
        url: "https://www.fairwork.gov.au/find-help-for/independent-contractors",
      },
    ],
  },
  recentDevelopments: {
    description:
      "The 'same job, same pay' legislation, which came into effect in 2023, requires labor hire workers to receive the same pay as direct employees performing the same work. This significant change aims to prevent employers from using labor hire arrangements to undercut employee wages and conditions. Additionally, casual conversion provisions now allow casual employees to request conversion to permanent employment after 12 months of regular work patterns.",
    sources: [
      {
        title: "Fair Work Ombudsman - Same Job, Same Pay",
        url: "https://www.fairwork.gov.au/newsroom/news/new-laws-to-ensure-same-job-same-pay",
      },
      {
        title: "Fair Work Ombudsman - Casual Employment",
        url: "https://www.fairwork.gov.au/employment-conditions/types-of-employees/casual-part-time-and-full-time/casual-employees",
      },
    ],
  },
  bestPractices: {
    description:
      "When managing contingent workforce in Australia, organizations should implement robust classification processes to distinguish between employees and contractors. Regular audits of contractor arrangements are recommended to ensure compliance with current regulations. For labor hire arrangements, ensure compliance with 'same job, same pay' requirements by conducting regular pay equity reviews. For casual employees, maintain clear records of work patterns and implement processes to address casual conversion requests.",
    sources: [
      {
        title: "Australian HR Institute",
        url: "https://www.ahri.com.au/",
      },
      {
        title: "Recruitment, Consulting and Staffing Association Australia & New Zealand",
        url: "https://www.rcsa.com.au/",
      },
    ],
  },
  monitoringStrategy: {
    description:
      "To stay updated on changes to Australian contingent workforce regulations, regularly monitor the Fair Work Ombudsman and Fair Work Commission websites for updates. Subscribe to alerts from industry associations such as the Australian HR Institute and Recruitment, Consulting and Staffing Association Australia & New Zealand (RCSA). Legal updates from major Australian law firms specializing in employment law are also valuable sources of information on regulatory changes.",
    sources: [
      {
        title: "Fair Work Ombudsman - Updates and News",
        url: "https://www.fairwork.gov.au/about-us/news-and-media-releases",
      },
      {
        title: "Fair Work Commission - Updates",
        url: "https://www.fwc.gov.au/about-us/news-and-events",
      },
    ],
  },
}

export default function CountryRegulationPage() {
  const country = countryData
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePDF = async () => {
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
            <Button onClick={generatePDF} disabled={isGenerating}>
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
                    <span className="text-sm">Australian Dollar (AUD)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Time Zone</span>
                    <span className="text-sm">UTC+8 to UTC+11</span>
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
