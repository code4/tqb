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
        <Section spacing="lg">
            <Container className="max-w-3xl">
                <h1 className="mb-12 text-center font-serif text-4xl font-light text-stone-900 md:text-5xl">
                    {data.title}
                </h1>
                <div className="prose prose-stone mx-auto prose-lg prose-headings:font-serif prose-headings:font-light prose-p:leading-relaxed text-stone-600">
                    <PortableText value={data.content} />
                </div>
            </Container>
        </Section>
    )
}
