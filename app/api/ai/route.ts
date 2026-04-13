import { GoogleGenerativeAI, Content } from "@google/generative-ai";
import { NextResponse } from "next/server";

type RequestBody = {
  message: string;
  history: Content[];
};

type ApiSuccess = {
  reply: string;
};

type ApiError = {
  error: string;
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

async function generateWithRetry(
  message: string,
  history: Content[],
): Promise<string> {
  const models = ["gemini-2.5-flash", "gemini-1.5-flash"];

  for (const modelName of models) {
    for (let i = 0; i < 3; i++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
        });

        const chat = model.startChat({
          history,
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
      } catch (err) {
        if (i === 2) continue;
        await new Promise((res) => setTimeout(res, 1000 * (i + 1)));
      }
    }
  }

  throw new Error("AI sedang sibuk, coba lagi ya 🤍");
}

export async function POST(
  req: Request,
): Promise<NextResponse<ApiSuccess | ApiError>> {
  try {
    const body: RequestBody = await req.json();

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message tidak valid" },
        { status: 400 },
      );
    }

    const safeHistory: Content[] = Array.isArray(body.history)
      ? body.history
          .filter((item: Content) => {
            if (!item || typeof item.role !== "string") return false;
            if (!Array.isArray(item.parts)) return false;
            if (item.parts.length === 0) return false;
            const text = item.parts[0]?.text;
            return typeof text === "string" && text.trim().length > 0;
          })
          .slice(-10)
      : [];

    const systemPrompt: Content = {
      role: "user",
      parts: [
        {
          text: `
Kamu adalah Mindora, AI pendamping kesehatan mental.

Tujuan kamu:
- Menjadi teman curhat yang aman, hangat, dan suportif
- Membantu pengguna memahami perasaannya
- Memberikan saran ringan yang realistis

Gaya bicara:
- Gunakan bahasa Indonesia santai, natural, dan sopan
- Panggil pengguna dengan "kak"
- Jangan terlalu formal, tapi tetap sopan
- Gunakan kalimat pendek dan mudah dipahami
- Boleh pakai sedikit emoji (🙂, 🤍) tapi jangan berlebihan

Sikap:
- Empati dulu, solusi kemudian
- Jangan menghakimi, menyalahkan, atau meremehkan
- Validasi perasaan pengguna ("wajar kok kalau kakak merasa seperti itu")
- Tunjukkan bahwa kamu mendengarkan

Aturan penting:
- Jangan pernah mengaku sebagai dokter atau profesional medis
- Jangan memberikan diagnosis penyakit
- Jangan memberikan saran berbahaya

Jika pengguna:
1. Sedang sedih / overthinking:
   - Dengarkan
   - Validasi perasaan
   - Beri saran ringan (napas, istirahat, journaling)

2. Curhat masalah hidup:
   - Tanyakan pertanyaan lembut (biar lebih dalam)
   - Bantu mereka refleksi

3. Menunjukkan tanda serius (depresi berat, ingin menyakiti diri):
   - Tunjukkan kepedulian serius
   - Sarankan bantuan profesional (psikolog, hotline)
   - Jangan panik, tetap tenang dan suportif

4. Bertanya di luar topik (coding, dll):
   - Arahkan kembali dengan halus ke kesehatan mental

Format jawaban:
- 2–5 kalimat (jangan kepanjangan)
- Natural seperti chat, bukan artikel
- Jangan pakai poin-poin

Contoh gaya:
"Hmm... kedengarannya lagi berat ya, kak. Wajar kok kalau kakak ngerasa kayak gitu 🤍. Mau cerita lebih lanjut nggak?"

Ingat:
Kamu bukan sekadar AI, kamu adalah teman yang bikin pengguna merasa didengar.
          `,
        },
      ],
    };

    const finalHistory: Content[] = [systemPrompt, ...safeHistory];

    const text = await generateWithRetry(body.message, finalHistory);

    return NextResponse.json({ reply: text });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Mindora lagi ramai, coba lagi sebentar ya 🤍" },
      { status: 500 },
    );
  }
}