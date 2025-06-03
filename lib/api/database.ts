import { createClient } from "@supabase/supabase-js"
import type { Database } from "../database/types"

// Database client with proper typing
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// Generic CRUD operations
export class DatabaseService<T extends Record<string, any>> {
  constructor(private tableName: string) {}

  async findMany(
    options: {
      filters?: Record<string, any>
      pagination?: { page: number; limit: number }
      orderBy?: { column: string; ascending: boolean }
      search?: { column: string; query: string }
    } = {},
  ) {
    let query = supabase.from(this.tableName).select("*")

    // Apply filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value)
        }
      })
    }

    // Apply search
    if (options.search) {
      query = query.ilike(options.search.column, `%${options.search.query}%`)
    }

    // Apply ordering
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending })
    }

    // Apply pagination
    if (options.pagination) {
      const { page, limit } = options.pagination
      const from = (page - 1) * limit
      const to = from + limit - 1
      query = query.range(from, to)
    }

    const { data, error, count } = await query

    if (error) throw error

    return {
      data: data as T[],
      total: count || 0,
    }
  }

  async findById(id: string): Promise<T | null> {
    const { data, error } = await supabase.from(this.tableName).select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") return null // Not found
      throw error
    }

    return data as T
  }

  async create(data: Omit<T, "id" | "created_at" | "updated_at">): Promise<T> {
    const { data: result, error } = await supabase.from(this.tableName).insert(data).select().single()

    if (error) throw error

    return result as T
  }

  async update(id: string, data: Partial<Omit<T, "id" | "created_at">>): Promise<T> {
    const updateData = {
      ...data,
      updated_at: new Date().toISOString(),
    }

    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return result as T
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(this.tableName).delete().eq("id", id)

    if (error) throw error
  }

  async softDelete(id: string): Promise<T> {
    return this.update(id, { status: "inactive" } as any)
  }
}

// Audit logging
export async function logAuditEvent(event: {
  table_name: string
  record_id: string
  action: "create" | "update" | "delete" | "restore"
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  user_id?: string
  ip_address?: string
  user_agent?: string
  metadata?: Record<string, any>
}) {
  try {
    await supabase.from("audit_log").insert({
      ...event,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Failed to log audit event:", error)
    // Don't throw - audit logging shouldn't break the main operation
  }
}
