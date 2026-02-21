import { client } from "@/sanity/lib/client"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { PortableText } from "@/components/portable-text"
import { notFound } from "next/navigation"

// Reuse the legal page query but hardcode for manifesto
const aboutPageQuery = `*[_type == "legalPage" && slug.current == "manifesto"][0]`

export const revalidate = 60

export default async function AboutPage() {
    let data = null
    try {
        data = await client.fetch(aboutPageQuery)
    } catch (error) {
        console.error("Error fetching about page data:", error)
    }

    if (!data) {
        notFound()
    }

    return (
        <div className="relative overflow-hidden min-h-[80vh] bg-stone-50">
            {/* Subtle background grain/gradient overlay to add 'tactile' feel */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-stone-100 via-stone-50 to-stone-100 opacity-80" />
            <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-multiply" />

            <Section className="relative z-10 py-24 md:py-32 lg:py-40">
                <Container className="max-w-4xl px-4 md:px-8 flex flex-col items-center">
                    <h1 className="mb-12 font-serif text-5xl font-light tracking-tight text-stone-900 md:text-6xl lg:text-7xl">
                        {data.title}
                    </h1>
                    {/* Elegant boutique divider */}
                    <div className="h-[1px] w-16 bg-stone-300 mb-16"></div>

                    <div className="text-center mx-auto prose prose-stone prose-lg md:prose-2xl prose-p:font-serif prose-p:font-light prose-p:leading-[1.8] prose-p:text-stone-800 prose-a:text-stone-900 max-w-[65ch]">
                        <PortableText value={data.content} />
                    </div>
                </Container>
            </Section>
        </div>
    )
}
