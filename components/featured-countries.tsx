import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

// Country data with flags
const countries = [
  {
    id: "australia",
    name: "Australia",
    lastUpdated: "April 7, 2025",
    flagCode: "au",
  },
  {
    id: "singapore",
    name: "Singapore",
    lastUpdated: "April 7, 2025",
    flagCode: "sg",
  },
  {
    id: "japan",
    name: "Japan",
    lastUpdated: "April 7, 2025",
    flagCode: "jp",
  },
  {
    id: "china",
    name: "China",
    lastUpdated: "April 7, 2025",
    flagCode: "cn",
  },
]

export default function FeaturedCountries() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Featured Countries</h2>
          <Link href="/regulations/countries" className="text-primary hover:underline flex items-center">
            View All Countries <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <Link key={country.id} href={`/regulations/${country.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  {" "}
                  {/* 16:9 aspect ratio */}
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <img
                      src={`https://flagcdn.com/${country.flagCode}.svg`}
                      alt={`${country.name} flag`}
                      className="w-full h-full"
                      style={{ objectFit: "contain", padding: "1rem" }}
                    />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold">{country.name}</h3>
                  <p className="text-sm text-muted-foreground">Last updated: {country.lastUpdated}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
