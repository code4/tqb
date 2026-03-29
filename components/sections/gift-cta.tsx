"use client"

import React from "react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/ui/fade-in"
import { Gift } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GiftCTAProps {
    heading?: string
    description?: string
    buttonText?: string
}

export function GiftCTA({
    heading = "Give the Gift of Pause",
    description = "Know someone who deserves a moment of stillness? Gift them three months of handwritten letters, delivered to their door.",
    buttonText = "Gift Someone",
}: GiftCTAProps) {
    return (
        <Section className="py-20 md:py-28 bg-white border-t border-stone-100">
            <Container className="max-w-3xl text-center">
                <FadeIn>
                    <div className="flex flex-col items-center gap-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-stone-200 bg-stone-50">
                            <Gift className="h-6 w-6 text-stone-500" strokeWidth={1.5} />
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 tracking-tight">
                            {heading}
                        </h2>
                        <p className="text-stone-500 font-light text-lg leading-relaxed max-w-xl">
                            {description}
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="rounded-full px-10 h-14 text-base font-light tracking-wide border-stone-300 text-stone-700 hover:bg-stone-900 hover:text-stone-50 hover:border-stone-900 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                        >
                            <Link href="/gift">
                                <span className="flex items-center gap-2">
                                    <Gift className="h-4 w-4" strokeWidth={1.5} />
                                    {buttonText}
                                </span>
                            </Link>
                        </Button>
                    </div>
                </FadeIn>
            </Container>
        </Section>
    )
}
