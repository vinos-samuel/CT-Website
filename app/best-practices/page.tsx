"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  Search,
  ShieldCheck,
  User,
  UserCheck,
  BarChart3,
  Users,
  Laptop,
  FileCodeIcon as FileContract,
  Network,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ArticleStorage, type StoredArticle } from "@/lib/article-storage"
import { useSearchParams } from "next/navigation"

// Category definitions with proper mapping - UPDATED with Total Talent
const categories = [
  {
    id: "worker-classification",
    name: "Worker Classification",
    slug: "worker-classification",
    description: "Guidelines and best practices for properly classifying workers",
    icon: UserCheck,
  },
  {
    id: "contracting-best-practices",
    name: "Contracting Best Practices",
    slug: "contracting-best-practices",
    description: "Best practices for creating and managing contracts with non-employee workers",
    icon: FileText,
  },
  {
    id: "risk-management",
    name: "Risk Management",
    slug: "risk-management",
    description: "Strategies for identifying, assessing, and mitigating risks associated with contingent workforce",
    icon: ShieldCheck,
  },
  {
    id: "operations-management",
    name: "Operations Management",
    slug: "operations-management",
    description: "Best practices for managing day-to-day operations of your contingent workforce program",
    icon: BarChart3,
  },
  {
    id: "workforce-planning",
    name: "Workforce Planning",
    slug: "workforce-planning",
    description: "Strategic approaches to planning and forecasting your contingent workforce needs",
    icon: Users,
  },
  {
    id: "tools-technology",
    name: "Tools & Technology",
    slug: "tools-technology",
    description: "Technology solutions to streamline and optimize your contingent workforce management",
    icon: Laptop,
  },
  {
    id: "sow",
    name: "SOW",
    slug: "sow",
    description: "Guidelines for creating effective Statements of Work for project-based engagements",
    icon: FileContract,
  },
  {
    id: "total-talent",
    name: "Total Talent",
    slug: "total-talent",
    description: "Holistic approach to managing all talent types - employees, contractors, freelancers, and partners",
    icon: Network,
  },
]

// Function to clean content and extract clean excerpt
function getCleanExcerpt(content: string): string {
  // Remove HTML tags first
  let cleanText = content.replace(/<[^>]*>/g, "")

  // Remove CSS styling patterns more aggressively
  cleanText = cleanText.replace(/p\.p\d+\s*\{[^}]*\}/g, "")
  cleanText = cleanText.replace(/li\.li\d+\s*\{[^}]*\}/g, "")
  cleanText = cleanText.replace(/span\.s\d+\s*\{[^}]*\}/g, "")
  cleanText = cleanText.replace(/\w+\.\w+\d*\s*\{[^}]*\}/g, "")

  // Remove CSS properties that might be standalone
  cleanText = cleanText.replace(/margin:\s*[^;]+;?/g, "")
  cleanText = cleanText.replace(/font:\s*[^;]+;?/g, "")
  cleanText = cleanText.replace(/color:\s*[^;]+;?/g, "")
  cleanText = cleanText.replace(/font-family:\s*[^;]+;?/g, "")
  cleanText = cleanText.replace(/font-size:\s*[^;]+;?/g, "")

  // Remove any remaining CSS-like patterns
  cleanText = cleanText.replace(/\{[^}]*\}/g, "")
  cleanText = cleanText.replace(/[\d.]+px/g, "")
  cleanText = cleanText.replace(/#[a-fA-F0-9]{3,6}/g, "")

  // Remove extra whitespace and newlines
  cleanText = cleanText.replace(/\s+/g, " ").trim()

  // Remove any remaining CSS class references
  cleanText = cleanText.replace(/\b[a-z]+\.[a-z]+\d*\b/g, "")

  // Final cleanup
  cleanText = cleanText.replace(/\s+/g, " ").trim()

  // Return first 150 characters
  return cleanText.length > 150 ? cleanText.substring(0, 150) + "..." : cleanText
}

