import React from "react"
import Image from "next/image"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { PortableText } from "@/components/portable-text"
import { urlFor } from "@/sanity/lib/image"
import { FadeIn } from "@/components/ui/fade-in"
import { SectionCTAButton } from "@/components/sections/section-cta-button"

interface FounderBioProps {
    heading?: string
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bio: any
    backgroundColor?: 'white' | 'stone' | 'stone-light'
    ctaText?: string
    ctaLink?: string
}

export function FounderBio({ heading, name, image, bio, backgroundColor = 'stone', ctaText, ctaLink }: FounderBioProps) {
    const displayHeading = heading || name
    const bgClass = {
        'white': 'bg-white',
        'stone': 'bg-stone-50',
        'stone-light': 'bg-stone-50/30'
    }[backgroundColor]

    return (
        <Section spacing="xl" className={`${bgClass} border-t border-stone-100`}>
            <Container>
                <FadeIn>
                    <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24">
                        {image?.asset && (
                            <div className="relative aspect-[4/5] w-full max-w-md flex-shrink-0 overflow-hidden rounded-sm mx-auto lg:mx-0 shadow-2xl shadow-stone-200/50">
                                <Image
                                    src={urlFor(image).url()}
                                    alt={image.alt || name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            </div>
                        )}
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="mb-8 font-serif text-4xl font-light text-stone-900 md:text-5xl">
                                {displayHeading}
                            </h2>
                            <div className="text-stone-600 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                <PortableText value={bio} />
                            </div>
                            <div className="mt-10 font-serif text-2xl text-stone-900 italic font-light">
                                — {name}
                            </div>
                        </div>
                    </div>
                </FadeIn>

                <SectionCTAButton ctaText={ctaText} ctaLink={ctaLink} />
            </Container>
        </Section>
    )
}
