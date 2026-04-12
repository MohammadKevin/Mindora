import { getAIResponse } from "./ai";

export const getSmartResponse = async (text: string) => {
  const local = getAIResponse(text);

  if (
    local !==
    "Aku belum sepenuhnya mengerti. Bisa ceritakan lebih detail apa yang kamu rasakan atau alami?"
  ) {
    return local;
  }

  const res = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({ message: text }),
  });

  const data = await res.json();
  return data.reply;
};
