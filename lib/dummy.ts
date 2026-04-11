import { Doctor, Message } from "@/types";

export const doctors: Doctor[] = [
  { id: "1", name: "Dr. Andi Saputra", spesialis: "Psikolog Klinis", rating: 4.8 },
  { id: "2", name: "Dr. Sinta Wijaya", spesialis: "Psikiater", rating: 4.9 },
  { id: "3", name: "Dr. Budi Rahman", spesialis: "Kesehatan Mental", rating: 4.7 },
];

export const initialMessages: Message[] = [
  { id: "1", sender: "ai", text: "Halo, aku di sini untuk kamu 💙" },
];
