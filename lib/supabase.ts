import { createClient } from "@supabase/supabase-js"

// Creamos el cliente de Supabase usando las variables de entorno
const supabaseUrl = process.env.SUPABASE_URL || "https://reilyngaidrxfsoglnqz.supabase.co"
const supabaseKey =
  process.env.SUPABASE_ANON ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaWx5bmdhaWRyeGZzb2dsbnF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjU1MDQ4NSwiZXhwIjoyMDYyMTI2NDg1fQ.RNRdyJbBNYSFiBGEIBWs_F0FzFBnid1IL6b4ygRgD6M"

export const supabase = createClient(supabaseUrl, supabaseKey)

// Función para probar la conexión
export async function testConnection() {
  try {
    const { data, error } = await supabase.from("DATA_PALF_FACEBOOK").select("*").limit(1)

    if (error) {
      console.error("Error al conectar con Supabase:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error inesperado:", error)
    return { success: false, error: "Error inesperado al conectar con Supabase" }
  }
}

// Función para ejecutar consultas SQL
export async function executeQuery(query: string) {
  try {
    const { data, error } = await supabase.rpc("execute_sql", { sql_query: query })

    if (error) {
      console.error("Error al ejecutar la consulta SQL:", error)
      return { error: error.message }
    }

    return data
  } catch (error) {
    console.error("Error en la consulta SQL:", error)
    return { error: "Error al ejecutar la consulta SQL" }
  }
}

// Función para obtener datos de Facebook
export async function getFacebookData(limit = 10) {
  try {
    const { data, error } = await supabase.from("DATA_PALF_FACEBOOK").select("*").limit(limit)

    if (error) {
      console.error("Error al obtener datos de Facebook:", error)
      return { error: error.message }
    }

    return data
  } catch (error) {
    console.error("Error inesperado:", error)
    return { error: "Error al obtener datos de Facebook" }
  }
}

// Función para obtener datos de Instagram
export async function getInstagramData(limit = 10) {
  try {
    const { data, error } = await supabase.from("DATA_PALF_INSTAGRAM").select("*").limit(limit)

    if (error) {
      console.error("Error al obtener datos de Instagram:", error)
      return { error: error.message }
    }

    return data
  } catch (error) {
    console.error("Error inesperado:", error)
    return { error: "Error al obtener datos de Instagram" }
  }
}

// Las demás funciones siguen el mismo patrón...
