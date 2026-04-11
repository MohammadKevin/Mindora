export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Doctor {
  id: string;
  name: string;
  spesialis: string;
  rating: number;
}

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
}

export type Mood = "😄" | "🙂" | "😐" | "😔" | "😢";
