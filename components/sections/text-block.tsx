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
        <Section className="py-24 md:py-32 lg:py-40 bg-stone-50/30">
            <Container className="max-w-4xl px-4 md:px-8">
                {heading && (
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="font-serif text-4xl font-light text-stone-900 md:text-5xl lg:text-6xl tracking-tight text-center">
                            {heading}
                        </h2>
                        {/* Elegant boutique divider */}
                        <div className="h-[1px] w-16 bg-stone-300 mt-10"></div>
                    </div>
                )}
                <div className="text-center mx-auto prose prose-stone prose-lg md:prose-2xl prose-p:font-serif prose-p:font-light prose-p:leading-[1.8] prose-p:text-stone-800 prose-a:text-stone-900 prose-ul:list-inside prose-ul:pl-0 prose-li:marker:text-stone-300 prose-li:font-serif prose-li:font-light prose-li:my-6 prose-li:-ml-4 max-w-[60ch]">
                    <PortableText value={content} />
                </div>
            </Container>
        </Section>
    )
}
