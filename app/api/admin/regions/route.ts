import type { NextRequest } from "next/server"
import { ApiResponseBuilder } from "@/lib/api/response"
import { validateRequest, CreateRegionSchema, PaginationSchema } from "@/lib/api/validation"
import { requireAuth } from "@/lib/api/auth"
import { DatabaseService, logAuditEvent } from "@/lib/api/database"
import type { CountryRegion } from "@/lib/database/types"

const regionsService = new DatabaseService<CountryRegion>("country_regions")

// GET /api/admin/regions - List regions with pagination and search
export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(["admin", "editor"])(request)
    const { searchParams } = new URL(request.url)

    const paginationResult = validateRequest(PaginationSchema, Object.fromEntries(searchParams))
    if (!paginationResult.success) {
      return ApiResponseBuilder.validationError(paginationResult.errors)
    }

    const { page, limit, sortBy, sortOrder, search } = paginationResult.data

    const result = await regionsService.findMany({
      pagination: { page, limit },
      orderBy: { column: sortBy || "sort_order", ascending: sortOrder === "asc" },
      search: search ? { column: "name", query: search } : undefined,
      filters: {
        country_id: searchParams.get("country_id") || undefined,
        status: searchParams.get("status") || undefined,
      },
    })

    return ApiResponseBuilder.paginated(result.data, {
      page,
      limit,
      total: result.total,
    })
  } catch (error) {
    console.error("Regions GET error:", error)
    return ApiResponseBuilder.error("Failed to fetch regions", 500)
  }
}

// POST /api/admin/regions - Create new region
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(["admin"])(request)
    const body = await request.json()

    const validationResult = validateRequest(CreateRegionSchema, body)
    if (!validationResult.success) {
      return ApiResponseBuilder.validationError(validationResult.errors)
    }

    const regionData = {
      ...validationResult.data,
      created_by: auth.user?.id,
    }

    const region = await regionsService.create(regionData)

    await logAuditEvent({
      table_name: "country_regions",
      record_id: region.id,
      action: "create",
      new_values: region,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(region, "Region created successfully")
  } catch (error) {
    console.error("Regions POST error:", error)
    return ApiResponseBuilder.error("Failed to create region", 500)
  }
}
