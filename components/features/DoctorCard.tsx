"use client"

import { Doctor } from "@/types"
import { motion } from "framer-motion"
import { Star, MessageCircle } from "lucide-react"

type Props = {
    doctor: Doctor
}

export default function DoctorCard({ doctor }: Props) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition"
        >
            <div className="flex items-center gap-4 mb-4">

                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-lg font-bold text-emerald-600">
                    {doctor.name.charAt(3)}
                </div>

                <div>
                    <h3 className="font-bold text-slate-800">
                        {doctor.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                        {doctor.spesialis}
                    </p>
                </div>

            </div>

            <div className="flex items-center gap-1 text-yellow-500 text-sm mb-4">
                <Star size={14} fill="currentColor" />
                <span className="font-semibold text-slate-700">
                    {doctor.rating}
                </span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition">
                <MessageCircle size={16} />
                Konsultasi
            </button>
        </motion.div>
    )
}