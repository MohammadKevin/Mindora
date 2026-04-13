"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, Bot, RefreshCcw, Loader2 } from "lucide-react"
import { Content } from "@google/generative-ai"

type Message = {
  id: string
  sender: "user" | "ai"
  text: string
}

const generateId = (): string => crypto.randomUUID()

const initialMessages: Message[] = [
  {
    id: generateId(),
    sender: "ai",
    text: "Halo, aku Mindora. Ceritakan apa yang kamu rasakan hari ini ya."
  }
]

type ApiResponse = {
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
      const response: Response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history: updatedMessages
            .filter((msg) => msg.text.trim().length > 0)
            .map(
              (msg): Content => ({
                role: msg.sender === "user" ? "user" : "model",
                parts: [{ text: msg.text }]
              })
            )
        })
      })

      if (!response.ok) {
        const errText: string = await response.text()
        throw new Error(errText)
      }

      const data: ApiResponse = await response.json()

      const aiMessage: Message = {
        id: generateId(),
        sender: "ai",
        text: data.reply
      }

      setMessages((prev: Message[]) => [...prev, aiMessage])
    } catch (error: unknown) {
      const message: string =
        error instanceof Error ? error.message : "Error"

      const aiMessage: Message = {
        id: generateId(),
        sender: "ai",
        text: "Mindora lagi ramai 😣 coba lagi ya sebentar 🤍"
      }

      setMessages((prev: Message[]) => [...prev, aiMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-[10px]">

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Bot className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800">Mindora AI</h1>
            <p className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">
              Safe space for you
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(initialMessages)}
          className="p-2 bg-white border border-slate-200 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all rounded-xl shadow-sm"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-slate-100 shadow-xl flex flex-col h-[560px] overflow-hidden">

        <div className="flex-1 overflow-y-auto p-6 space-y-5">

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-sm max-w-[80%] leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-tr-none shadow-emerald-500/20"
                      : "bg-white text-slate-700 rounded-tl-none border border-slate-200"
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
              Mindora lagi mikir...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-slate-100 flex gap-2 bg-white/80 backdrop-blur">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Ceritakan apa yang kamu rasakan..."
            className="flex-1 bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-400/40 transition-all"
          />

          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 rounded-xl disabled:opacity-50 flex items-center justify-center shadow-md hover:scale-[1.03] transition-all"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>

        </div>
      </div>

      <p className="text-[10px] text-slate-400 mt-4 text-center">
        Mindora AI bukan pengganti profesional. Jika butuh bantuan serius, hubungi tenaga ahli.
      </p>

      <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-emerald-500/60 font-bold uppercase tracking-widest">
        <Sparkles size={12} />
        <span>Mindora AI v1.0</span>
      </div>
    </div>
  )
}