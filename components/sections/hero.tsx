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
        <Section spacing="xl" className="relative overflow-hidden">
            <Container className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
                <FadeIn className="flex flex-col items-start gap-6">
                    <h1 className="font-serif text-4xl font-light leading-[1.1] tracking-tight text-stone-900 sm:text-6xl md:text-7xl lg:text-8xl">
                        {heading}
                    </h1>
                    {subheading && (
                        <p className="text-lg text-stone-600 sm:text-xl max-w-lg leading-relaxed">
                            {subheading}
                        </p>
                    )}
                    {ctaText && ctaLink && (
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6">
                            <Button asChild size="lg" className="transition-transform hover:scale-105 active:scale-95 duration-300 shadow-xl shadow-stone-200/50">
                                <Link href={ctaLink}>{ctaText}</Link>
                            </Button>
                            <div className="flex items-center gap-3 text-sm text-stone-600">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="relative h-8 w-8 rounded-full border-2 border-white overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                                alt="Member"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="font-medium text-stone-900">Join 1,200+ members</span>
                                    <span className="text-xs text-stone-400">Finding their quiet place</span>
                                </div>
                            </div>
                        </div>
                    )}
                </FadeIn>
                <FadeIn delay={0.2} className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-stone-200 lg:order-last shadow-2xl shadow-stone-200/50">
                    {image?.asset ? (
                        <Image
                            src={urlFor(image).url()}
                            alt={image.alt || heading}
                            fill
                            className="object-cover transition-transform duration-1000 hover:scale-105"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-stone-200/50 blur-3xl" />
                            <span className="font-serif italic text-stone-400 text-lg">Image Placeholder</span>
                        </div>
                    )}
                </FadeIn>
            </Container>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-stone-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
            </div>
        </Section>
    )
}
