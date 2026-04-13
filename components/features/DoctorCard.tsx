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
            className="relative bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition"
        >

            <div className="absolute top-3 right-3 text-[10px] bg-yellow-100 text-yellow-600 px-2 py-1 rounded-lg font-semibold">
                Coming Soon
            </div>

            <div className="flex items-center gap-4 mb-4">

                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-lg font-bold text-emerald-600">
                    {doctor.name.charAt(0)}
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

            <button
                disabled
                className="w-full flex items-center justify-center gap-2 bg-slate-200 text-slate-500 py-2.5 rounded-xl font-semibold cursor-not-allowed"
            >
                <MessageCircle size={16} />
                Belum bisa digunakan
            </button>
        </motion.div>
    )
}