"use client"

import { motion } from "framer-motion"
import {
    Heart, Activity, Moon, MessageCircle,
    UserCheck, TrendingUp, Bell, Search, Zap
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
    const userName = "Joko"

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800">

            <div className="px-6 py-4">

                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-4xl font-black text-slate-900"
                        >
                            Halo, {userName}! 👋
                        </motion.h1>
                        <p className="text-slate-500 mt-1 text-sm">
                            Gimana kabarmu hari ini? Yuk lihat perkembanganmu.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari sesuatu..."
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-56"
                            />
                        </div>

                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 relative">
                            <Bell className="w-5 h-5 text-slate-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                <p className="text-xs text-slate-400 mb-6">
                    Beberapa fitur masih dalam tahap pengembangan
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Detak Jantung" value="78" unit="BPM" status="Normal" color="red" icon={<Heart />} progress={78} />
                    <StatCard title="Langkah" value="6.542" unit="Steps" status="65% dari target" color="emerald" icon={<Activity />} progress={65} />
                    <StatCard title="Tidur" value="7h 20m" unit="Baik" status="Target 8 jam" color="blue" icon={<Moon />} progress={90} />
                    <StatCard title="Mental" value="Stabil" unit="😊" status="Kondisi baik" color="orange" icon={<Zap />} progress={85} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <TrendingUp className="text-emerald-500" />
                                Ringkasan Mingguan
                            </h3>

                            <select className="bg-slate-50 text-sm rounded-lg px-2 py-1">
                                <option>7 Hari</option>
                                <option>30 Hari</option>
                            </select>
                        </div>

                        <div className="h-40 w-full bg-gradient-to-t from-emerald-50 to-transparent rounded-xl flex items-end gap-2 p-3">
                            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex-1 bg-emerald-400/30 border-t-4 border-emerald-500 rounded-t-md"
                                />
                            ))}
                        </div>
                    </motion.div>

                    <div className="space-y-4">

                        <Link href="/chat" >
                            <ActionCard
                                title="Teman Cerita"
                                desc="Mulai ngobrol"
                                icon={<MessageCircle className="w-5 h-5" />}
                                color="bg-purple-600"
                            />
                        </Link>

                        <div className="relative opacity-70 pt-[10px]">
                            <ActionCard
                                title="Konsultasi"
                                desc="Cari bantuan profesional"
                                icon={<UserCheck className="w-5 h-5" />}
                                color="bg-teal-600"
                            />
                            <span className="absolute top-2 right-2 text-[9px] bg-white/80 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                                Segera Hadir
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

type StatCardProps = {
    title: string
    value: string
    unit: string
    status: string
    color: "red" | "emerald" | "blue" | "orange"
    icon: React.ReactNode
    progress: number
}

function StatCard({ title, value, unit, status, color, icon, progress }: StatCardProps) {
    const progressMap: Record<StatCardProps["color"], string> = {
        red: "bg-red-500",
        emerald: "bg-emerald-500",
        blue: "bg-blue-500",
        orange: "bg-orange-500"
    }

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-4 rounded-xl border border-slate-100"
        >
            <div className="flex justify-between mb-2">
                {icon}
                <span className="text-xs text-slate-400">{title}</span>
            </div>

            <h2 className="text-xl font-bold">{value}</h2>
            <p className="text-xs text-slate-500">{status}</p>

            <div className="mt-2 h-1 bg-slate-100 rounded-full">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full ${progressMap[color]}`}
                />
            </div>
        </motion.div>
    )
}

type ActionCardProps = {
    title: string
    desc: string
    icon: React.ReactNode
    color: string
}

function ActionCard({ title, desc, icon, color }: ActionCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${color} p-5 rounded-xl text-white cursor-pointer`}
        >
            <div className="mb-3">{icon}</div>
            <h4 className="font-bold">{title}</h4>
            <p className="text-sm opacity-80">{desc}</p>
        </motion.div>
    )
}