"use client"

import React from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import { useState } from "react"

// Reuse types from Sanity schema or generic
interface Tier {
    name: string
    price: string
    ctaLink: string
    ctaText?: string
    features: string[]
    recommended?: boolean
}

interface PricingProps {
    heading?: string
    subheading?: string
    tiers?: Tier[]
}

export function Pricing({ heading = "Membership", subheading, tiers }: PricingProps) {
    // Fallback tiers if none provided, and filter out any "Free" or "Digital Reader" tiers from Sanity
    const displayTiers = (tiers || [
        {
            name: "Print Club (UK)",
            price: "£8",
            ctaLink: process.env.NEXT_PUBLIC_STRIPE_UK_URL || "#",
            features: ["Monthly Physical Print Mail", "Tangible Reflection Prompts", "Exclusive Art Prints", "UK Shipping Included", "A Moment of True Pause"],
        },
        {
            name: "Print Club (International)",
            price: "£11",
            ctaLink: process.env.NEXT_PUBLIC_STRIPE_INTL_URL || "#",
            features: ["Monthly Physical Print Mail", "Tangible Reflection Prompts", "Exclusive Art Prints", "International Shipping Included", "A Moment of True Pause"],
        }
    ]).filter(tier =>
        tier.name.toLowerCase() !== 'digital reader' &&
        tier.price.toLowerCase() !== 'free' &&
        tier.price !== '$0' && tier.price !== '£0'
    )

    const [loadingTier, setLoadingTier] = useState<string | null>(null)

    async function handleSubscribe(tierName: string) {
        setLoadingTier(tierName)
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tier: tierName }),
            })

            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error(data.error || "Failed to create checkout session")
            }
        } catch (error) {
            console.error(error)
            alert("Something went wrong. Please try again.")
        } finally {
            setLoadingTier(null)
        }
    }

    return (
        <Section className="py-24 md:py-32 lg:py-40 bg-stone-50" id="pricing">
            <Container>
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="font-serif text-4xl font-light text-stone-900 md:text-5xl lg:text-6xl tracking-tight">
                        {heading}
                    </h2>
                    {subheading && (
                        <p className="mt-6 text-stone-600 text-lg md:text-xl font-light leading-relaxed">{subheading}</p>
                    )}
                </div>

                <FadeInStagger className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-7xl mx-auto">
                    {displayTiers.map((tier) => {
                        return (
                            <FadeIn
                                key={tier.name}
                                className="relative flex flex-col rounded-[2rem] border border-stone-200 bg-white p-10 md:p-12 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-200/50 w-full max-w-md group"
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-serif text-stone-900 group-hover:text-stone-600 transition-colors">{tier.name}</h3>
                                    <div className="mt-6 flex items-baseline text-stone-900">
                                        <span className="text-5xl md:text-6xl font-serif font-light tracking-tight">{tier.price}</span>
                                        <span className="ml-2 text-stone-500 font-light">/month</span>
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
                                    onClick={() => handleSubscribe(tier.name)}
                                    disabled={loadingTier === tier.name}
                                >
                                    {loadingTier === tier.name ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        tier.name.includes('International') ? 'Join (International)' :
                                            tier.name.includes('UK') ? 'Join (UK)' :
                                                (tier.ctaText || 'Subscribe')
                                    )}
                                </Button>
                            </FadeIn>
                        )
                    })}
                </FadeInStagger>
            </Container>
        </Section>
    )
}
