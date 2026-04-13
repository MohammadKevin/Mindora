"use client"

import { useState, useRef, useEffect } from "react"
import { Message } from "@/types"
import { generateId } from "@/lib/utils"
import { initialMessages } from "@/lib/dummy"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, Bot, RefreshCcw, Loader2 } from "lucide-react"

interface ApiResponse {
    reply: string
}

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [input, setInput] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    const sendMessage = async (customText?: string): Promise<void> => {
        const text: string = customText ?? input
        if (!text.trim() || loading) return

        const userMessage: Message = {
            id: generateId(),
            sender: "user",
            text
        }

        const updatedMessages: Message[] = [...messages, userMessage]

        setMessages(updatedMessages)
        setInput("")
        setLoading(true)

        try {
            const response = await fetch("/api/ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    history: updatedMessages.map(msg => ({
                        role: msg.sender === "user" ? "user" : "model",
                        parts: [{ text: msg.text }]
                    }))
                }),
            })

            if (!response.ok) {
                throw new Error("Request failed")
            }

            const data: ApiResponse = await response.json()

            const aiMessage: Message = {
                id: generateId(),
                sender: "ai",
                text: data.reply
            }

            setMessages(prev => [...prev, aiMessage])
        } catch {
            const errorMessage: Message = {
                id: generateId(),
                sender: "ai",
                text: "Maaf kak, Mindora lagi ada gangguan teknis. Coba tanya lagi sebentar ya."
            }

            setMessages(prev => [...prev, errorMessage])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Bot className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-800">Mindora AI</h1>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Always listening</p>
                    </div>
                </div>

                <button
                    onClick={() => setMessages(initialMessages)}
                    className="p-2 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors rounded-xl"
                >
                    <RefreshCcw size={18} />
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[550px] overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm max-w-[80%]
                                    ${msg.sender === "user"
                                        ? "bg-emerald-500 text-white rounded-tr-none"
                                        : "bg-slate-100 text-slate-700 rounded-tl-none border border-slate-200"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                            <Loader2 size={14} className="animate-spin" />
                            Mindora sedang berpikir...
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                <div className="p-4 border-t border-slate-50 flex gap-2 bg-slate-50/50">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                sendMessage()
                            }
                        }}
                        placeholder="Ceritakan keluhanmu..."
                        className="flex-1 bg-white border border-slate-200 text-[#334155] px-4 py-2.5 rounded-xl text-sm outline-none"
                    />

                    <button
                        onClick={() => sendMessage()}
                        disabled={!input.trim() || loading}
                        className="bg-emerald-500 text-white px-5 rounded-xl disabled:opacity-50 flex items-center justify-center"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-4 text-center">
                Mindora AI dapat memberikan informasi kesehatan umum. Tetap konsultasikan ke dokter untuk diagnosa medis.
            </p>

            <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-emerald-500/60 font-bold uppercase tracking-widest">
                <Sparkles size={12} />
                <span>Mindora AI v1.0</span>
            </div>
        </div>
    )
}