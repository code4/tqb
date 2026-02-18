import { client } from "@/sanity/lib/client"
import { subscribePageQuery } from "@/sanity/lib/queries"
import { Pricing } from "@/components/sections/pricing"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SubscribePage() {
    let data = null

    try {
        data = await client.fetch(subscribePageQuery, {}, { cache: 'no-store' })
    } catch (error) {
        console.error("Error fetching subscribe page data:", error)
    }

    if (!data) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-serif text-stone-900">Subscribe</h1>
                    <p className="text-stone-500 mt-2">Please publish the Subscribe Page in Sanity Studio.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <Section spacing="md" className="bg-stone-50">
                <Container className="text-center max-w-3xl">
                    <h1 className="font-serif text-4xl font-light text-stone-900 md:text-5xl">
                        {data.title}
                    </h1>
                    {data.description && (
                        <p className="mt-4 text-lg text-stone-600 font-light leading-relaxed">
                            {data.description}
                        </p>
                    )}
                </Container>
            </Section>

            <Pricing heading="" tiers={data.tiers} />
        </div>
    )
}
