import React from "react"
import Link from "next/link"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import { FadeIn, FadeInStagger } from "@/components/ui/fade-in"

interface Post {
    title: string
    slug?: string
    link?: string
    publishedAt?: string
    pubDate?: string
    excerpt?: string
    contentSnippet?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mainImage?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any
}

interface LatestPostsProps {
    heading?: string
    posts: Post[]
}

export function LatestPosts({ heading = "Recent Reflections", posts }: LatestPostsProps) {
    if (!posts || posts.length === 0) return null

    // Estimate read time (very rough: 200 words/min)
    const getReadTime = (text: string) => {
        const words = text.trim().split(/\s+/).length
        const minutes = Math.ceil(words / 200)
        return `${minutes} min read`
    }

    return (
        <Section spacing="lg" className="bg-stone-50/50">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <h2 className="font-serif text-3xl font-light text-stone-900 md:text-4xl">
                        {heading}
                    </h2>
                    <Button asChild variant="outline" className="hidden md:inline-flex">
                        <Link href="/blog">
                            View All Posts
                        </Link>
                    </Button>
                </div>

                <FadeInStagger className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                    {posts.slice(0, 3).map((post, idx) => {
                        const href = post.slug ? `/blog/${post.slug}` : (post.link || "#")
                        const title = post.title
                        const imageRaw = post.mainImage || post.image
                        const image = (imageRaw && typeof imageRaw === 'object') ? urlFor(imageRaw).url() : imageRaw
                        const date = post.publishedAt || post.pubDate
                        const excerpt = post.excerpt || post.contentSnippet || ""
                        const isExternal = !!post.link

                        return (
                            <FadeIn key={idx}>
                                <Link
                                    href={href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    className="group flex flex-col items-start h-full"
                                >
                                    <div className="mb-6 aspect-[3/2] w-full overflow-hidden rounded-sm bg-stone-200 shadow-sm transition-all duration-500 group-hover:shadow-md">
                                        {image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={image}
                                                alt={title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-stone-100 text-stone-300">
                                                <BookOpen size={48} strokeWidth={1} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-stone-500 mb-3">
                                        {date && (
                                            <time>
                                                {new Date(date).toLocaleDateString("en-GB", {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        )}
                                        <span className="h-1 w-1 rounded-full bg-stone-300" />
                                        <span>{getReadTime(excerpt)}</span>
                                    </div>

                                    <h3 className="mb-3 font-serif text-2xl font-normal text-stone-900 leading-tight group-hover:text-stone-600 transition-colors">
                                        {title}
                                    </h3>

                                    <p className="line-clamp-3 text-stone-600 leading-relaxed mb-4">
                                        {excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center text-sm font-medium text-stone-900 group-hover:text-stone-600">
                                        Read Reflection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            </FadeIn>
                        )
                    })}
                </FadeInStagger>

                <div className="mt-12 md:hidden text-center">
                    <Button asChild variant="outline">
                        <Link href="/blog">
                            View All Posts
                        </Link>
                    </Button>
                </div>
            </Container>
        </Section>
    )
}