export default function BestPracticesPage() {
  const [articles, setArticles] = useState<StoredArticle[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get("category")

  useEffect(() => {
    // Load articles from storage
    const storedArticles = ArticleStorage.getArticles().filter((article) => article.status === "published")
    setArticles(storedArticles)
    setLoading(false)
  }, [])

  // Filter articles by category if one is selected
  const filteredArticles = categorySlug ? articles.filter((article) => article.category === categorySlug) : articles

  // Group articles by category for tabs view
  const articlesByCategory = categories.map((category) => {
    const categoryArticles = articles.filter((article) => article.category === category.id)

    return {
      ...category,
      articles: categoryArticles.map((article) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: getCleanExcerpt(article.content),
        author: article.author,
        date: new Date(article.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        readTime: Math.max(1, Math.ceil(article.content.replace(/<[^>]*>/g, "").length / 1000)) + " min read",
      })),
    }
  })

  if (loading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading articles...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Non Employee Workforce Best Practices</h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover expert insights, strategies, and best practices for managing your contingent workforce effectively.
            Our resources are developed by industry experts and updated regularly to reflect the latest trends and
            regulations.
          </p>
        </div>

        {/* Show category tiles only when no category is selected */}
        {!categorySlug && (
          <div className="space-y-8">
            {/* Category Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => {
                const Icon = category.icon
                const articleCount = articles.filter((article) => article.category === category.id).length

                return (
                  <Card
                    key={category.id}
                    className="flex flex-col items-center text-center p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mb-2 min-h-[3rem] leading-tight">{category.name}</CardTitle>
                    <CardDescription className="mb-4">{category.description}</CardDescription>
                    <div className="text-sm text-muted-foreground mb-4">
                      {articleCount} article{articleCount !== 1 ? "s" : ""} available
                    </div>
                    <div className="mt-auto w-full">
                      <Link href={`/best-practices?category=${category.slug}`}>
                        <Button variant="outline" className="w-full">
                          View Articles <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search best practices..."
                  className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  All Resources ({articles.length})
                </Button>
                <Button size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Latest Articles
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Show filtered articles when category is selected */}
        {categorySlug && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/best-practices">
                  <ArrowLeft className="h-4 w-4 mr-1" /> All Categories
                </Link>
              </Button>
            </div>
            <h2 className="text-2xl font-bold">
              {categories.find((c) => c.slug === categorySlug)?.name || "Category"}
            </h2>
            <p className="text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""} in this category
            </p>
          </div>
        )}

        {/* Show tabs or filtered articles */}
        {!categorySlug && articlesByCategory.some((cat) => cat.articles.length > 0) ? (
          <Tabs defaultValue={articlesByCategory.find((cat) => cat.articles.length > 0)?.id} className="w-full">
            <div className="mb-8">
              <TabsList className="w-full max-w-3xl grid grid-cols-3 bg-slate-100 dark:bg-slate-800 rounded-lg p-1.5">
                {articlesByCategory
                  .filter((cat) => cat.articles.length > 0)
                  .slice(0, 3)
                  .map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-3 py-2 text-sm font-medium h-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-md"
                    >
                      {category.name} ({category.articles.length})
                    </TabsTrigger>
                  ))}
              </TabsList>
            </div>

            {articlesByCategory
              .filter((cat) => cat.articles.length > 0)
              .map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  <div className="space-y-2 mb-6">
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.articles.map((article) => (
                      <Card key={article.id} className="flex flex-col">
                        <CardHeader>
                          <CardTitle className="mb-2 min-h-[3rem] leading-tight text-lg">{article.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <User className="h-3 w-3" /> {article.author} • <Clock className="h-3 w-3" />{" "}
                            {article.readTime}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                        </CardContent>
                        <CardFooter className="border-t pt-4">
                          <Link href={`/best-practices/${article.slug}`} className="w-full">
                            <Button className="w-full">
                              Read Article <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
          </Tabs>
        ) : (
          <div className="mt-6">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="mb-2 min-h-[3rem] leading-tight text-lg">{article.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-3 w-3" /> {article.author} • <Clock className="h-3 w-3" />
                        {Math.max(1, Math.ceil(article.content.replace(/<[^>]*>/g, "").length / 1000))} min read
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-3">{getCleanExcerpt(article.content)}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Link href={`/best-practices/${article.slug}`} className="w-full">
                        <Button className="w-full">
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-slate-50 dark:bg-slate-800">
                <p className="text-muted-foreground">
                  {categorySlug
                    ? "No articles available in this category yet. Create some in the admin panel!"
                    : "No articles available yet. Create some in the admin panel!"}
                </p>
                <Link href="/admin/articles/new">
                  <Button className="mt-4">Create First Article</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 md:p-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Need Personalized Advice?</h2>
              <p className="text-muted-foreground">
                Our AI-powered consultant can provide tailored recommendations based on your specific contingent
                workforce challenges.
              </p>
              <Button size="lg" className="mt-2">
                Chat with Our AI Consultant
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm h-64">
                <Image src="/ai-consultant.png" alt="AI Consultant" fill className="object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
