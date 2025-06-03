// Replace zod with simple validation to avoid dependency issues
// This is a temporary fix until we can resolve the zod dependency issue

// Define basic types to replace zod schemas
type ValidationSchema = {
  validate: (data: any) => { valid: boolean; errors?: string[] }
}

// Simple validation functions
const createStringValidator = (minLength = 1, maxLength = 255) => ({
  validate: (value: any) => {
    const errors = []
    if (typeof value !== "string") {
      errors.push("Value must be a string")
      return { valid: false, errors }
    }

    if (minLength > 0 && value.length < minLength) {
      errors.push(`Value must be at least ${minLength} characters`)
    }

    if (maxLength > 0 && value.length > maxLength) {
      errors.push(`Value must be at most ${maxLength} characters`)
    }

    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined }
  },
})

const createEmailValidator = () => ({
  validate: (value: any) => {
    if (typeof value !== "string") {
      return { valid: false, errors: ["Email must be a string"] }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const valid = emailRegex.test(value)

    return {
      valid,
      errors: valid ? undefined : ["Invalid email format"],
    }
  },
})

const createUUIDValidator = () => ({
  validate: (value: any) => {
    if (typeof value !== "string") {
      return { valid: false, errors: ["UUID must be a string"] }
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    const valid = uuidRegex.test(value)

    return {
      valid,
      errors: valid ? undefined : ["Invalid UUID format"],
    }
  },
})

const createObjectValidator = (schema: Record<string, ValidationSchema>) => ({
  validate: (data: any) => {
    if (typeof data !== "object" || data === null) {
      return { valid: false, errors: ["Value must be an object"] }
    }

    const errors: string[] = []

    Object.entries(schema).forEach(([key, validator]) => {
      if (data[key] !== undefined) {
        const result = validator.validate(data[key])
        if (!result.valid && result.errors) {
          errors.push(...result.errors.map((err) => `${key}: ${err}`))
        }
      }
    })

    return { valid: errors.length === 0, errors: errors.length > 0 ? errors : undefined }
  },
})

// Export simplified validators to replace zod schemas
export const UUIDSchema = createUUIDValidator()
export const SlugSchema = createStringValidator(1, 255)
export const EmailSchema = createEmailValidator()

// Simplified validation helper function
export function validateRequest(
  schema: ValidationSchema,
  data: unknown,
): { success: true; data: any } | { success: false; errors: any } {
  const result = schema.validate(data)

  if (result.valid) {
    return { success: true, data }
  } else {
    return { success: false, errors: result.errors || ["Validation failed"] }
  }
}

// Create simplified schemas for common types
export const CreateUserSchema = createObjectValidator({
  email: EmailSchema,
  name: createStringValidator(1, 255),
  role: createStringValidator(1, 50),
  password: createStringValidator(8, 100),
})

export const UpdateUserSchema = createObjectValidator({
  email: EmailSchema,
  name: createStringValidator(1, 255),
  role: createStringValidator(1, 50),
})

export const CreateCountrySchema = createObjectValidator({
  name: createStringValidator(1, 255),
  slug: SlugSchema,
  summary: createStringValidator(1),
})

export const UpdateCountrySchema = CreateCountrySchema

export const CreateRegionSchema = createObjectValidator({
  country_id: UUIDSchema,
  name: createStringValidator(1, 255),
  description: createStringValidator(0, 1000),
})

export const UpdateRegionSchema = createObjectValidator({
  name: createStringValidator(1, 255),
  description: createStringValidator(0, 1000),
})

export const CreateRegulationSchema = createObjectValidator({
  region_id: UUIDSchema,
  title: createStringValidator(1, 500),
  description: createStringValidator(1),
})

export const UpdateRegulationSchema = createObjectValidator({
  title: createStringValidator(1, 500),
  description: createStringValidator(1),
})

export const CreateArticleSchema = createObjectValidator({
  title: createStringValidator(1, 500),
  slug: SlugSchema,
})

export const UpdateArticleSchema = CreateArticleSchema

export const CreateCategorySchema = createObjectValidator({
  name: createStringValidator(1, 255),
  slug: SlugSchema,
  description: createStringValidator(0, 1000),
})

export const UpdateCategorySchema = CreateCategorySchema

export const PaginationSchema = createObjectValidator({})
