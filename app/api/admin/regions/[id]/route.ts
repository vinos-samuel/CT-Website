import type { NextRequest } from "next/server"
import { ApiResponseBuilder } from "@/lib/api/response"
import { validateRequest, UpdateRegionSchema, UUIDSchema } from "@/lib/api/validation"
import { requireAuth } from "@/lib/api/auth"
import { DatabaseService, logAuditEvent } from "@/lib/api/database"
import type { CountryRegion } from "@/lib/database/types"

const regionsService = new DatabaseService<CountryRegion>("country_regions")

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(["admin", "editor", "viewer"])(request)

    const idValidation = validateRequest(UUIDSchema, params.id)
    if (!idValidation.success) {
      return ApiResponseBuilder.error("Invalid region ID", 400)
    }

    const region = await regionsService.findById(params.id)
    if (!region) {
      return ApiResponseBuilder.notFound("Region")
    }

    return ApiResponseBuilder.success(region)
  } catch (error) {
    console.error("Region GET error:", error)
    return ApiResponseBuilder.error("Failed to fetch region", 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(["admin"])(request)
    const body = await request.json()

    const idValidation = validateRequest(UUIDSchema, params.id)
    if (!idValidation.success) {
      return ApiResponseBuilder.error("Invalid region ID", 400)
    }

    const validationResult = validateRequest(UpdateRegionSchema, body)
    if (!validationResult.success) {
      return ApiResponseBuilder.validationError(validationResult.errors)
    }

    const oldRegion = await regionsService.findById(params.id)
    if (!oldRegion) {
      return ApiResponseBuilder.notFound("Region")
    }

    const updatedRegion = await regionsService.update(params.id, validationResult.data)

    await logAuditEvent({
      table_name: "country_regions",
      record_id: params.id,
      action: "update",
      old_values: oldRegion,
      new_values: updatedRegion,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(updatedRegion, "Region updated successfully")
  } catch (error) {
    console.error("Region PUT error:", error)
    return ApiResponseBuilder.error("Failed to update region", 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(["admin"])(request)

    const idValidation = validateRequest(UUIDSchema, params.id)
    if (!idValidation.success) {
      return ApiResponseBuilder.error("Invalid region ID", 400)
    }

    const oldRegion = await regionsService.findById(params.id)
    if (!oldRegion) {
      return ApiResponseBuilder.notFound("Region")
    }

    const deletedRegion = await regionsService.softDelete(params.id)

    await logAuditEvent({
      table_name: "country_regions",
      record_id: params.id,
      action: "delete",
      old_values: oldRegion,
      new_values: deletedRegion,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(null, "Region deleted successfully")
  } catch (error) {
    console.error("Region DELETE error:", error)
    return ApiResponseBuilder.error("Failed to delete region", 500)
  }
}
