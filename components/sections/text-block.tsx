import React from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { PortableText } from "@/components/portable-text"

interface TextBlockProps {
    heading?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any
}

export function TextBlock({ heading, content }: TextBlockProps) {
    return (
        <Section spacing="md">
            <Container className="max-w-3xl text-center">
                {heading && (
                    <h2 className="mb-8 font-serif text-3xl font-light text-stone-900 md:text-4xl">
                        {heading}
                    </h2>
                )}
                <div className="text-left mx-auto">
                    <PortableText value={content} />
                </div>
            </Container>
        </Section>
    )
}
