import { client } from "@/sanity/lib/client"
import { giftPageQuery, postsQuery } from "@/sanity/lib/queries"
import { SectionRenderer } from "@/components/section-renderer"
import { Container } from "@/components/ui/container"

export const revalidate = 60 // standard revalidation for ISR

export default async function GiftPage() {
    let data = null
    let posts: any[] = []

    try {
        const results = await Promise.all([
            client.fetch(giftPageQuery),
            client.fetch(postsQuery),
        ])
        data = results[0]
        posts = results[1] || []
    } catch (error) {
        console.error("Error fetching gift page data:", error)
    }

    if (!data) {
        return (
            <div className="flex h-[50vh] items-center justify-center pt-20">
                <div className="text-center px-4">
                    <h1 className="text-4xl font-serif text-stone-900 font-light">Give the Gift of Pause</h1>
                    <p className="text-stone-500 mt-6 max-w-md mx-auto font-light leading-relaxed">
                        We couldn't load the gift experience right now. Please check back in a moment or visit our studio to publish the Gift Page content.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <SectionRenderer sections={data.sections} posts={posts} />
        </div>
    )
}
