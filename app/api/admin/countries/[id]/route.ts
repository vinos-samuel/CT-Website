import type { NextRequest } from "next/server"
import { ApiResponseBuilder } from "@/lib/api/response"
import { validateRequest, UpdateCountrySchema, UUIDSchema } from "@/lib/api/validation"
import { requireAuth } from "@/lib/api/auth"
import { DatabaseService, logAuditEvent } from "@/lib/api/database"
import type { Country } from "@/lib/database/types"

const countriesService = new DatabaseService<Country>("countries")

// GET /api/admin/countries/[id] - Get single country
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(["admin", "editor", "viewer"])(request)

    const idValidation = validateRequest(UUIDSchema, params.id)
    if (!idValidation.success) {
      return ApiResponseBuilder.error("Invalid country ID", 400)
    }

    const country = await countriesService.findById(params.id)
    if (!country) {
      return ApiResponseBuilder.notFound("Country")
    }

    return ApiResponseBuilder.success(country)
  } catch (error) {
    console.error("Country GET error:", error)
    return ApiResponseBuilder.error("Failed to fetch country", 500)
  }
}

// PUT /api/admin/countries/[id] - Update country
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(["admin"])(request)
    const body = await request.json()

    const idValidation = validateRequest(UUIDSchema, params.id)
    if (!idValidation.success) {
      return ApiResponseBuilder.error("Invalid country ID", 400)
    }

    const validationResult = validateRequest(UpdateCountrySchema, body)
    if (!validationResult.success) {
      return ApiResponseBuilder.validationError(validationResult.errors)
    }

    // Get old values for audit
    const oldCountry = await countriesService.findById(params.id)
    if (!oldCountry) {
      return ApiResponseBuilder.notFound("Country")
    }

    const updatedCountry = await countriesService.update(params.id, validationResult.data)

    // Log audit event
    await logAuditEvent({
      table_name: "countries",
      record_id: params.id,
      action: "update",
      old_values: oldCountry,
      new_values: updatedCountry,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(updatedCountry, "Country updated successfully")
  } catch (error) {
    console.error("Country PUT error:", error)
    return ApiResponseBuilder.error("Failed to update country", 500)
  }
}

// DELETE /api/admin/countries/[id] - Delete country (soft delete)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(["admin"])(request)

    const idValidation = validateRequest(UUIDSchema, params.id)
    if (!idValidation.success) {
      return ApiResponseBuilder.error("Invalid country ID", 400)
    }

    // Get old values for audit
    const oldCountry = await countriesService.findById(params.id)
    if (!oldCountry) {
      return ApiResponseBuilder.notFound("Country")
    }

    // Soft delete
    const deletedCountry = await countriesService.softDelete(params.id)

    // Log audit event
    await logAuditEvent({
      table_name: "countries",
      record_id: params.id,
      action: "delete",
      old_values: oldCountry,
      new_values: deletedCountry,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(null, "Country deleted successfully")
  } catch (error) {
    console.error("Country DELETE error:", error)
    return ApiResponseBuilder.error("Failed to delete country", 500)
  }
}
