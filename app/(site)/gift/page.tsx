"use client"

import React, { useState } from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"
import { Gift, Loader2, Check, Heart } from "lucide-react"

const giftTiers = [
    {
        name: "Print Club (UK)",
        price: "£24",
        duration: "3 months",
        perMonth: "£8/month",
        features: [
            "3 Monthly Physical Print Letters",
            "Tangible Reflection Prompts",
            "Exclusive Art Prints",
            "UK Shipping Included",
            "A Personal Gift Message",
        ],
    },
    {
        name: "Print Club (International)",
        price: "£33",
        duration: "3 months",
        perMonth: "£11/month",
        features: [
            "3 Monthly Physical Print Letters",
            "Tangible Reflection Prompts",
            "Exclusive Art Prints",
            "International Shipping Included",
            "A Personal Gift Message",
        ],
    },
]

export default function GiftPage() {
    const [loadingTier, setLoadingTier] = useState<string | null>(null)

    async function handleGift(tierName: string) {
        setLoadingTier(tierName)
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tier: tierName, isGift: true }),
            })

            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error(data.error || "Failed to create gift checkout session")
            }
        } catch (error) {
            console.error(error)
            alert("Something went wrong. Please try again.")
        } finally {
            setLoadingTier(null)
        }
    }

    return (
        <div className="flex flex-col">
            {/* Hero */}
            <div className="relative overflow-hidden bg-stone-50 pt-20 md:pt-28 lg:pt-36 pb-16 md:pb-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-stone-100 via-stone-50 to-stone-100 opacity-80" />
                <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-multiply" />

                <Container className="relative z-10 text-center max-w-3xl px-4 flex flex-col items-center">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-stone-200 bg-white/60 backdrop-blur-sm">
                            <Gift className="h-4 w-4 text-stone-500" strokeWidth={1.5} />
                            <span className="text-sm text-stone-500 font-light tracking-wide">A Thoughtful Gift</span>
                        </div>
                    </FadeIn>

                    <FadeIn>
                        <h1 className="font-serif text-5xl font-light tracking-tight text-stone-900 md:text-6xl lg:text-7xl mb-6">
                            Give the Gift of Pause
                        </h1>
                    </FadeIn>

                    <FadeIn>
                        <div className="h-[1px] w-16 bg-stone-300 mb-8 mx-auto" />
                    </FadeIn>

                    <FadeIn>
                        <p className="text-lg md:text-xl text-stone-600 font-light leading-[1.8] max-w-2xl mx-auto mb-4">
                            Know someone who deserves a moment of stillness? Gift them three months of
                            handwritten letters, reflection prompts, and exclusive art prints — delivered
                            to their door each month.
                        </p>
                        <p className="text-base text-stone-500 font-light leading-relaxed max-w-xl mx-auto italic">
                            No account needed. No subscription for them to manage. Just three beautiful months of quiet.
                        </p>
                    </FadeIn>
                </Container>
            </div>

            {/* How it Works */}
            <Section className="py-16 md:py-20 bg-white border-t border-stone-100">
                <Container className="max-w-4xl">
                    <FadeIn>
                        <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 text-center mb-16">
                            How It Works
                        </h2>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                        {[
                            {
                                step: "1",
                                title: "Choose a Tier",
                                description: "Select UK or International shipping based on where your recipient lives.",
                            },
                            {
                                step: "2",
                                title: "Add a Personal Touch",
                                description: "Write a gift message that we'll include with their very first letter.",
                            },
                            {
                                step: "3",
                                title: "They Receive Beauty",
                                description: "For three months, a thoughtfully curated letter arrives at their door.",
                            },
                        ].map((item) => (
                            <FadeIn key={item.step} className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-stone-200 bg-stone-50 mb-6">
                                    <span className="font-serif text-lg text-stone-700 font-light">{item.step}</span>
                                </div>
                                <h3 className="font-serif text-xl text-stone-900 mb-3 font-light">{item.title}</h3>
                                <p className="text-stone-500 font-light leading-relaxed text-sm">{item.description}</p>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Gift Tiers */}
            <Section className="py-20 md:py-28 bg-stone-50" id="gift-tiers">
                <Container>
                    <FadeIn>
                        <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 text-center mb-4">
                            Choose Your Gift
                        </h2>
                        <p className="text-stone-500 font-light text-center mb-16 text-lg">
                            A one-time payment. No recurring charges.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                        {giftTiers.map((tier) => (
                            <FadeIn
                                key={tier.name}
                                className="relative flex flex-col rounded-[2rem] border border-stone-200 bg-white p-10 md:p-12 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-200/50 w-full group"
                            >
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Gift className="h-5 w-5 text-stone-400" strokeWidth={1.5} />
                                        <span className="text-sm text-stone-400 font-light tracking-wide uppercase">{tier.duration} Gift</span>
                                    </div>
                                    <h3 className="text-2xl font-serif text-stone-900 group-hover:text-stone-600 transition-colors">
                                        {tier.name}
                                    </h3>
                                    <div className="mt-6 flex items-baseline text-stone-900">
                                        <span className="text-5xl md:text-6xl font-serif font-light tracking-tight">{tier.price}</span>
                                        <span className="ml-3 text-stone-400 font-light text-sm">one-time · {tier.perMonth}</span>
                                    </div>
                                </div>

                                <ul className="mb-10 space-y-5 flex-1">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <Check className="mr-4 h-5 w-5 flex-shrink-0 text-stone-400 group-hover:text-stone-900 transition-colors duration-500 mt-0.5" strokeWidth={1.5} />
                                            <span className="text-stone-600 font-light leading-relaxed text-sm md:text-base">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className="w-full h-14 text-base font-light tracking-wide rounded-full text-stone-50 bg-stone-900 hover:bg-stone-800 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl"
                                    onClick={() => handleGift(tier.name)}
                                    disabled={loadingTier === tier.name}
                                >
                                    {loadingTier === tier.name ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Heart className="h-4 w-4" strokeWidth={1.5} />
                                            Gift This
                                        </span>
                                    )}
                                </Button>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Reassurance */}
            <Section className="py-16 md:py-20 bg-white border-t border-stone-100">
                <Container className="max-w-2xl text-center">
                    <FadeIn>
                        <p className="font-serif text-2xl md:text-3xl font-light text-stone-900 leading-relaxed mb-6">
                            &ldquo;The best gifts are the ones that give someone permission to slow down.&rdquo;
                        </p>
                        <div className="h-[1px] w-12 bg-stone-300 mx-auto mb-6" />
                        <p className="text-stone-500 font-light text-sm">
                            You will receive a confirmation email after purchase. The recipient&apos;s first letter
                            will be dispatched within the current month&apos;s cycle.
                        </p>
                    </FadeIn>
                </Container>
            </Section>
        </div>
    )
}
