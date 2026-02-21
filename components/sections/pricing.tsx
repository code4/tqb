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
        <Section spacing="lg" id="pricing">
            <Container>
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="font-serif text-3xl font-light text-stone-900 md:text-4xl">
                        {heading}
                    </h2>
                    {subheading && (
                        <p className="mt-4 text-stone-600">{subheading}</p>
                    )}
                </div>

                <FadeInStagger className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
                    {displayTiers.map((tier) => {
                        return (
                            <FadeIn
                                key={tier.name}
                                className="relative flex flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-all hover:shadow-md w-full max-w-sm"
                            >
                                <div className="mb-6">
                                    <h3 className="text-xl font-medium text-stone-900">{tier.name}</h3>
                                    <div className="mt-4 flex items-baseline text-stone-900">
                                        <span className="text-4xl font-serif font-light tracking-tight">{tier.price}</span>
                                        <span className="ml-1 text-stone-500">/month</span>
                                    </div>
                                </div>
                                <ul className="mb-8 space-y-4 flex-1">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <Check className="mr-3 h-5 w-5 flex-shrink-0 text-stone-900" />
                                            <span className="text-stone-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => handleSubscribe(tier.name)}
                                    disabled={loadingTier === tier.name}
                                >
                                    {loadingTier === tier.name ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        tier.ctaText || 'Subscribe'
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
