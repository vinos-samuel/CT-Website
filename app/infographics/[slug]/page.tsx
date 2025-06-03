import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import type { Database } from "@/lib/supabase/database.types"
import { format } from "date-fns"

export const revalidate = 3600 // Revalidate every hour

export default async function InfographicPage({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies })

  // Fetch the infographic
  const { data: infographic, error } = await supabase
    .from("infographics")
    .select(`*, categories(name, slug)`)
    .eq("slug", params.slug)
    .eq("status", "published")
    .single()

  if (error || !infographic) {
    console.error("Error fetching infographic:", error)
    notFound()
  }

  // Format the date
  const formattedDate = infographic.published_at ? format(new Date(infographic.published_at), "MMMM d, yyyy") : null

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/infographics">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Infographics
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{infographic.title}</h1>
          {infographic.categories && (
            <div className="mb-2">
              <Link
                href={`/best-practices?category=${(infographic.categories as any).slug}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {(infographic.categories as any).name}
              </Link>
            </div>
          )}
          {formattedDate && <p className="text-sm text-muted-foreground">Published on {formattedDate}</p>}
        </div>

        {infographic.description && (
          <div className="mb-8">
            <p className="text-lg">{infographic.description}</p>
          </div>
        )}

        <div className="mb-8 border rounded-lg overflow-hidden">
          <img src={infographic.image_url || "/placeholder.svg"} alt={infographic.title} className="w-full h-auto" />
        </div>

        <div className="flex justify-center">
          <Button asChild>
            <a href={infographic.image_url} download target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download Infographic
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
