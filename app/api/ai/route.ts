import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { message } = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
Kamu adalah Mindora AI, asisten kesehatan mental.
Jawab dengan empati, ramah, dan tidak menghakimi.

User: ${message}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return Response.json({ reply: text });
}