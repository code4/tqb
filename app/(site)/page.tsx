import { client } from "@/sanity/lib/client"
import { landingPageQuery, postsQuery } from "@/sanity/lib/queries"
import { SectionRenderer } from "@/components/section-renderer"

export const revalidate = 60 // standard revalidation for ISR

export default async function LandingPage() {
    let data = null
    let posts: any[] = []

    try {
        const results = await Promise.all([
            client.fetch(landingPageQuery),
            client.fetch(postsQuery),
        ])
        data = results[0]
        posts = results[1] || []
    } catch (error) {
        console.error("Error fetching data:", error)
        // Fallback or just let data remain null to show the welcome message
    }

    if (!data) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-center px-4">
                    <h1 className="text-2xl font-serif text-stone-900">Welcome to The Quiet Bloom</h1>
                    <p className="text-stone-500 mt-2 max-w-md mx-auto">
                        We couldn't load the content. This usually happens if the Sanity Project ID is invalid or the content hasn't been published yet.
                    </p>
                    <div className="mt-4 text-sm text-stone-400">
                        Check your .env.local configuration.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {/* If title is needed for metadata, it's usually handled in generateMetadata. 
             Here we just render sections. */}
            <SectionRenderer sections={data.sections} posts={posts} />
        </div>
    )
}
