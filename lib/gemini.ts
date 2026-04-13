import { GoogleGenerativeAI, GenerativeModel, StartChatParams } from "@google/generative-ai";
import { ChatMessage } from "@/types/chat";

const apiKey: string | undefined = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const model: GenerativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const createChat = (history: ChatMessage[]) => {
  const systemPrompt: ChatMessage = {
    role: "user",
    parts: [
      {
        text: "Kamu adalah AI kesehatan mental bernama Mindora. Jawab dengan empati, tidak menghakimi, tidak memberi diagnosis, dan jika kondisi serius sarankan ke profesional.",
      },
    ],
  };

  const chatParams: StartChatParams = {
    history: [systemPrompt, ...history],
  };

  return model.startChat(chatParams);
};