import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Updated regulations data from the JSON file
const regulationsData = [
  {
    country: "Australia",
    id: "australia",
    riskLevel: "Low",
    maximumContractDuration: "No statutory maximum",
    renewalRestrictions: "No statutory restrictions",
    equalPayRequirements: 'Yes, under "same job, same pay" legislation',
    benefitsEligibility: "Limited for casual workers",
    conversionToPermanent: "Casual conversion after 12 months",
    agencyLicensingRequirements: "Required in some states",
    recentRegulatoryChanges: "Same job, same pay legislation (2023)",
    flagCode: "au",
    lastUpdated: "April 7, 2025",
    region: "Oceania",
  },
  {
    country: "China",
    id: "china",
    riskLevel: "High",
    maximumContractDuration: "Maximum 2 years for temporary staff",
    renewalRestrictions: "Limited to specific positions",
    equalPayRequirements: "Equal pay principle applies",
    benefitsEligibility: "Limited benefits required",
    conversionToPermanent: "No automatic conversion",
    agencyLicensingRequirements: "Strict licensing requirements",
    recentRegulatoryChanges: "Stricter enforcement of 10% headcount limit",
    flagCode: "cn",
    lastUpdated: "April 7, 2025",
    region: "East Asia",
  },
  {
    country: "India",
    id: "india",
    riskLevel: "Medium",
    maximumContractDuration: "Varies by state",
    renewalRestrictions: "Multiple renewals may trigger permanent status",
    equalPayRequirements: "Equal pay for equal work principle",
    benefitsEligibility: "Varies by state and contract type",
    conversionToPermanent: "No statutory requirements",
    agencyLicensingRequirements: "Required under Contract Labour Act",
    recentRegulatoryChanges: "Labor code reforms (pending implementation)",
    flagCode: "in",
    lastUpdated: "April 7, 2025",
    region: "South Asia",
  },
  {
    country: "Indonesia",
    id: "indonesia",
    riskLevel: "Medium",
    maximumContractDuration: "5 years maximum",
    renewalRestrictions: "Limited to certain types of work",
    equalPayRequirements: "No specific equal pay legislation",
    benefitsEligibility: "Limited for fixed-term workers",
    conversionToPermanent: "No statutory requirements",
    agencyLicensingRequirements: "Required for outsourcing companies",
    recentRegulatoryChanges: "Omnibus Law implementation (2022)",
    flagCode: "id",
    lastUpdated: "April 7, 2025",
    region: "South East Asia",
  },
  {
    country: "Japan",
    id: "japan",
    riskLevel: "Medium",
    maximumContractDuration: "3 years (5 years for specialists)",
    renewalRestrictions: "Term limits for dispatch workers",
    equalPayRequirements: "Equal pay requirements for dispatch workers",
    benefitsEligibility: "Limited for fixed-term workers",
    conversionToPermanent: "Conversion rights after 5 years",
    agencyLicensingRequirements: "Required for dispatch agencies",
    recentRegulatoryChanges: "Freelance Act implementation (2024)",
    flagCode: "jp",
    lastUpdated: "April 7, 2025",
    region: "East Asia",
  },
  {
    country: "New Zealand",
    id: "new-zealand",
    riskLevel: "Low",
    maximumContractDuration: "No statutory maximum",
    renewalRestrictions: "Fixed term must have genuine reasons",
    equalPayRequirements: "No specific equal pay for contingent workers",
    benefitsEligibility: "Limited for contractors",
    conversionToPermanent: "No statutory requirements",
    agencyLicensingRequirements: "No specific requirements",
    recentRegulatoryChanges: "Contractor classification amendments (2025)",
    flagCode: "nz",
    lastUpdated: "April 7, 2025",
    region: "Oceania",
  },
  {
    country: "Philippines",
    id: "philippines",
    riskLevel: "Medium",
    maximumContractDuration: "No statutory maximum",
    renewalRestrictions: 'Restrictions on "endo" practices',
    equalPayRequirements: "No specific equal pay legislation",
    benefitsEligibility: "Limited for project-based workers",
    conversionToPermanent: "No statutory requirements",
    agencyLicensingRequirements: "Required for private employment agencies",
    recentRegulatoryChanges: "Stricter regulations on labor-only contracting",
    flagCode: "ph",
    lastUpdated: "April 7, 2025",
    region: "South East Asia",
  },
  {
    country: "Singapore",
    id: "singapore",
    riskLevel: "Low",
    maximumContractDuration: "No statutory maximum",
    renewalRestrictions: "No statutory restrictions",
    equalPayRequirements: "No specific equal pay legislation",
    benefitsEligibility: "Limited for term contract employees",
    conversionToPermanent: "No statutory requirements",
    agencyLicensingRequirements: "Required for employment agencies",
    recentRegulatoryChanges: "Tripartite Advisory on Term Contract Employees",
    flagCode: "sg",
    lastUpdated: "April 7, 2025",
    region: "South East Asia",
  },
  {
    country: "South Korea",
    id: "south-korea",
    riskLevel: "High",
    maximumContractDuration: "2 years maximum",
    renewalRestrictions: "Limited to 2 years total",
    equalPayRequirements: "Equal pay principle for dispatched workers",
    benefitsEligibility: "Limited for fixed-term workers",
    conversionToPermanent: "Conversion rights after 2 years",
    agencyLicensingRequirements: "Required for dispatch agencies",
    recentRegulatoryChanges: "Strengthened protections for dispatched workers",
    flagCode: "kr",
    lastUpdated: "April 7, 2025",
    region: "East Asia",
  },
  {
    country: "Taiwan",
    id: "taiwan",
    riskLevel: "Medium",
    maximumContractDuration: "Fixed term contracts limited by type",
    renewalRestrictions: "Temporary work limited to 6 months",
    equalPayRequirements: "No specific equal pay legislation",
    benefitsEligibility: "Limited for fixed-term workers",
    conversionToPermanent: "No statutory requirements",
    agencyLicensingRequirements: "Required for dispatch agencies",
    recentRegulatoryChanges: "Increased scrutiny of worker classification",
    flagCode: "tw",
    lastUpdated: "April 7, 2025",
    region: "East Asia",
  },
  {
    country: "Thailand",
    id: "thailand",
    riskLevel: "Medium",
    maximumContractDuration: "No statutory maximum",
    renewalRestrictions: "No statutory restrictions",
    equalPayRequirements: "Equal treatment principle",
    benefitsEligibility: "Limited for fixed-term workers",
    conversionToPermanent: "No statutory requirements",
    agencyLicensingRequirements: "Required for employment agencies",
    recentRegulatoryChanges: "Enhanced protections for outsourced workers",
    flagCode: "th",
    lastUpdated: "April 7, 2025",
    region: "South East Asia",
  },
  {
    country: "Vietnam",
    id: "vietnam",
    riskLevel: "Medium",
    maximumContractDuration: "36 months maximum",
    renewalRestrictions: "Limited renewals for fixed-term contracts",
    equalPayRequirements: "Equal pay principle applies",
    benefitsEligibility: "Limited for fixed-term workers",
    conversionToPermanent: "Conversion after two fixed-term contracts",
    agencyLicensingRequirements: "Required for labor subleasing enterprises",
    recentRegulatoryChanges: "New decree on labor subleasing (2023)",
    flagCode: "vn",
    lastUpdated: "April 7, 2025",
    region: "South East Asia",
  },
]

