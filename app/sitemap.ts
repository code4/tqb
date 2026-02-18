import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thequietbloom.com'

    // Fetch all posts to generate dynamic routes
    let posts: any[] = []
    try {
        posts = await client.fetch(postsQuery)
    } catch (error) {
        console.error('Sitemap error fetching posts:', error)
    }

    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt || new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/subscribe`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        },
    ]

    return [...staticRoutes, ...postRoutes]
}
