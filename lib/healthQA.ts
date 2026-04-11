import { HealthQA } from "@/types/health";

export const healthQA: HealthQA[] = [
  {
    id: 1,
    category: "gejala",
    question: "Kenapa saya sering pusing?",
    keywords: ["pusing", "kepala"],
    response:
      "Pusing bisa disebabkan kelelahan, dehidrasi, atau tekanan darah rendah. Jika sering terjadi, sebaiknya periksa ke dokter.",
  },
  {
    id: 2,
    category: "gejala",
    question: "Kenapa badan lemas?",
    keywords: ["lemas", "capek"],
    response:
      "Badan lemas biasanya karena kurang tidur, anemia, atau kurang nutrisi. Pastikan istirahat cukup dan makan bergizi.",
  },
  {
    id: 3,
    category: "penyakit",
    question: "Apa itu diabetes?",
    keywords: ["diabetes", "gula"],
    response:
      "Diabetes adalah kondisi kadar gula darah tinggi karena tubuh tidak memproduksi atau menggunakan insulin dengan baik.",
  },
  {
    id: 4,
    category: "penyakit",
    question: "Apa itu asam lambung?",
    keywords: ["lambung", "maag"],
    response:
      "Asam lambung terjadi ketika asam naik ke kerongkongan dan menyebabkan rasa perih di dada.",
  },
  {
    id: 5,
    category: "diagnosa",
    question: "Apakah pusing berbahaya?",
    keywords: ["pusing parah"],
    response:
      "Pusing berbahaya jika disertai muntah hebat, penglihatan kabur, atau pingsan. Segera periksa jika terjadi.",
  },
  {
    id: 6,
    category: "gaya_hidup",
    question: "Berapa jam tidur ideal?",
    keywords: ["tidur"],
    response: "Orang dewasa membutuhkan 7 sampai 9 jam tidur setiap malam.",
  },
  {
    id: 7,
    category: "gaya_hidup",
    question: "Berapa banyak minum air?",
    keywords: ["air", "minum"],
    response: "Disarankan minum sekitar 2 liter atau 8 gelas per hari.",
  },
  {
    id: 8,
    category: "mental",
    question: "Cara mengatasi stres?",
    keywords: ["stress", "tekanan"],
    response:
      "Coba tarik napas dalam, olahraga ringan, dan berbicara dengan orang terpercaya.",
  },
  {
    id: 9,
    category: "mental",
    question: "Apa itu depresi?",
    keywords: ["depresi", "sedih"],
    response:
      "Depresi adalah gangguan mental dengan perasaan sedih berkepanjangan dan kehilangan minat.",
  },
  {
    id: 10,
    category: "medis",
    question: "Kapan harus ke dokter?",
    keywords: ["dokter"],
    response: "Segera ke dokter jika gejala tidak membaik atau semakin parah.",
  },
];
