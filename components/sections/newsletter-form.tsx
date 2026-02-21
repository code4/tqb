"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Check } from "lucide-react"

export function NewsletterForm() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus("loading")

        try {
            const res = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || "Something went wrong")

            setStatus("success")
            setEmail("")
            setMessage("Thank you for joining our quiet corner.")
        } catch (error) {
            setStatus("error")
            setMessage("Something went wrong. Please try again.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm relative group">
            <div className="flex items-center border-b border-stone-300 transition-colors duration-300 focus-within:border-stone-900 pb-2">
                <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading" || status === "success"}
                    className="flex-1 bg-transparent px-2 py-2 focus:outline-none placeholder:text-stone-400 text-stone-800 disabled:opacity-50 transition-all font-light text-sm md:text-base w-full"
                />
                <button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="px-4 py-2 text-stone-900 font-medium text-sm transition-all hover:text-stone-600 disabled:opacity-50 flex items-center gap-2"
                >
                    {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : status === "success" ? (
                        <Check className="h-4 w-4 text-emerald-600" />
                    ) : (
                        <span>Join &rarr;</span>
                    )}
                </button>
            </div>
            {message && (
                <p className={`absolute -bottom-8 left-0 text-sm ${status === "error" ? "text-red-500" : "text-stone-500"}`}>
                    {message}
                </p>
            )}
        </form>
    )
}
