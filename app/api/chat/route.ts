import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {
  try {
    // Verificar que tenemos la API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("API key de OpenAI no configurada")
      return NextResponse.json({ error: "API key de OpenAI no configurada" }, { status: 500 })
    }

    // Crear cliente de OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    // Extraer los mensajes de la solicitud
    const { messages } = await req.json()

    // Preparar los mensajes para OpenAI
    const systemMessage = {
      role: "system",
      content: `Eres **PALF Assistant**. Tu misión:
• Genera reportes breves y accionables basados en los datos de Supabase.
• Responde SIEMPRE en español y en tono profesional/respetuoso.
• Puedes responder preguntas generales y ayudar con consultas sobre PALF.
• Si te preguntan sobre datos específicos, explica que estás trabajando en conectar con la base de datos.
• Saluda cordialmente y mantén un tono amigable pero profesional.`,
    }

    try {
      // Crear la respuesta usando OpenAI
      const stream = await openai.chat.completions.create({
        model: process.env.MODEL_NAME || "gpt-4o",
        messages: [systemMessage, ...messages],
        temperature: 0.3,
        stream: true,
      })

      // Convertir a texto plano para streaming
      const textEncoder = new TextEncoder()
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content || ""
              if (text) {
                controller.enqueue(textEncoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`))
              }
            }
            controller.enqueue(textEncoder.encode("data: [DONE]\n\n"))
            controller.close()
          } catch (error) {
            console.error("Error en el stream de OpenAI:", error)
            controller.error(error)
          }
        },
      })

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    } catch (openaiError) {
      console.error("Error de OpenAI:", openaiError)
      return NextResponse.json(
        {
          error: "Error al conectar con OpenAI",
          details: openaiError instanceof Error ? openaiError.message : String(openaiError),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error en la API de chat:", error)

    // Obtener detalles del error
    let errorMessage = "Error al procesar la solicitud"
    let errorDetails = ""

    if (error instanceof Error) {
      errorMessage = error.message
      errorDetails = error.stack || ""
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 },
    )
  }
}
