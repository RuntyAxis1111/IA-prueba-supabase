// Este archivo carga las claves de API desde variables de entorno
// y las exporta para su uso en la aplicación

export function loadKeys() {
  return {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || null,
    MODEL_NAME: process.env.MODEL_NAME || null,
    SUPABASE_URL: process.env.SUPABASE_URL || null,
    SUPABASE_ANON: process.env.SUPABASE_ANON || null,
  }
}