import { healthQA } from "@/lib/healthQA";

const normalizeWords: Record<string, string> = {
  capek: "lelah",
  cape: "lelah",
  galau: "sedih",
  stress: "stres",
  pusing: "pusing",
};

const cleanText = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .map((w) => normalizeWords[w] || w)
    .filter((w) => w.length > 2); // buang kata kecil
};

export const getAIResponse = (text: string): string => {
  const words = cleanText(text);

  let bestResponse: string | null = null;
  let maxScore = 0;

  for (const item of healthQA) {
    let score = 0;

    for (const keyword of item.keywords) {
      if (words.includes(keyword)) {
        score += 2;
      }
    }

    if (item.category === "mental" && words.includes("sedih")) {
      score += 2;
    }

    if (score > maxScore) {
      maxScore = score;
      bestResponse = item.response;
    }
  }

  if (bestResponse && maxScore > 0) {
    return bestResponse;
  }

  if (words.includes("sedih") || words.includes("lelah")) {
    return "Aku ngerti kamu lagi capek atau sedih. Mau cerita lebih lanjut?";
  }

  return "Aku belum sepenuhnya mengerti, coba jelaskan lebih detail ya.";
};