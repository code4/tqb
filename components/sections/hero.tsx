import React from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"

interface HeroProps {
    heading: string
    subheading?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any
    ctaText?: string
    ctaLink?: string
}

export function Hero({ heading, subheading, image, ctaText, ctaLink }: HeroProps) {
    return (
        <Section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center bg-stone-50">
            {/* Subtle background grain/gradient overlay to add 'tactile' feel */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-stone-100 via-stone-50 to-stone-100 opacity-80" />
            <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-multiply" />

            <Container className="relative z-10 w-full max-w-7xl mx-auto px-4 py-20 lg:py-0">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Column: Typography & CTA */}
                    <FadeIn className="flex flex-col items-start text-left">
                        <h1 className="font-serif text-5xl font-light leading-[1.1] tracking-tight text-stone-900 md:text-6xl lg:text-7xl">
                            {heading}
                        </h1>

                        {subheading && (
                            <p className="mt-8 text-lg text-stone-600 sm:text-xl max-w-lg leading-[1.8] font-light">
                                A slow print club for women who are becoming. This is a quiet space for reflection — something to hold, read and sit with.
                            </p>
                        )}

                        {ctaText && ctaLink && (
                            <div className="flex flex-col items-start gap-8 mt-12 w-full">
                                <Button asChild size="lg" className="transition-all hover:-translate-y-1 active:scale-95 duration-500 shadow-xl shadow-stone-300/40 bg-stone-900 text-stone-50 px-10 h-14 text-lg font-light rounded-sm">
                                    <Link href={ctaLink}>{ctaText}</Link>
                                </Button>

                                <div className="flex items-center gap-4 text-sm text-stone-500 font-medium pt-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="relative h-10 w-10 rounded-full border-[3px] border-stone-50 shadow-sm overflow-hidden transform transition-transform hover:scale-110 duration-300 z-10">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={`https://i.pravatar.cc/100?img=${i + 15}`}
                                                    alt="Member"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col text-left leading-snug">
                                        <span className="text-stone-900 tracking-wide">Join 1,200+ members</span>
                                        <span className="text-xs text-stone-400 font-light">Finding their quiet place</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </FadeIn>

                    {/* Right Column: Editorial Image */}
                    <FadeIn delay={0.2} className="relative w-full max-w-md mx-auto lg:max-w-none">
                        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md shadow-2xl ring-1 ring-stone-900/5">
                            {image ? (
                                <Image
                                    src={urlFor(image).url()}
                                    alt="Quiet Bloom preview"
                                    fill
                                    className="object-cover transition-transform duration-[20s] hover:scale-105 ease-out"
                                    priority
                                />
                            ) : (
                                <Image
                                    src="https://images.unsplash.com/photo-1601614066060-e4b2dcdb66b2?q=80&w=1587&auto=format&fit=crop"
                                    alt="Quiet Bloom aesthetic"
                                    fill
                                    className="object-cover transition-transform duration-[20s] hover:scale-105 ease-out"
                                    priority
                                />
                            )}
                            {/* Inner highlight for physical feel */}
                            <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-white/20 pointer-events-none" />
                        </div>
                    </FadeIn>
                </div>
            </Container>
        </Section>
    )
}
