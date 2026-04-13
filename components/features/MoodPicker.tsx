"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Mood } from "@/types"

type MoodData = {
    value: Mood
    label: string
    response: string
    tips: string
    color: string
}

export default function MoodPicker() {
    const [mood, setMood] = useState<Mood | "">("")

    const moods: MoodData[] = [
        {
            value: "😄",
            label: "Sangat Bahagia",
            response: "Energi positifmu lagi tinggi banget hari ini! ✨",
            tips: "Gunakan momentum ini untuk melakukan hal produktif atau berbagi kebahagiaan.",
            color: "from-yellow-400 to-orange-400"
        },
        {
            value: "🙂",
            label: "Senang",
            response: "Kamu berada di kondisi yang stabil dan positif 🌿",
            tips: "Pertahankan dengan aktivitas ringan seperti jalan santai atau journaling.",
            color: "from-emerald-400 to-green-500"
        },
        {
            value: "😐",
            label: "Biasa",
            response: "Hari yang netral, tidak buruk tapi juga tidak spesial.",
            tips: "Coba lakukan sesuatu kecil yang menyenangkan untuk meningkatkan mood.",
            color: "from-slate-400 to-slate-500"
        },
        {
            value: "😔",
            label: "Sedih",
            response: "Tidak apa-apa merasa seperti ini, kamu sedang berproses 🤍",
            tips: "Ambil waktu untuk diri sendiri dan jangan ragu untuk berbicara dengan orang lain.",
            color: "from-blue-400 to-indigo-500"
        },
        {
            value: "😢",
            label: "Sangat Sedih",
            response: "Kami di sini untukmu. Kamu tidak sendiri 🤍",
            tips: "Pertimbangkan untuk berbicara dengan seseorang atau gunakan AI Chat.",
            color: "from-purple-400 to-indigo-600"
        }
    ]

    const selected = moods.find((m) => m.value === mood)

    return (
        <div className="max-w-2xl mx-auto pt-2.5">

            <h1 className="text-3xl font-black text-[#222] mb-2">Mood Tracker</h1>
            <p className="text-sm text-slate-500 mb-8">
                Pilih emosi yang paling menggambarkan perasaanmu hari ini
            </p>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">

                <div className="grid grid-cols-5 gap-3">
                    {moods.map((m) => {
                        const active = mood === m.value

                        return (
                            <motion.button
                                key={m.value}
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ y: -3 }}
                                onClick={() => setMood(m.value)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all
                                ${
                                    active
                                        ? "bg-emerald-500 text-white shadow-lg scale-105"
                                        : "bg-slate-50 hover:bg-slate-100 text-slate-600"
                                }`}
                            >
                                <span className="text-3xl mb-1">{m.value}</span>
                                <span className="text-[10px] font-medium text-center">
                                    {m.label}
                                </span>
                            </motion.button>
                        )
                    })}
                </div>

                {selected && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 space-y-5"
                    >
                        <div className={`p-5 rounded-2xl text-white bg-gradient-to-r ${selected.color} shadow-lg`}>
                            <p className="text-sm font-semibold">
                                {selected.response}
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                            <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider">
                                Insight
                            </p>
                            <p className="text-sm font-medium text-slate-700">
                                {selected.tips}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">

                            <Link
                                href="/chat"
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                            >
                                🤖 Chat AI
                            </Link>

                            <div className="relative">
                                <button
                                    disabled
                                    className="w-full bg-slate-100 border border-slate-200 py-3 rounded-xl font-semibold text-slate-400 cursor-not-allowed"
                                >
                                    🩺 Cari Dokter
                                </button>

                                <span className="absolute -top-2 -right-2 text-[9px] bg-yellow-400 text-white px-2 py-0.5 rounded-md font-bold shadow">
                                    COMING SOON
                                </span>
                            </div>

                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}