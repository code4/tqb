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
            <div className="relative overflow-hidden bg-stone-50 py-24 md:py-32 lg:py-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-stone-100 via-stone-50 to-stone-100 opacity-80" />
                <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-multiply" />

                <Container className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
                    <h1 className="font-serif text-5xl font-light tracking-tight text-stone-900 md:text-6xl lg:text-7xl mb-8">
                        {data.title}
                    </h1>
                    {/* Elegant boutique divider */}
                    <div className="h-[1px] w-16 bg-stone-300 mb-8"></div>
                    {data.description && (
                        <p className="text-lg md:text-2xl text-stone-600 font-light leading-[1.8] max-w-2xl mx-auto">
                            {data.description}
                        </p>
                    )}
                </Container>
            </div>

            <Pricing heading="" tiers={data.tiers} />
        </div>
    )
}
