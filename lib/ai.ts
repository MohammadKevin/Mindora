import { healthQA } from "@/lib/healthQA";

type Intent = "mental" | "gejala" | "penyakit" | "gaya_hidup" | "unknown";

const normalizeWords: Record<string, string> = {
  capek: "lelah",
  cape: "lelah",
  lemes: "lemas",
  gpp: "tidak apa",
  gk: "tidak",
  ga: "tidak",
  ngga: "tidak",
  gak: "tidak",
  galau: "sedih",
  stress: "stres",
  pingin: "ingin",
  pengen: "ingin",
};

const mentalWords: string[] = [
  "sedih",
  "lelah",
  "stres",
  "cemas",
  "overthinking",
  "putus",
  "sendiri",
  "kosong",
  "takut",
  "insecure",
];

const symptomWords: string[] = [
  "pusing",
  "mual",
  "batuk",
  "demam",
  "nyeri",
  "sesak",
  "lemas",
  "sakit",
  "perut",
  "kepala",
];

const diseaseWords: string[] = [
  "diabetes",
  "lambung",
  "maag",
  "hipertensi",
  "anemia",
  "stroke",
  "asma",
];

const lifestyleWords: string[] = [
  "tidur",
  "makan",
  "olahraga",
  "diet",
  "kopi",
  "air",
  "begadang",
];

const preprocess = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .map((word) => normalizeWords[word] || word);
};

const detectIntent = (words: string[]): Intent => {
  if (words.some((w) => mentalWords.includes(w))) return "mental";
  if (words.some((w) => symptomWords.includes(w))) return "gejala";
  if (words.some((w) => diseaseWords.includes(w))) return "penyakit";
  if (words.some((w) => lifestyleWords.includes(w))) return "gaya_hidup";
  return "unknown";
};

export const getAIResponse = (text: string): string => {
  const words = preprocess(text);
  const intent = detectIntent(words);

  let bestScore = 0;
  let bestResponse: string | null = null;

  for (const item of healthQA) {
    let score = 0;

    for (const keyword of item.keywords) {
      if (words.includes(keyword)) {
        score += 2;
      }
    }

    if (item.category === intent) {
      score += 3;
    }

    if (score > bestScore) {
      bestScore = score;
      bestResponse = item.response;
    }
  }

  if (bestResponse && bestScore > 0) {
    return bestResponse;
  }

  if (intent === "mental") {
    return "Aku ngerti kamu lagi ngerasain hal berat. Mau cerita lebih lanjut?";
  }

  if (intent === "gejala") {
    return "Gejala ini bisa punya banyak penyebab. Bisa kamu jelaskan lebih detail?";
  }

  if (intent === "penyakit") {
    return "Kondisi ini perlu dipahami lebih lanjut. Kalau kamu punya gejala, sebaiknya konsultasi ke tenaga medis.";
  }

  if (intent === "gaya_hidup") {
    return "Menjaga pola hidup sehat penting untuk kesehatan tubuh dan pikiran.";
  }

  return "Aku belum sepenuhnya mengerti, coba ceritakan lebih detail ya.";
};
