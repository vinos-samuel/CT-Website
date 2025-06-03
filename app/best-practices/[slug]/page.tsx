"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { ArticleStorage, type StoredArticle } from "@/lib/article-storage"
import { notFound } from "next/navigation"

// Function to clean content from CSS styling metadata
function cleanArticleContent(content: string): string {
  let cleanContent = content

  // Remove CSS styling patterns more comprehensively
  cleanContent = cleanContent.replace(/p\.p\d+\s*\{[^}]*\}/g, "")
  cleanContent = cleanContent.replace(/li\.li\d+\s*\{[^}]*\}/g, "")
  cleanContent = cleanContent.replace(/span\.s\d+\s*\{[^}]*\}/g, "")
  cleanContent = cleanContent.replace(/\w+\.\w+\d*\s*\{[^}]*\}/g, "")

  // Remove CSS properties
  cleanContent = cleanContent.replace(/margin:\s*[\d.]+px[\s\d.px]*;?/g, "")
  cleanContent = cleanContent.replace(/font:\s*[\d.]+px[^;]*;?/g, "")
  cleanContent = cleanContent.replace(/font-family:\s*[^;]+;?/g, "")
  cleanContent = cleanContent.replace(/font-size:\s*[\d.]+px;?/g, "")
  cleanContent = cleanContent.replace(/color:\s*#[a-fA-F0-9]+;?/g, "")
  cleanContent = cleanContent.replace(/line-height:\s*[^;]+;?/g, "")
  cleanContent = cleanContent.replace(/text-align:\s*[^;]+;?/g, "")

  // Remove any remaining CSS blocks
  cleanContent = cleanContent.replace(/\{[^}]*\}/g, "")

  // Remove CSS class references that appear as text
  cleanContent = cleanContent.replace(/\b[a-z]+\.[a-z]+\d*\b/g, "")

  // Remove pixel values and color codes that appear as text
  cleanContent = cleanContent.replace(/\b[\d.]+px\b/g, "")
  cleanContent = cleanContent.replace(/#[a-fA-F0-9]{3,6}/g, "")

  // Clean up extra whitespace
  cleanContent = cleanContent.replace(/\s+/g, " ")
  cleanContent = cleanContent.replace(/>\s+</g, "><")

  return cleanContent.trim()
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<StoredArticle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const articles = ArticleStorage.getArticles()
    const foundArticle = articles.find((a) => a.slug === params.slug && a.status === "published")

    if (foundArticle) {
      setArticle(foundArticle)
    }
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return notFound()
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Calculate read time based on clean content
  const plainTextContent = article.content.replace(/<[^>]*>/g, "").replace(/p\.p\d+\s*\{[^}]*\}/g, "")
  const readTime = Math.max(1, Math.ceil(plainTextContent.length / 1000)) + " min read"

  // Clean the content for display
  const cleanContent = cleanArticleContent(article.content)

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/best-practices">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Best Practices
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{article.title}</h1>

          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-8">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{readTime}</span>
            </div>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs">
              {article.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
          </div>

          {/* Render clean HTML content with preserved formatting */}
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: cleanContent }}
              className="article-content"
              style={{
                lineHeight: "1.8",
                fontSize: "1.1rem",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            />
          </div>
        </div>

        <div className="border-t pt-8 mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No related articles found.</p>
              <Link href="/best-practices">
                <Button variant="outline" className="mt-4">
                  Browse All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
