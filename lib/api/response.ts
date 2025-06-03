import { NextResponse } from "next/server"
import type { ApiResponse, ApiError } from "./types"

export class ApiResponseBuilder {
  static success<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
    return NextResponse.json({
      success: true,
      data,
      message,
    })
  }

  static error(error: string | ApiError, status = 400): NextResponse<ApiResponse> {
    const errorObj = typeof error === "string" ? { code: "GENERIC_ERROR", message: error } : error

    return NextResponse.json(
      {
        success: false,
        error: errorObj.message,
      },
      { status },
    )
  }

  static paginated<T>(
    data: T[],
    pagination: { page: number; limit: number; total: number },
  ): NextResponse<ApiResponse<T[]>> {
    return NextResponse.json({
      success: true,
      data,
      pagination: {
        ...pagination,
        totalPages: Math.ceil(pagination.total / pagination.limit),
      },
    })
  }

  static notFound(resource = "Resource"): NextResponse<ApiResponse> {
    return this.error(`${resource} not found`, 404)
  }

  static unauthorized(): NextResponse<ApiResponse> {
    return this.error("Unauthorized access", 401)
  }

  static forbidden(): NextResponse<ApiResponse> {
    return this.error("Forbidden access", 403)
  }

  static validationError(details: any): NextResponse<ApiResponse> {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        details,
      },
      { status: 422 },
    )
  }
}
