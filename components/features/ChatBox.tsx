"use client"

import { useState, useRef, useEffect } from "react"
import { Message } from "@/types"
import { generateId } from "@/lib/utils"
import { initialMessages } from "@/lib/dummy"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, Bot, RefreshCcw } from "lucide-react"
import { getAIResponse } from "@/lib/aiResponse"

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [input, setInput] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    const sendMessage = (customText?: string): void => {
        const text: string = customText ?? input
        if (!text.trim()) return

        const userMessage: Message = {
            id: generateId(),
            sender: "user",
            text
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setLoading(true)

        setTimeout(() => {
            const aiMessage: Message = {
                id: generateId(),
                sender: "ai",
                text: getAIResponse(text)
            }

            setMessages((prev) => [...prev, aiMessage])
            setLoading(false)
        }, 800)
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
                        <p className="text-[10px] text-slate-400">Always listening</p>
                    </div>
                </div>

                <button
                    onClick={() => setMessages(initialMessages)}
                    className="p-2 hover:bg-emerald-50 rounded-xl"
                >
                    <RefreshCcw size={18} />
                </button>
            </div>

            <div className="bg-white rounded-3xl border shadow-sm flex flex-col h-[550px] overflow-hidden">

                <div className="flex-1 overflow-y-auto p-6 space-y-5">

                    {messages.length === 0 && (
                        <div className="text-center text-slate-400 text-sm mt-10">
                            Mulai percakapan dengan Mindora AI
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${
                                    msg.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-2xl text-sm max-w-[75%]
                                    ${
                                        msg.sender === "user"
                                            ? "bg-emerald-500 text-white"
                                            : "bg-slate-100 text-slate-700"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <div className="text-sm text-slate-400">
                            AI sedang mengetik
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                <div className="p-4 border-t flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                sendMessage()
                            }
                        }}
                        placeholder="Ceritakan keluhanmu"
                        className="flex-1 bg-slate-50 text-[#334155] px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    <button
                        onClick={() => sendMessage()}
                        disabled={!input.trim() || loading}
                        className="bg-emerald-500 text-white px-4 rounded-xl disabled:opacity-50"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center">
                AI berbasis rule dengan dataset kesehatan
            </p>

            <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-slate-400">
                <Sparkles size={12} />
                <span>Mindora AI</span>
            </div>
        </div>
    )
}