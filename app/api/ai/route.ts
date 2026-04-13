import { GoogleGenerativeAI, Content } from "@google/generative-ai"
import { NextResponse } from "next/server"

type RequestBody = {
  message: string
  history: Content[]
}

type ApiSuccess = {
  reply: string
}

type ApiError = {
  error: string
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

export async function POST(req: Request): Promise<NextResponse<ApiSuccess | ApiError>> {
  try {
    const body: RequestBody = await req.json()

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json({ error: "Message tidak valid" }, { status: 400 })
    }

    const safeHistory: Content[] = Array.isArray(body.history)
      ? body.history
          .filter((item: Content) => {
            if (!item || typeof item.role !== "string") return false
            if (!Array.isArray(item.parts)) return false
            if (item.parts.length === 0) return false
            const text = item.parts[0]?.text
            return typeof text === "string" && text.trim().length > 0
          })
          .slice(-10)
      : []

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    })

    const systemPrompt: Content = {
      role: "user",
      parts: [
        {
          text: "Kamu adalah Mindora, AI kesehatan mental. Jawab dengan empati, ramah, tidak menghakimi, dan gunakan bahasa Indonesia santai tapi sopan. Jika kondisi serius, sarankan bantuan profesional."
        }
      ]
    }

    const chat = model.startChat({
      history: [systemPrompt, ...safeHistory]
    })

    const result = await chat.sendMessage(body.message)
    const response = await result.response
    const text: string = response.text()

    return NextResponse.json({ reply: text })
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : "Server error"

    return NextResponse.json({ error: message }, { status: 500 })
  }
}