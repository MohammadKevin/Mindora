"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Smile,
    MessageCircle,
    UserCheck,
    LogOut
} from "lucide-react"

export default function Sidebar() {
    const pathname = usePathname()

    const menu = [
        {
            name: "Dashboard",
            href: "/dashboard",
            icon: <LayoutDashboard size={18} />
        },
        {
            name: "Mood Tracker",
            href: "/mood",
            icon: <Smile size={18} />
        },
        {
            name: "AI Chat",
            href: "/chat",
            icon: <MessageCircle size={18} />
        },
        {
            name: "Konsultasi",
            href: "/doctors",
            icon: <UserCheck size={18} />
        }
    ]

    return (
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-6 flex flex-col justify-between">

            <div>
                <h2 className="text-2xl font-black mb-10 text-slate-800">
                    Mindora
                </h2>

                <nav className="flex flex-col gap-2">
                    {menu.map((item) => {
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                ${isActive
                                        ? "bg-emerald-500 text-white shadow"
                                        : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem("user")
                    window.location.href = "/"
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition"
            >
                <LogOut size={18} />
                Logout
            </button>

        </aside>
    )
}