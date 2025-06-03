import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export const revalidate = 3600 // Revalidate every hour

export default async function RegulationsPage() {
  const supabase = createServerComponentClient({ cookies })

  const { data: countries, error } = await supabase.from("countries").select("*").order("name")

  if (error) {
    console.error("Error fetching countries:", error)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Regulations by Country</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense
          fallback={
            <div className="col-span-full flex justify-center p-8">
              <Spinner />
            </div>
          }
        >
          {countries &&
            countries.map((country) => (
              <Link href={`/regulations/${country.slug}`} key={country.id}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 relative overflow-hidden rounded">
                        <Image
                          src={`/flags/${country.slug}.png`}
                          alt={`${country.name} flag`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <CardTitle>{country.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-gray-600">{country.summary}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Regulations
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}

          {countries && countries.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No countries found.</p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}
