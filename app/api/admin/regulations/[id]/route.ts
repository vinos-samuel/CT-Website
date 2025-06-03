import type { NextRequest } from "next/server"
import { ApiResponseBuilder } from "@/lib/api/response"
import { validateRequest, UpdateRegulationSchema, UUIDSchema } from "@/lib/api/validation"
import { requireAuth } from "@/lib/api/auth"
import { DatabaseService, logAuditEvent } from "@/lib/api/database"
import type { Regulation } from "@/lib/database/types"

const regulationsService = new DatabaseService<Regulation>("regulations")

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(["admin", "editor", "viewer"])(request)

    const idValidation = validateRequest(UUIDSchema, params.id)
    if (!idValidation.success) {
      return ApiResponseBuilder.error("Invalid regulation ID", 400)
    }

    const regulation = await regulationsService.findById(params.id)
    if (!regulation) {
      return ApiResponseBuilder.notFound("Regulation")
    }

    return ApiResponseBuilder.success(regulation)
  } catch (error) {
    console.error("Regulation GET error:", error)
    return ApiResponseBuilder.error("Failed to fetch regulation", 500)
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(["admin"])(request)
    const body = await request.json()

    const idValidation = validateRequest(UUIDSchema, params.id)
    if (!idValidation.success) {
      return ApiResponseBuilder.error("Invalid regulation ID", 400)
    }

    const validationResult = validateRequest(UpdateRegulationSchema, body)
    if (!validationResult.success) {
      return ApiResponseBuilder.validationError(validationResult.errors)
    }

    const oldRegulation = await regulationsService.findById(params.id)
    if (!oldRegulation) {
      return ApiResponseBuilder.notFound("Regulation")
    }

    const updatedRegulation = await regulationsService.update(params.id, validationResult.data)

    await logAuditEvent({
      table_name: "regulations",
      record_id: params.id,
      action: "update",
      old_values: oldRegulation,
      new_values: updatedRegulation,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(updatedRegulation, "Regulation updated successfully")
  } catch (error) {
    console.error("Regulation PUT error:", error)
    return ApiResponseBuilder.error("Failed to update regulation", 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await requireAuth(["admin"])(request)

    const idValidation = validateRequest(UUIDSchema, params.id)
    if (!idValidation.success) {
      return ApiResponseBuilder.error("Invalid regulation ID", 400)
    }

    const oldRegulation = await regulationsService.findById(params.id)
    if (!oldRegulation) {
      return ApiResponseBuilder.notFound("Regulation")
    }

    const deletedRegulation = await regulationsService.softDelete(params.id)

    await logAuditEvent({
      table_name: "regulations",
      record_id: params.id,
      action: "delete",
      old_values: oldRegulation,
      new_values: deletedRegulation,
      user_id: auth.user?.id,
      ip_address: request.ip,
      user_agent: request.headers.get("user-agent") || undefined,
    })

    return ApiResponseBuilder.success(null, "Regulation deleted successfully")
  } catch (error) {
    console.error("Regulation DELETE error:", error)
    return ApiResponseBuilder.error("Failed to delete regulation", 500)
  }
}
