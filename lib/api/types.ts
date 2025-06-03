// API Response types for consistent responses
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  code: string
  message: string
  details?: any
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
  search?: string
}

export interface FilterParams {
  status?: string
  category?: string
  author?: string
  dateFrom?: string
  dateTo?: string
}
