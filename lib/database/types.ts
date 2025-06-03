// Database type definitions for type safety

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor" | "viewer"
  password_hash?: string
  last_login?: string
  status: "active" | "inactive"
  preferences: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Country {
  id: string
  name: string
  slug: string
  summary: string
  key_considerations: any[]
  metadata: Record<string, any>
  status: "active" | "inactive"
  sort_order: number
  created_at: string
  updated_at: string
  created_by?: string
}

export interface CountryRegion {
  id: string
  country_id: string
  name: string
  description?: string
  sort_order: number
  status: "active" | "inactive"
  created_at: string
  updated_at: string
  created_by?: string
}

export interface Regulation {
  id: string
  region_id: string
  title: string
  description: string
  details: Record<string, any>
  status: "Compliant" | "Review Needed" | "Attention Required"
  priority: "low" | "medium" | "high" | "critical"
  last_updated: string
  effective_date?: string
  review_date?: string
  tags: string[]
  sort_order: number
  created_at: string
  updated_at: string
  created_by?: string
}

export interface Article {
  id: string
  title: string
  slug: string
  content: Record<string, any>
  excerpt?: string
  featured_image?: string
  author_id?: string
  category_id?: string
  status: "draft" | "published" | "archived"
  published_at?: string
  reading_time: number
  view_count: number
  tags: string[]
  seo_title?: string
  seo_description?: string
  created_at: string
  updated_at: string
  version: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  icon?: string
  sort_order: number
  status: "active" | "inactive"
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  table_name: string
  record_id: string
  action: "create" | "update" | "delete" | "restore"
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  user_id?: string
  ip_address?: string
  user_agent?: string
  created_at: string
  metadata: Record<string, any>
}
