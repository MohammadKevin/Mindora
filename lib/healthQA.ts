import { HealthQA } from "@/types/health";

export const healthQA: HealthQA[] = [
  {
    id: 1,
    category: "mental",
    question: "Aku habis diputusin dan rasanya kosong banget",
    keywords: ["putus", "kosong"],
    response:
      "Perasaan kosong setelah kehilangan seseorang itu wajar. Coba beri waktu untuk diri sendiri dan jangan memaksakan untuk cepat pulih.",
  },
  {
    id: 2,
    category: "mental",
    question: "Kenapa aku sering overthinking sebelum tidur?",
    keywords: ["overthinking"],
    response:
      "Overthinking sering muncul saat pikiran sedang tidak tenang. Coba buat rutinitas santai sebelum tidur dan hindari gadget.",
  },
  {
    id: 3,
    category: "mental",
    question: "Aku ngerasa hidupku nggak ada arah",
    keywords: ["hidup"],
    response:
      "Merasa kehilangan arah itu hal yang bisa terjadi. Coba mulai dari hal kecil yang kamu sukai dan pelan-pelan bangun tujuan.",
  },
  {
    id: 4,
    category: "mental",
    question: "Kenapa aku gampang banget cemas?",
    keywords: ["cemas"],
    response:
      "Rasa cemas bisa muncul karena tekanan atau pikiran berlebih. Latihan napas dan mengurangi beban pikiran bisa membantu.",
  },
  {
    id: 5,
    category: "mental",
    question: "Aku sering merasa nggak cukup baik",
    keywords: ["insecure"],
    response:
      "Perasaan tidak cukup baik sering muncul karena membandingkan diri. Fokus ke progres diri sendiri bisa membantu.",
  },
  {
    id: 6,
    category: "gejala",
    question: "Kenapa saya sering pusing saat bangun tidur?",
    keywords: ["pusing"],
    response:
      "Pusing saat bangun bisa karena kurang tidur, dehidrasi, atau tekanan darah. Jika sering, sebaiknya cek ke dokter.",
  },
  {
    id: 7,
    category: "gejala",
    question: "Kenapa badan saya sering lemas tanpa sebab?",
    keywords: ["lemas"],
    response:
      "Badan lemas bisa disebabkan kurang nutrisi, kurang tidur, atau anemia.",
  },
  {
    id: 8,
    category: "gejala",
    question: "Kenapa jantung saya suka berdebar tiba-tiba?",
    keywords: ["jantung"],
    response:
      "Jantung berdebar bisa dipicu stres, kafein, atau kondisi tertentu. Jika sering, periksa ke dokter.",
  },
  {
    id: 9,
    category: "penyakit",
    question: "Apa itu diabetes dan apa penyebabnya?",
    keywords: ["diabetes"],
    response:
      "Diabetes adalah kondisi gula darah tinggi karena gangguan insulin.",
  },
  {
    id: 10,
    category: "gaya_hidup",
    question: "Apakah begadang setiap hari berbahaya?",
    keywords: ["begadang"],
    response:
      "Begadang terus-menerus bisa berdampak buruk pada kesehatan fisik dan mental.",
  },

  ...[
    "Aku sering merasa kesepian walau punya teman",
    "Aku capek sama hidup yang gini-gini aja",
    "Kenapa aku susah fokus saat belajar?",
    "Aku merasa gagal dalam hidup",
    "Aku sering nangis sendiri tanpa alasan",
    "Aku takut masa depan",
    "Aku ngerasa nggak ada yang peduli sama aku",
    "Aku kehilangan semangat hidup",
    "Aku sering bandingin diri sama orang lain",
    "Aku merasa nggak berguna",
    "Kenapa aku sering sakit kepala?",
    "Kenapa perut saya sering kembung?",
    "Kenapa saya mudah lelah?",
    "Kenapa sering batuk terus?",
    "Kenapa tenggorokan saya sakit?",
    "Kenapa saya sering demam?",
    "Kenapa nafas terasa berat?",
    "Kenapa dada terasa nyeri?",
    "Apa itu asam lambung?",
    "Apa itu hipertensi?",
    "Apa itu kolesterol tinggi?",
    "Apa itu anemia?",
    "Apa itu flu?",
    "Apa itu maag?",
    "Apa itu asma?",
    "Apa itu stroke?",
    "Apakah olahraga tiap hari baik?",
    "Berapa jam tidur ideal?",
    "Berapa banyak minum air?",
    "Bagaimana cara hidup sehat?",
    "Apakah makan malam larut buruk?",
    "Bagaimana cara diet sehat?",
    "Apakah kopi berbahaya?",
    "Bagaimana menjaga kesehatan mental?",
    "Bagaimana mengurangi stres?",
    "Bagaimana cara tidur cepat?",
    "Bagaimana cara fokus belajar?",
    "Bagaimana cara mengatasi rasa malas?",
    "Bagaimana cara mengatur pola makan?",
    "Bagaimana cara menjaga imun tubuh?"
  ].map((q, index) => {
    const id = 11 + index;

    let category: HealthQA["category"] = "mental";
    if (q.includes("Kenapa") || q.includes("sering")) category = "gejala";
    if (q.includes("Apa itu")) category = "penyakit";
    if (q.includes("Bagaimana") || q.includes("Apakah") || q.includes("Berapa")) category = "gaya_hidup";
    if (q.includes("Aku")) category = "mental";

    return {
      id,
      category,
      question: q,
      keywords: q.toLowerCase().split(" "),
      response:
        category === "mental"
          ? "Perasaan seperti ini wajar terjadi. Coba beri waktu untuk diri sendiri dan jangan ragu untuk cerita ke orang terpercaya."
          : category === "gejala"
          ? "Gejala ini bisa disebabkan berbagai faktor. Jika berlanjut, sebaiknya periksa ke dokter."
          : category === "penyakit"
          ? "Kondisi ini adalah gangguan kesehatan yang perlu dipahami lebih lanjut dan bisa dicegah dengan pola hidup sehat."
          : "Menjaga pola hidup sehat penting dengan makan bergizi, olahraga, dan istirahat cukup.",
    };
  }),
];