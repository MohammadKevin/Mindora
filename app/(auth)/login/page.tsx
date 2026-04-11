"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Lock, User, AlertCircle, ArrowLeft } from "lucide-react"

export default function Login() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (error) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError("")
        }
    }, [username, password])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            if (username === "Joko" && password === "joko123") {
                localStorage.setItem("user", "true")
                router.push("/dashboard")
            } else {
                setError("Username atau password salah. Silakan coba lagi.")
                setIsLoading(false)
            }
        }, 800)
    }

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
                    <h1 className="text-4xl font-black mb-3 tracking-tight">Welcome Back</h1>
                    <p className="text-white/60 font-light">
                        Lanjutkan perjalanan ketenanganmu bersama <span className="font-semibold text-white">Mindora</span>
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest ml-1 text-white/60">
                            Username
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white transition-colors" />
                            <input
                                required
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Masukkan username"
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition-all placeholder:text-white/30"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest ml-1 text-white/60">
                            Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white transition-colors" />
                            <input
                                required
                                type={show ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition-all placeholder:text-white/30"
                            />
                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                {show ? <EyeOff size={20} className="text-white/60" /> : <Eye size={20} className="text-white/60" />}
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-2 text-red-300 bg-red-500/10 p-3 rounded-xl border border-red-500/20"
                            >
                                <AlertCircle size={16} />
                                <span className="text-xs font-medium">{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="group relative w-full bg-emerald-400 text-slate-900 py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-300 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                                <span>Memverifikasi...</span>
                            </div>
                        ) : (
                            "Login ke Akun"
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-sm text-white/50">
                        Belum punya akun{" "}
                        <Link href="/register" className="text-white font-bold hover:underline underline-offset-4">
                            Daftar Sekarang
                        </Link>
                    </p>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] text-center text-white/40 uppercase tracking-[0.2em]">
                    <p>Demo: Joko | joko123</p>
                </div>

                <p className="mt-4 text-[10px] text-center text-white/30">
                    This system is currently frontend-only and not fully functional.
                </p>
            </motion.div>
        </main>
    )
}