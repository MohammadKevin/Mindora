import { healthQA } from "@/lib/healthQA";

export const getAIResponse = (text: string): string => {
  const input: string = text.toLowerCase();

  let bestResponse: string | null = null;
  let maxScore = 0;

  for (const item of healthQA) {
    let score = 0;

    for (const keyword of item.keywords) {
      if (input.includes(keyword)) {
        score += 1;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestResponse = item.response;
    }
  }

  if (bestResponse !== null) {
    return bestResponse;
  }

  if (input.includes("sedih") || input.includes("capek")) {
    return "Aku ngerti kamu lagi capek. Mau cerita lebih lanjut?";
  }

  if (input.includes("senang")) {
    return "Wah, senang dengarnya";
  }

  return "Aku belum mengerti, coba jelaskan gejalanya lebih detail";
};
