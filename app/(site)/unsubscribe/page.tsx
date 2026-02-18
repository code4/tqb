"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function UnsubscribePage() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus("loading")
        setMessage("")

        try {
            const res = await fetch("/api/newsletter/unsubscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || "Something went wrong")

            setStatus("success")
            setMessage(data.message || "You have been successfully unsubscribed.")
        } catch (error: any) {
            setStatus("error")
            setMessage(error.message || "Something went wrong. Please try again.")
        }
    }

    return (
        <div className="min-h-[50vh] flex items-center justify-center bg-stone-50/30">
            <Section spacing="lg">
                <Container className="max-w-md">
                    <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-stone-100">
                        {status === "success" ? (
                            <div className="text-center">
                                <div className="flex justify-center mb-6 text-emerald-500">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h1 className="font-serif text-2xl text-stone-900 mb-4">You're unsubscribed</h1>
                                <p className="text-stone-600 mb-8 leading-relaxed">
                                    We're sorry to see you go. You won't receive any more reflections from us at <strong>{email}</strong>.
                                </p>
                                <Button asChild variant="outline" className="w-full h-12">
                                    <Link href="/" className="flex items-center justify-center gap-2">
                                        <ArrowLeft className="h-4 w-4" /> Back to Home
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-8">
                                    <h1 className="font-serif text-3xl text-stone-900 mb-4">Unsubscribe</h1>
                                    <p className="text-stone-600">
                                        We're sorry to see you go. Please enter your email to opt out of our reflections.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2 lowercase tracking-wide font-serif">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={status === "loading"}
                                            className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-stone-400 placeholder:text-stone-400 text-stone-800 disabled:opacity-50 transition-all font-light"
                                        />
                                    </div>

                                    {message && status === "error" && (
                                        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-sm">
                                            {message}
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full h-12 text-base"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Confirm Unsubscribe"
                                        )}
                                    </Button>

                                    <p className="text-center text-xs text-stone-400 mt-6 leading-relaxed">
                                        Changed your mind? <Link href="/blog" className="underline hover:text-stone-600 transition-colors">Keep reading</Link>
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </Container>
            </Section>
        </div>
    )
}
