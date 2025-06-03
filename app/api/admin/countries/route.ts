import type { NextRequest } from "next/server"
import { ApiResponseBuilder } from "@/lib/api/response"
import { validateRequest, CreateCountrySchema, PaginationSchema } from "@/lib/api/validation"
import { requireAuth } from "@/lib/api/auth"
import { DatabaseService, logAuditEvent } from "@/lib/api/database"
import type { Country } from "@/lib/database/types"

const countriesService = new DatabaseService<Country>("countries")

// GET /api/admin/countries - List countries with pagination and search
export async function GET(request: NextRequest) {
  try {
    const auth = await requireAuth(["admin", "editor"])(request)
    const { searchParams } = new URL(request.url)

    const paginationResult = validateRequest(PaginationSchema, Object.fromEntries(searchParams))
    if (!paginationResult.success) {
      return ApiResponseBuilder.validationError(paginationResult.errors)
    }

    const { page, limit, sortBy, sortOrder, search } = paginationResult.data

    const result = await countriesService.findMany({
      pagination: { page, limit },
      orderBy: { column: sortBy || "sort_order", ascending: sortOrder === "asc" },
      search: search ? { column: "name", query: search } : undefined,
      filters: {
        status: searchParams.get("status") || undefined,
      },
    })

    return ApiResponseBuilder.paginated(result.data, {
      page,
      limit,
      total: result.total,
    })
  } catch (error) {
    console.error("Countries GET error:", error)
    return ApiResponseBuilder.error("Failed to fetch countries", 500)
  }
}

// POST /api/admin/countries - Create new country
export async function POST(request: NextRequest) {
  try {
    const auth = await requireAuth(["admin"])(request)
    const body = await request.json()

    const validationResult = validateRequest(CreateCountrySchema, body)
    if (!validationResult.success) {
      return ApiResponseBuilder.validationError(validationResult.errors)
    }

    const countryData = {
      ...validationResult.data,
      created_by: auth.user?.id,
    }

    const country = await countriesService.create(countryData)

    // Log audit event
    await logAuditEvent({
      table_name: "countries",
      record_id: country.id,
      action: "create",
      new_values: country,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(country, "Country created successfully")
  } catch (error) {
    console.error("Countries POST error:", error)
    return ApiResponseBuilder.error("Failed to create country", 500)
  }
}
