import React from "react"
import { FadeIn } from "@/components/ui/fade-in"
import { Hero } from "@/components/sections/hero"
import { TextBlock } from "@/components/sections/text-block"
import { FeatureList } from "@/components/sections/feature-list"
import { LatestPosts } from "@/components/sections/latest-posts"
import { Testimonials } from "@/components/sections/testimonials"
import { FAQ } from "@/components/sections/faq"
import { Pricing } from "@/components/sections/pricing"
import { FounderBio } from "@/components/sections/founder-bio"
import { CTA } from "@/components/sections/cta"

type Section = {
    _type: string
    _key?: string
    enabled?: boolean
    [key: string]: unknown
}

interface SectionRendererProps {
    sections: Section[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    posts?: any[]
}

export function SectionRenderer({ sections, posts }: SectionRendererProps) {
    if (!sections) return null

    return (
        <>
            {sections.map((section: Section) => {
                // Skip if not enabled
                if (section.enabled === false) return null

                const key = section._key || section._type

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const s = section as any

                const renderSection = () => {
                    switch (section._type) {
                        case 'hero':
                            return <Hero {...s} />
                        case 'textBlock':
                            return <TextBlock {...s} />
                        case 'featureList':
                            return <FeatureList {...s} />
                        case 'testimonials':
                            return <Testimonials items={s.items} heading={s.heading} />
                        case 'faqSection':
                            return <FAQ items={s.items} title={s.title} />
                        case 'pricing':
                            return <Pricing {...s} />
                        case 'latestPosts':
                            return <LatestPosts posts={posts || []} heading={s.heading} />
                        case 'founderBio':
                            return <FounderBio {...s} />
                        case 'cta':
                            return <CTA {...s} />
                        default:
                            console.warn(`Unknown section type: ${section._type}`)
                            return null
                    }
                }

                return (
                    <FadeIn key={key}>
                        {renderSection()}
                    </FadeIn>
                )
            })}
        </>
    )
}
