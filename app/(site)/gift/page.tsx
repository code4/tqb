import { client } from "@/sanity/lib/client"
import { giftPageQuery } from "@/sanity/lib/queries"
import { GiftPageClient } from "@/components/sections/gift-page-client"

export const revalidate = 60 // standard revalidation for ISR

export default async function GiftPageWrapper() {
    let data = null

    try {
        data = await client.fetch(giftPageQuery)
    } catch (error) {
        console.error("Error fetching gift page data:", error)
    }

    return <GiftPageClient data={data} />
}
