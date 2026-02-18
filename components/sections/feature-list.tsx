import React from "react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Icon } from "@/components/ui/icon"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"

interface Feature {
    title: string
    description: string
    icon: string
}

interface FeatureListProps {
    heading?: string
    features: Feature[]
}

export function FeatureList({ heading, features }: FeatureListProps) {
    return (
        <Section spacing="lg" className="bg-stone-50">
            <Container>
                {heading && (
                    <h2 className="mb-12 text-center font-serif text-3xl font-light text-stone-900 md:text-4xl">
                        {heading}
                    </h2>
                )}
                <FadeInStagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, idx) => (
                        <FadeIn key={idx} className="flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-sm ring-1 ring-stone-900/5 transition-shadow duration-300 hover:shadow-md hover:ring-stone-900/10">
                            <div className="mb-4 text-stone-900">
                                <Icon name={feature.icon} size={32} />
                            </div>
                            <h3 className="mb-2 font-serif text-xl font-medium text-stone-900">
                                {feature.title}
                            </h3>
                            <p className="text-stone-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </FadeIn>
                    ))}
                </FadeInStagger>
            </Container>
        </Section>
    )
}
