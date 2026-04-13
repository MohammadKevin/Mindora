export type ChatRole = "user" | "model";

export interface ChatPart {
  text: string;
}

export interface ChatMessage {
  role: ChatRole;
  parts: ChatPart[];
}

export interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
}