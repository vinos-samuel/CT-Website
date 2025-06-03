import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Database } from "@/lib/supabase/database.types"
import type { Infographic, Category } from "@/lib/supabase/database.types"

export const revalidate = 3600 // Revalidate every hour

export default async function InfographicsPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  // Fetch published infographics
  const { data: infographics, error: infographicsError } = await supabase
    .from("infographics")
    .select(`*, categories(name, slug)`)
    .eq("status", "published")
    .order("published_at", { ascending: false })

  // Fetch categories
  const { data: categories, error: categoriesError } = await supabase.from("categories").select("*").order("name")

  if (infographicsError || categoriesError) {
    console.error("Error fetching data:", infographicsError || categoriesError)
  }

  // Group infographics by category
  const infographicsByCategory: Record<string, (Infographic & { categories: Category | null })[]> = {}

  if (infographics) {
    infographics.forEach((infographic) => {
      const categoryId = infographic.category_id || "uncategorized"
      if (!infographicsByCategory[categoryId]) {
        infographicsByCategory[categoryId] = []
      }
      infographicsByCategory[categoryId].push(infographic as any)
    })
  }

  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Infographics</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Visual guides and infographics to help you understand contingent workforce management
        </p>
      </div>

      {categories?.map((category) => {
        const categoryInfographics = infographicsByCategory[category.id] || []
        if (categoryInfographics.length === 0) return null

        return (
          <div key={category.id} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryInfographics.map((infographic) => (
                <Card key={infographic.id} className="overflow-hidden flex flex-col h-full">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img
                      src={infographic.image_url || "/placeholder.svg"}
                      alt={infographic.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="flex-grow p-4">
                    <h3 className="text-lg font-semibold mb-2">{infographic.title}</h3>
                    {infographic.description && <p className="text-muted-foreground">{infographic.description}</p>}
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild className="w-full">
                      <Link href={`/infographics/${infographic.slug}`}>View Infographic</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )
      })}

      {/* Show uncategorized infographics if any */}
      {infographicsByCategory["uncategorized"] && infographicsByCategory["uncategorized"].length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Other Infographics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infographicsByCategory["uncategorized"].map((infographic) => (
              <Card key={infographic.id} className="overflow-hidden flex flex-col h-full">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={infographic.image_url || "/placeholder.svg"}
                    alt={infographic.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="flex-grow p-4">
                  <h3 className="text-lg font-semibold mb-2">{infographic.title}</h3>
                  {infographic.description && <p className="text-muted-foreground">{infographic.description}</p>}
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/infographics/${infographic.slug}`}>View Infographic</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {(!infographics || infographics.length === 0) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No infographics available yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}
