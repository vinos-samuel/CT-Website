import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

// Simple static data for testing
const countries = {
  singapore: { id: "1", name: "Singapore", slug: "singapore" },
  australia: { id: "2", name: "Australia", slug: "australia" },
  japan: { id: "3", name: "Japan", slug: "japan" },
  china: {
    id: "4",
    name: "China",
    slug: "china",
    summary:
      "China has complex labor laws that vary by region, with strong protections for employees. The Labor Contract Law requires written contracts and limits contract terminations.",
    key_considerations: [
      "Written labor contracts mandatory",
      "Social insurance contributions required",
      "Strict termination procedures",
      "Regional variations in implementation",
    ],
  },
  india: { id: "5", name: "India", slug: "india" },
  "south-korea": { id: "6", name: "South Korea", slug: "south-korea" },
  taiwan: { id: "7", name: "Taiwan", slug: "taiwan" },
  "new-zealand": { id: "8", name: "New Zealand", slug: "new-zealand" },
  philippines: { id: "9", name: "Philippines", slug: "philippines" },
  vietnam: { id: "10", name: "Vietnam", slug: "vietnam" },
  thailand: { id: "11", name: "Thailand", slug: "thailand" },
  indonesia: { id: "12", name: "Indonesia", slug: "indonesia" },
  malaysia: { id: "13", name: "Malaysia", slug: "malaysia" },
}

const staticRegions = {
  china: [
    {
      id: "c1",
      name: "National",
      country_id: "4",
      regulations: [
        {
          id: "cr1",
          title: "Labor Contract Law",
          description: "Employment contract requirements",
          details:
            "Regulates formation, performance, and termination of labor contracts. All employees must have written contracts within one month of employment.",
          status: "Review Needed",
          last_updated: "2022-12-01",
        },
        {
          id: "cr2",
          title: "Social Insurance Law",
          description: "Mandatory social insurance contributions",
          details:
            "Employers must contribute to pension, medical, unemployment, work injury, and maternity insurance for all employees.",
          status: "Compliant",
          last_updated: "2023-01-15",
        },
      ],
    },
  ],
}

const staticResources = {
  china: [
    {
      id: "cr1",
      country_id: "4",
      title: "Labor Contract Law Guide",
      type: "PDF",
      size: "2.8 MB",
      url: "/resources/china-labor-contract-law.pdf",
    },
    {
      id: "cr2",
      country_id: "4",
      title: "Social Insurance Requirements",
      type: "PDF",
      size: "1.9 MB",
      url: "/resources/china-social-insurance.pdf",
    },
  ],
}

export default function CountryRegulationsPage({ params }: { params: { country: string } }) {
  console.log("Country received:", params.country)

  const country = countries[params.country as keyof typeof countries]

  console.log("Country found:", country)

  if (!country) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold text-red-600">Debug Info</h1>
        <p>Slug: {params.country}</p>
        <p>Available countries: {Object.keys(countries).join(", ")}</p>
        <p>Country found: {country ? "Yes" : "No"}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/regulations" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Countries
      </Link>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-10 relative overflow-hidden rounded">
          <Image
            src={`/flags/${country.slug}.png`}
            alt={`${country.name} flag`}
            fill
            style={{ objectFit: "cover" }}
            onError={(e) => {
              console.log("Image error for:", country.slug)
            }}
          />
        </div>
        <h1 className="text-4xl font-bold">{country.name} Regulations</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a test page for {country.name}.</p>
          <p>Slug: {country.slug}</p>
          <p>If you see this, the routing is working!</p>
        </CardContent>
      </Card>
    </div>
  )
}
