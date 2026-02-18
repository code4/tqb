import React from "react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"

interface CTAProps {
    heading: string
    subheading?: string
    buttonText: string
    buttonLink: string
}

export function CTA({ heading, subheading, buttonText, buttonLink }: CTAProps) {
    return (
        <Section spacing="xl" className="bg-stone-50 border-t border-stone-200">
            <Container className="text-center">
                <h2 className="mb-6 font-serif text-4xl font-light text-stone-900 md:text-5xl">
                    {heading}
                </h2>
                {subheading && (
                    <p className="mx-auto mb-10 max-w-2xl text-xl text-stone-600 font-light">
                        {subheading}
                    </p>
                )}
                <Button asChild size="lg">
                    <Link href={buttonLink}>{buttonText}</Link>
                </Button>
            </Container>
        </Section>
    )
}
