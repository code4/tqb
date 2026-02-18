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
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading" || status === "success"}
                    className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-400 placeholder:text-stone-400 text-stone-800 disabled:opacity-50 transition-all font-light text-sm"
                />
                <Button
                    type="submit"
                    disabled={status === "loading" || status === "success"}
                    className="h-12 sm:h-auto min-w-[120px] transition-all active:scale-95"
                >
                    {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : status === "success" ? (
                        <Check className="h-4 w-4" />
                    ) : (
                        "Subscribe"
                    )}
                </Button>
            </div>
            {message && (
                <p className={`mt-2 text-sm ${status === "error" ? "text-red-500" : "text-emerald-600"}`}>
                    {message}
                </p>
            )}
        </form>
    )
}
