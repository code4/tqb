import React from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { NewsletterForm } from "@/components/sections/newsletter-form"

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
    // Fallback tiers if none provided
    const displayTiers = tiers || [
        {
            name: "Free",
            price: "$0",
            ctaLink: "#",
            features: ["Weekly Newsletter", "Community Access"],
            recommended: false
        },
        {
            name: "Patron",
            price: "$10",
            ctaLink: "#",
            features: ["Everything in Free", "Early Access", "Sticker Pack"],
            recommended: true
        }
    ]

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

                <FadeInStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 max-w-7xl mx-auto">
                    {displayTiers.map((tier) => {
                        const isFreeTier = tier.price === "Free" || tier.price === "$0" || tier.name.toLowerCase().includes("digital")

                        return (
                            <FadeIn
                                key={tier.name}
                                className={`relative flex flex-col rounded-2xl border p-8 shadow-sm transition-all hover:shadow-md ${tier.recommended ? 'border-stone-900 bg-stone-50' : 'border-stone-200 bg-white'}`}
                            >
                                {tier.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-stone-900 px-4 py-1 text-xs font-medium text-white shadow-sm">
                                        Recommended
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-xl font-medium text-stone-900">{tier.name}</h3>
                                    <div className="mt-4 flex items-baseline text-stone-900">
                                        <span className="text-4xl font-serif font-light tracking-tight">{tier.price}</span>
                                        {!isFreeTier && <span className="ml-1 text-stone-500">/month</span>}
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

                                {isFreeTier ? (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="w-full">
                                                {tier.ctaText || 'Join for Free'}
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Join our Quiet Corner</DialogTitle>
                                                <DialogDescription>
                                                    Subscribe to receive our latest reflections and updates directly in your inbox.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="pt-4">
                                                <NewsletterForm />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    <Button asChild variant={tier.recommended ? 'primary' : 'outline'} className="w-full">
                                        <a href={tier.ctaLink}>{tier.ctaText || 'Subscribe'}</a>
                                    </Button>
                                )}
                            </FadeIn>
                        )
                    })}
                </FadeInStagger>
            </Container>
        </Section>
    )
}
