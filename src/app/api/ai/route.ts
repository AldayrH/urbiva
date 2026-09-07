export const runtime = 'nodejs'

const OLLAMA_URL = 'http://127.0.0.1:11434/api/generate'
const MODEL = 'qwen3.8:latest'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const prompt = body?.prompt

    if (typeof prompt !== 'string' || prompt.trim().length === 0) {
      return Response.json(
        { error: 'El campo "prompt" es obligatorio.' },
        { status: 400 }
      )
    }

    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()

      return Response.json(
        {
          error: 'Ollama devolvió un error.',
          details: errorText,
        },
        { status: 502 }
      )
    }

    const data = await response.json()

    return Response.json({
      response: data.response,
      model: data.model,
    })
  } catch (error) {
    console.error('Error al conectar con Ollama:', error)

    return Response.json(
      { error: 'No se pudo conectar con Ollama.' },
      { status: 500 }
    )
  }
}
