import { z } from "zod"

// Common validation schemas
export const UUIDSchema = z.string().uuid()
export const SlugSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(/^[a-z0-9-]+$/)
export const EmailSchema = z.string().email()

// User validation schemas
export const CreateUserSchema = z.object({
  email: EmailSchema,
  name: z.string().min(1).max(255),
  role: z.enum(["admin", "editor", "viewer"]).default("viewer"),
  password: z.string().min(8).max(100),
})

export const UpdateUserSchema = CreateUserSchema.partial().omit({ password: true })

// Country validation schemas
export const CreateCountrySchema = z.object({
  name: z.string().min(1).max(255),
  slug: SlugSchema,
  summary: z.string().min(1),
  key_considerations: z.array(z.any()).default([]),
  metadata: z.record(z.any()).default({}),
  status: z.enum(["active", "inactive"]).default("active"),
  sort_order: z.number().int().min(0).default(0),
})

export const UpdateCountrySchema = CreateCountrySchema.partial()

// Region validation schemas
export const CreateRegionSchema = z.object({
  country_id: UUIDSchema,
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  sort_order: z.number().int().min(0).default(0),
  status: z.enum(["active", "inactive"]).default("active"),
})

export const UpdateRegionSchema = CreateRegionSchema.partial().omit({ country_id: true })

// Regulation validation schemas
export const CreateRegulationSchema = z.object({
  region_id: UUIDSchema,
  title: z.string().min(1).max(500),
  description: z.string().min(1),
  details: z.record(z.any()).default({}),
  status: z.enum(["Compliant", "Review Needed", "Attention Required"]).default("Review Needed"),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  last_updated: z.string().date(),
  effective_date: z.string().date().optional(),
  review_date: z.string().date().optional(),
  tags: z.array(z.string()).default([]),
  sort_order: z.number().int().min(0).default(0),
})

export const UpdateRegulationSchema = CreateRegulationSchema.partial().omit({ region_id: true })

// Article validation schemas
export const CreateArticleSchema = z.object({
  title: z.string().min(1).max(500),
  slug: SlugSchema,
  content: z.record(z.any()),
  excerpt: z.string().optional(),
  featured_image: z.string().url().optional(),
  category_id: UUIDSchema.optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  tags: z.array(z.string()).default([]),
  seo_title: z.string().max(255).optional(),
  seo_description: z.string().optional(),
})

export const UpdateArticleSchema = CreateArticleSchema.partial()

// Category validation schemas
export const CreateCategorySchema = z.object({
  name: z.string().min(1).max(255),
  slug: SlugSchema,
  description: z.string().optional(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i)
    .optional(),
  icon: z.string().max(50).optional(),
  sort_order: z.number().int().min(0).default(0),
  status: z.enum(["active", "inactive"]).default("active"),
})

export const UpdateCategorySchema = CreateCategorySchema.partial()

// Pagination validation
export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().optional(),
})

// Validation helper function
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: any } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }
    return { success: false, errors: [{ message: "Validation failed" }] }
  }
}
