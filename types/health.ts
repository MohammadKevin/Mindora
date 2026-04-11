export type HealthCategory =
  | "gejala"
  | "penyakit"
  | "diagnosa"
  | "gaya_hidup"
  | "mental"
  | "medis";

export interface HealthQA {
  id: number;
  category: HealthCategory;
  question: string;
  keywords: string[];
  response: string;
}