// Group countries by region
const regions = [
  {
    name: "East Asia",
    countries: regulationsData.filter((country) => country.region === "East Asia"),
  },
  {
    name: "Oceania",
    countries: regulationsData.filter((country) => country.region === "Oceania"),
  },
  {
    name: "South Asia",
    countries: regulationsData.filter((country) => country.region === "South Asia"),
  },
  {
    name: "South East Asia",
    countries: regulationsData.filter((country) => country.region === "South East Asia"),
  },
]

export default function CountriesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">APAC Countries</h1>
          <p className="text-muted-foreground max-w-3xl">
            Select a country to view detailed information about contingent workforce regulations, including worker
            classification, compliance requirements, and recent regulatory changes.
          </p>
        </div>

        <Tabs defaultValue="countries" className="w-full">
          <TabsList>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="comparison">Comparison Table</TabsTrigger>
          </TabsList>

          <TabsContent value="countries" className="mt-6">
            {regions.map((region) => (
              <div key={region.name} className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{region.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {region.countries.map((country) => (
                    <Link key={country.id} href={`/regulations/${country.id}`}>
                      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                          {" "}
                          {/* 16:9 aspect ratio */}
                          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                            <img
                              src={`https://flagcdn.com/${country.flagCode}.svg`}
                              alt={`${country.country} flag`}
                              className="w-full h-full"
                              style={{ objectFit: "contain", padding: "1rem" }}
                            />
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-xl font-bold">{country.country}</h3>
                          <p className="text-sm text-muted-foreground">Last updated: {country.lastUpdated}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-2 text-left sticky left-0 bg-muted z-10">Country</th>
                    <th className="border p-2 text-left">Max Contract Duration</th>
                    <th className="border p-2 text-left">Renewal Restrictions</th>
                    <th className="border p-2 text-left">Equal Pay Requirements</th>
                    <th className="border p-2 text-left">Benefits Eligibility</th>
                    <th className="border p-2 text-left">Conversion to Permanent</th>
                    <th className="border p-2 text-left">Agency Licensing</th>
                    <th className="border p-2 text-left">Recent Changes</th>
                    <th className="border p-2 text-left">Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {regulationsData.map((country) => (
                    <tr key={country.id} className="hover:bg-muted/50">
                      <td className="border p-2 sticky left-0 bg-background z-10">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-10 overflow-hidden flex items-center justify-center">
                            <img
                              src={`https://flagcdn.com/${country.flagCode}.svg`}
                              alt={`${country.country} flag`}
                              className="max-w-full max-h-full"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <span>{country.country}</span>
                        </div>
                      </td>
                      <td className="border p-2">{country.maximumContractDuration}</td>
                      <td className="border p-2">{country.renewalRestrictions}</td>
                      <td className="border p-2">{country.equalPayRequirements}</td>
                      <td className="border p-2">{country.benefitsEligibility}</td>
                      <td className="border p-2">{country.conversionToPermanent}</td>
                      <td className="border p-2">{country.agencyLicensingRequirements}</td>
                      <td className="border p-2">{country.recentRegulatoryChanges}</td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            country.riskLevel === "Low"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : country.riskLevel === "Medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          }`}
                        >
                          {country.riskLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Scroll horizontally to view all columns</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
