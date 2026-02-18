import React from "react"
import Image from "next/image"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { PortableText } from "@/components/portable-text"
import { urlFor } from "@/sanity/lib/image"

interface FounderBioProps {
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bio: any
}

export function FounderBio({ name, image, bio }: FounderBioProps) {
    const isNote = name.toLowerCase().includes('note from')
    const displayHeading = isNote ? 'The Founder' : `About ${name}`

    return (
        <Section spacing="xl" className="bg-stone-50 border-t border-stone-100">
            <Container className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24">
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
            </Container>
        </Section>
    )
}
