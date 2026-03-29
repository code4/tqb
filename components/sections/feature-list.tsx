import React from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Icon } from "@/components/ui/icon"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"
import { SectionCTAButton } from "@/components/sections/section-cta-button"

interface Feature {
    title: string
    description: string
    icon: string
}

interface FeatureListProps {
    heading?: string
    features: Feature[]
    showNumbers?: boolean
    backgroundColor?: 'white' | 'stone' | 'stone-light'
    ctaText?: string
    ctaLink?: string
}

export function FeatureList({ heading, features, showNumbers = false, backgroundColor = 'white', ctaText, ctaLink }: FeatureListProps) {
    const bgClass = {
        'white': 'bg-white',
        'stone': 'bg-stone-50',
        'stone-light': 'bg-stone-50/30'
    }[backgroundColor]

    return (
        <Section className={`py-24 md:py-32 lg:py-40 ${bgClass}`}>
            <Container className="max-w-6xl">
                {heading && (
                    <h2 className="mb-16 text-center font-serif text-4xl font-light tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
                        {heading}
                    </h2>
                )}
                <FadeInStagger className="grid gap-8 md:gap-12 md:grid-cols-3 max-w-5xl mx-auto">
                    {features.map((feature, idx) => (
                        <FadeIn key={idx} className="flex flex-col items-start text-left p-8 md:p-10 h-full rounded-2xl bg-stone-50 border border-stone-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-stone-200/50 group">
                            <div className="mb-6 text-stone-400 group-hover:text-stone-900 transition-colors duration-500">
                                {showNumbers ? (
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-stone-200 bg-white font-serif text-xl font-light">
                                        {idx + 1}
                                    </div>
                                ) : (
                                    <Icon name={feature.icon} size={40} strokeWidth={1} />
                                )}
                            </div>
                            <h3 className="mb-4 font-serif text-xl md:text-2xl font-medium text-stone-900 leading-snug">
                                {feature.title}
                            </h3>
                            <p className="text-stone-500 font-light leading-relaxed text-sm md:text-base flex-grow">
                                {feature.description}
                            </p>
                        </FadeIn>
                    ))}
                </FadeInStagger>

                <SectionCTAButton ctaText={ctaText} ctaLink={ctaLink} />
            </Container>
        </Section>
    )
}
