"use client"

import { useState } from "react"
import { doctors } from "@/lib/dummy"
import DoctorCard from "@/components/features/DoctorCard"
import { Search } from "lucide-react"

export default function DoctorsPage() {
    const [search, setSearch] = useState("")

    const filtered = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="px-6 py-4 space-y-6">

                <div>
                    <h1 className="text-2xl text-[#1F2937] font-black">Konsultasi Dokter</h1>
                    <p className="text-sm text-slate-500">
                        Temukan profesional untuk membantu kesehatan mentalmu
                    </p>
                </div>

                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari dokter..."
                        className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-full outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map((doc) => (
                        <DoctorCard key={doc.id} doctor={doc} />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="text-sm text-slate-400">
                        Dokter tidak ditemukan
                    </p>
                )}
            </div>
        </div>
    )
}