"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { User, Lock, Mail, ArrowLeft, Wrench } from "lucide-react"

export default function Register() {
    return (
        <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 text-white px-6 overflow-hidden">

            <div className="absolute w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[140px] -top-40 -left-40" />
            <div className="absolute w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] -bottom-20 -right-20" />

            <Link
                href="/"
                className="absolute top-10 left-10 flex items-center gap-2 text-white/60 hover:text-white transition-all group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Kembali</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black mb-3 tracking-tight">Create Account</h1>
                    <p className="text-white/60 font-light">
                        Bergabung dengan <span className="font-semibold text-white">Mindora</span>
                    </p>
                </div>

                <div className="space-y-5 opacity-60 pointer-events-none">

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest ml-1 text-white/60">
                            Username
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                placeholder="Masukkan username"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest ml-1 text-white/60">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                placeholder="email@gmail.com"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest ml-1 text-white/60">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10"
                            />
                        </div>
                    </div>

                    <button
                        disabled
                        className="w-full bg-emerald-400 text-slate-900 py-4 rounded-2xl font-bold opacity-60 cursor-not-allowed"
                    >
                        Register (Unavailable)
                    </button>
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-300/20 text-yellow-200 text-sm flex items-center gap-3">
                    <Wrench className="w-5 h-5" />
                    <span>
                        Fitur pendaftaran sedang dalam pengembangan. Silakan gunakan akun demo untuk login.
                    </span>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/login" className="text-sm text-white underline underline-offset-4">
                        Kembali ke Login
                    </Link>
                </div>

                <p className="mt-4 text-[10px] text-center text-white/30">
                    This system is currently frontend-only and not fully functional.
                </p>
            </motion.div>
        </main>
    )
}