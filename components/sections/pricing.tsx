"use client"

import React from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Gift, Heart } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { NewsletterForm } from "@/components/sections/newsletter-form"
import { SectionCTAButton } from "@/components/sections/section-cta-button"

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
    className?: string
    isGift?: boolean
    backgroundColor?: 'white' | 'stone' | 'stone-light'
    ctaText?: string
    ctaLink?: string
}

export function Pricing({ heading = "Membership", subheading, tiers, className, isGift = false, backgroundColor = 'stone', ctaText, ctaLink }: PricingProps) {
    const bgClass = {
        'white': 'bg-white',
        'stone': 'bg-stone-50',
        'stone-light': 'bg-stone-50/30'
    }[backgroundColor]

    // Fallback tiers if none provided
    const displayTiers = (tiers && tiers.length > 0 ? tiers : [
        {
            name: "Digital Reader",
            price: "Free",
            ctaLink: "#",
            features: ["Monthly Digital Letters", "Updates on New Releases", "A Quiet Space in Your Inbox", "Digital Reflection Prompts"],
        },
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
    ])

    const [loadingTier, setLoadingTier] = useState<string | null>(null)

    async function handleSubscribe(tierName: string) {
        setLoadingTier(tierName)
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tier: tierName, isGift }),
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
        <Section className={className || `py-24 md:py-32 lg:py-40 ${bgClass}`} id="pricing">
            <Container>
                {(heading || subheading) && (
                    <FadeIn>
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            {heading && (
                                <h2 className="font-serif text-4xl font-light text-stone-900 md:text-5xl lg:text-6xl tracking-tight">
                                    {heading}
                                </h2>
                            )}
                            {subheading && (
                                <p className="mt-6 text-stone-600 text-lg md:text-xl font-light leading-relaxed">{subheading}</p>
                            )}
                        </div>
                    </FadeIn>
                )}

                <FadeInStagger className={`grid grid-cols-1 md:grid-cols-2 ${displayTiers.length === 3 ? "lg:grid-cols-3" : "max-w-4xl"} gap-8 md:gap-12 max-w-7xl mx-auto`}>
                    {displayTiers.map((tier) => {
                        return (
                            <FadeIn
                                key={tier.name}
                                className="relative flex flex-col rounded-[2rem] border border-stone-200 bg-white p-10 md:p-12 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-200/50 w-full group"
                            >
                                <div className="mb-8">
                                    {isGift && (
                                        <div className="flex items-center gap-3 mb-2">
                                            <Gift className="h-5 w-5 text-stone-400" strokeWidth={1.5} />
                                            <span className="text-sm text-stone-400 font-light tracking-wide uppercase">3 Months Gift</span>
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-serif text-stone-900 group-hover:text-stone-600 transition-colors">{tier.name}</h3>
                                    <div className="mt-6 flex items-baseline text-stone-900">
                                        <span className="text-5xl md:text-6xl font-serif font-light tracking-tight">{tier.price}</span>
                                        <span className="ml-2 text-stone-500 font-light">
                                            {isGift ? "one-time" : "/month"}
                                        </span>
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

                                {tier.price.toLowerCase() === 'free' || tier.price === '£0' || tier.price === '$0' ? (
                                    <Dialog>
                                        <DialogTrigger
                                            className="w-full h-14 inline-flex items-center justify-center text-base font-medium tracking-wide rounded-full text-stone-50 bg-stone-900 hover:bg-stone-800 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 cursor-pointer"
                                        >
                                            {tier.ctaText || 'Join (Free)'}
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md bg-stone-50 border-stone-200">
                                            <DialogHeader>
                                                <DialogTitle className="font-serif text-2xl font-light text-stone-900">Become a Digital Reader</DialogTitle>
                                                <DialogDescription className="text-stone-500 font-light text-base mt-2">
                                                    Join our quiet corner of the internet. We send occasional, thoughtful newsletters and updates on new print releases.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex flex-col items-center py-6">
                                                <NewsletterForm />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    <Button
                                        className="w-full h-14 text-base font-light tracking-wide rounded-full text-stone-50 bg-stone-900 hover:bg-stone-800 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-md hover:shadow-xl"
                                        onClick={() => handleSubscribe(tier.name)}
                                        disabled={loadingTier === tier.name}
                                    >
                                        {loadingTier === tier.name ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            isGift ? (
                                                <span className="flex items-center gap-2">
                                                    <Heart className="h-4 w-4" strokeWidth={1.5} />
                                                    {tier.ctaText || 'Gift This'}
                                                </span>
                                            ) : (
                                                tier.name.includes('International') ? 'Join (International)' :
                                                    tier.name.includes('UK') ? 'Join (UK)' :
                                                        (tier.ctaText || 'Subscribe')
                                            )
                                        )}
                                    </Button>
                                )}
                            </FadeIn>
                        )
                    })}
                </FadeInStagger>

                <SectionCTAButton ctaText={ctaText} ctaLink={ctaLink} />
            </Container>
        </Section>
    )
}
