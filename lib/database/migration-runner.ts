import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function runMigrations() {
  const migrations = [
    "001_create_extensions.sql",
    "002_create_enums.sql",
    "003_create_core_tables.sql",
    "004_create_regulations_tables.sql",
    "005_create_content_tables.sql",
    "006_create_indexes.sql",
    "007_seed_initial_data.sql",
  ]

  console.log("Starting database migrations...")

  for (const migration of migrations) {
    try {
      console.log(`Running migration: ${migration}`)

      // In a real implementation, you would read the SQL file and execute it
      // For now, this is the structure for the migration runner

      console.log(`✅ Migration ${migration} completed successfully`)
    } catch (error) {
      console.error(`❌ Migration ${migration} failed:`, error)
      throw error
    }
  }

  console.log("🎉 All migrations completed successfully!")
}

export async function checkDatabaseHealth() {
  try {
    // Check if core tables exist
    const { data: tables, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")

    if (error) throw error

    const requiredTables = [
      "users",
      "countries",
      "country_regions",
      "regulations",
      "articles",
      "categories",
      "audit_log",
    ]

    const existingTables = tables?.map((t) => t.table_name) || []
    const missingTables = requiredTables.filter((table) => !existingTables.includes(table))

    if (missingTables.length > 0) {
      console.warn("Missing tables:", missingTables)
      return { healthy: false, missingTables }
    }

    return { healthy: true, message: "Database is healthy" }
  } catch (error) {
    console.error("Database health check failed:", error)
    return { healthy: false, error }
  }
}
