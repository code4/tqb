import { client } from "@/sanity/lib/client"
import { legalPageQuery } from "@/sanity/lib/queries"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { PortableText } from "@/components/portable-text"
import { notFound } from "next/navigation"

export const revalidate = 60

interface LegalPageProps {
    params: Promise<{ slug: string }>
}

export default async function LegalPage({ params }: LegalPageProps) {
    const { slug } = await params
    let data = null
    try {
        data = await client.fetch(legalPageQuery, { slug })
    } catch (error) {
        console.error(`Error fetching legal page data for slug ${slug}:`, error)
    }

    if (!data) {
        notFound()
    }

    return (
        <Section spacing="lg">
            <Container className="max-w-3xl">
                <h1 className="mb-12 text-center font-serif text-3xl font-light text-stone-900 md:text-4xl">
                    {data.title}
                </h1>
                <div className="prose prose-stone mx-auto">
                    <PortableText value={data.content} />
                </div>
            </Container>
        </Section>
    )
}
