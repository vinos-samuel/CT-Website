import type { NextRequest } from "next/server"
import { ApiResponseBuilder } from "@/lib/api/response"
import { validateRequest, CreateArticleSchema, PaginationSchema } from "@/lib/api/validation"
import { requireAuth } from "@/lib/api/auth"
import { DatabaseService, logAuditEvent } from "@/lib/api/database"
import type { Article } from "@/lib/database/types"

const articlesService = new DatabaseService<Article>("articles")

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(["admin", "editor"])(request)
    const { searchParams } = new URL(request.url)

    const paginationResult = validateRequest(PaginationSchema, Object.fromEntries(searchParams))
    if (!paginationResult.success) {
      return ApiResponseBuilder.validationError(paginationResult.errors)
    }

    const { page, limit, sortBy, sortOrder, search } = paginationResult.data

    const result = await articlesService.findMany({
      pagination: { page, limit },
      orderBy: { column: sortBy || "created_at", ascending: sortOrder === "asc" },
      search: search ? { column: "title", query: search } : undefined,
      filters: {
        category_id: searchParams.get("category_id") || undefined,
        status: searchParams.get("status") || undefined,
        author_id: searchParams.get("author_id") || undefined,
      },
    })

    return ApiResponseBuilder.paginated(result.data, {
      page,
      limit,
      total: result.total,
    })
  } catch (error) {
    console.error("Articles GET error:", error)
    return ApiResponseBuilder.error("Failed to fetch articles", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(["admin", "editor"])(request)
    const body = await request.json()

    const validationResult = validateRequest(CreateArticleSchema, body)
    if (!validationResult.success) {
      return ApiResponseBuilder.validationError(validationResult.errors)
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = JSON.stringify(validationResult.data.content).split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    const articleData = {
      ...validationResult.data,
      author_id: auth.user?.id,
      reading_time: readingTime,
      published_at: validationResult.data.status === "published" ? new Date().toISOString() : null,
    }

    const article = await articlesService.create(articleData)

    await logAuditEvent({
      table_name: "articles",
      record_id: article.id,
      action: "create",
      new_values: article,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(article, "Article created successfully")
  } catch (error) {
    console.error("Articles POST error:", error)
    return ApiResponseBuilder.error("Failed to create article", 500)
  }
}
