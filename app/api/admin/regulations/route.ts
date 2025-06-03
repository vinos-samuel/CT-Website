import type { NextRequest } from "next/server"
import { ApiResponseBuilder } from "@/lib/api/response"
import { validateRequest, CreateRegulationSchema, PaginationSchema } from "@/lib/api/validation"
import { requireAuth } from "@/lib/api/auth"
import { DatabaseService, logAuditEvent } from "@/lib/api/database"
import type { Regulation } from "@/lib/database/types"

const regulationsService = new DatabaseService<Regulation>("regulations")

export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(["admin", "editor"])(request)
    const { searchParams } = new URL(request.url)

    const paginationResult = validateRequest(PaginationSchema, Object.fromEntries(searchParams))
    if (!paginationResult.success) {
      return ApiResponseBuilder.validationError(paginationResult.errors)
    }

    const { page, limit, sortBy, sortOrder, search } = paginationResult.data

    const result = await regulationsService.findMany({
      pagination: { page, limit },
      orderBy: { column: sortBy || "sort_order", ascending: sortOrder === "asc" },
      search: search ? { column: "title", query: search } : undefined,
      filters: {
        region_id: searchParams.get("region_id") || undefined,
        status: searchParams.get("status") || undefined,
        priority: searchParams.get("priority") || undefined,
      },
    })

    return ApiResponseBuilder.paginated(result.data, {
      page,
      limit,
      total: result.total,
    })
  } catch (error) {
    console.error("Regulations GET error:", error)
    return ApiResponseBuilder.error("Failed to fetch regulations", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(["admin"])(request)
    const body = await request.json()

    const validationResult = validateRequest(CreateRegulationSchema, body)
    if (!validationResult.success) {
      return ApiResponseBuilder.validationError(validationResult.errors)
    }

    const regulationData = {
      ...validationResult.data,
      created_by: auth.user?.id,
    }

    const regulation = await regulationsService.create(regulationData)

    await logAuditEvent({
      table_name: "regulations",
      record_id: regulation.id,
      action: "create",
      new_values: regulation,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(regulation, "Regulation created successfully")
  } catch (error) {
    console.error("Regulations POST error:", error)
    return ApiResponseBuilder.error("Failed to create regulation", 500)
  }
}
