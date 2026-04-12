"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Brain, MessageCircle, UserCheck, ArrowRight, Sparkles, Heart } from "lucide-react"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 text-white selection:bg-white selection:text-emerald-700">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[140px] -top-48 -left-48" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] -bottom-24 -right-24" />
      </div>

      <Navbar />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span className="text-xs font-medium tracking-wider uppercase text-white/70">
            Your Mental Health Companion
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
        >
          Kesehatan Mental <br />
          <span className="text-emerald-300">Dimulai Dari Sini.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl mb-10 text-white/60 max-w-2xl font-light leading-relaxed"
        >
          Platform modern yang menggabungkan AI dan psikologi untuk membantu kamu memahami diri, mengelola emosi, dan menemukan ketenangan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <Link
            href="/register"
            className="group flex items-center gap-2 bg-emerald-400 text-slate-900 px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-300 transition-all active:scale-95"
          >
            Mulai Perjalanan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/login"
            className="px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm font-semibold hover:bg-white/10 transition-all"
          >
            Masuk ke Akun
          </Link>
        </motion.div>
      </section>

      {/* 🚧 PROTOTYPE NOTICE */}
      <section className="relative px-6 pb-20 z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-yellow-400/10 border border-yellow-300/20 backdrop-blur-xl p-8 rounded-3xl text-center shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300">
            🚧 Masih Tahap Prototype
          </h2>

          <p className="text-white/70 leading-relaxed mb-3">
            Website <span className="font-semibold text-white">Mindora</span> saat ini masih dalam tahap pengembangan (prototype).
          </p>

          <p className="text-white/60 text-sm leading-relaxed">
            Beberapa fitur belum sepenuhnya berfungsi karena sistem backend belum terintegrasi.
            Data yang ditampilkan, termasuk AI, masih bersifat terbatas dan berdasarkan input yang disediakan oleh developer.
          </p>

          <div className="mt-6 text-xs text-white/40">
            Versi ini dibuat untuk keperluan demo & pengembangan UI/UX.
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative px-6 pb-32 z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Heart className="w-6 h-6" />}
            title="Mood Tracker"
            desc="Visualisasikan spektrum emosimu setiap hari dengan analitik berbasis AI."
          />
          <FeatureCard
            icon={<MessageCircle className="w-6 h-6" />}
            title="AI Companion"
            desc="Teman curhat pintar yang siap mendengarkan tanpa menghakimi, 24/7."
          />
          <FeatureCard
            icon={<UserCheck className="w-6 h-6" />}
            title="Expert Consultation"
            desc="Terhubung langsung dengan profesional psikolog berlisensi secara privat."
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-6 bg-black/20 backdrop-blur-xl border-b border-white/10 z-[100]">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-emerald-600" />
        </div>
        <h1 className="font-bold text-2xl tracking-tight">Mindora</h1>
      </div>

      <div className="hidden md:flex gap-10 text-sm font-medium text-white/70">
        <a href="#features" className="hover:text-white transition">Features</a>
        <a href="#about" className="hover:text-white transition">About</a>
      </div>

      <Link
        href="/login"
        className="bg-white/10 px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-slate-900 transition font-semibold"
      >
        Login
      </Link>
    </nav>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-white/5 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/10 shadow-xl hover:bg-white/10 transition-all duration-500"
    >
      <div className="w-12 h-12 bg-emerald-400/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-400 group-hover:text-slate-900 transition-all duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-white/50 leading-relaxed text-sm">{desc}</p>
    </motion.div>
  )
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/20 backdrop-blur-md py-12 text-center z-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-left">
          <h2 className="font-bold text-xl mb-1">Mindora</h2>
          <p className="text-white/40 text-sm italic">Mindfulness in Every Step.</p>
        </div>
        <div className="text-sm text-white/40">
          <p>© 2026 Mindora</p>
          <p className="mt-1 opacity-70">
            This project is currently frontend-only and not fully functional.
          </p>
        </div>
      </div>
    </footer>
  )
}